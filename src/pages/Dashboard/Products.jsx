import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Plus, Eye, Trash2, ChevronLeft, ChevronRight, X, Loader2, Package } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';

const Products = () => {
    
    const { user, logout, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // States
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const productsPerPage = 8;

    // --- ১. ADMIN ROLE CHECK & REDIRECT ---
    useEffect(() => {
        const verifyAdmin = async () => {
            if (!authLoading) {
                if (user?.email) {
                    try {
                        const res = await axios.get(`http://localhost:5001/api/auth/role?email=${user.email}`);
                        if (res.data.role === 'admin') {
                            setIsAdmin(true);
                        } else {
                            await logout();
                            navigate('/'); 
                            Swal.fire('Unauthorized', 'Admin access only!', 'error');
                        }
                    } catch (err) {
                        await logout();
                        navigate('/');
                    }
                } else {
                    navigate('/');
                }
            }
        };
        verifyAdmin();
    }, [user, authLoading, navigate, logout]);

    // --- ২. FETCH PRODUCTS ---
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5001/api/products');
            setProducts(res.data);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isAdmin) fetchProducts();
    }, [isAdmin]);

    // --- ৩. CREATE PRODUCT HANDLER (Fixed Array & Logic) ---
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const productData = {
            name: form.name.value,
            price: Number(form.price.value),
            stock: Number(form.stock.value),
            mainImage: form.mainImage.value,
            category: form.category.value,
            description: form.description.value,
            images: [form.mainImage.value], // Schema অনুযায়ী Array পাঠাচ্ছি
            rating: 0,
            reviews_count: 0
        };

        try {
            const res = await axios.post('http://localhost:5001/api/products', productData);
            if (res.data) {
                Swal.fire('Success', 'Product added to Seoul Mirage', 'success');
                setIsPostModalOpen(false);
                fetchProducts(); // টেবিল রিফ্রেশ
                form.reset();
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to add product', 'error');
        }
    };

    // --- ৪. DELETE HANDLER (Immediate UI Update) ---
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete Product?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            confirmButtonText: 'Yes, Delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5001/api/products/${id}`);
                    setProducts(prev => prev.filter(p => p._id !== id));
                    Swal.fire('Deleted!', 'Product removed.', 'success');
                } catch (err) {
                    Swal.fire('Error', 'Failed to delete', 'error');
                }
            }
        });
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    if (authLoading || (user && !isAdmin)) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#CCAF91]" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 md:p-8 border border-gray-100 shadow-sm gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">Inventory</h2>
                    <p className="text-[10px] text-[#A38A6F] font-bold uppercase tracking-[0.2em] mt-1">Total {products.length} items</p>
                </div>
                <button 
                    onClick={() => setIsPostModalOpen(true)}
                    className="w-full sm:w-auto bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#222] transition-all shadow-xl flex items-center justify-center gap-2"
                >
                    <Plus size={16} /> Add Product
                </button>
            </div>

            {/* Table Area (Responsive Scroll) */}
            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-[#FEF4EC] border-b border-[#EBE3D9]">
                            <tr>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Product</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Category</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Price</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Stock</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((p) => (
                                <tr key={p._id} className="border-b border-gray-50 hover:bg-[#FDFBF9] transition-colors">
                                    <td className="p-5 flex items-center gap-4">
                                        <div className="w-12 h-12 border p-1 bg-white flex-shrink-0 overflow-hidden">
                                            <img src={p.mainImage} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-bold text-sm text-gray-900 truncate max-w-[200px]">{p.name}</span>
                                    </td>
                                    <td className="p-5 text-[11px] font-black uppercase text-gray-400 tracking-widest">{p.category}</td>
                                    <td className="p-5 font-black italic text-sm text-gray-900">${p.price}</td>
                                    <td className="p-5">
                                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${p.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {p.stock > 0 ? `${p.stock} Units` : 'Sold Out'}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => { setSelectedProduct(p); setIsDetailModalOpen(true); }} className="p-2 hover:bg-black hover:text-white transition-all rounded-full"><Eye size={16} /></button>
                                            <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-red-500 hover:text-white transition-all rounded-full text-red-400"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 flex justify-between items-center bg-white border-t border-gray-50">
                    <span className="text-[10px] font-black uppercase text-gray-300">Page {currentPage} of {totalPages}</span>
                    <div className="flex gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 border disabled:opacity-20 hover:bg-black hover:text-white transition-all"><ChevronLeft size={18} /></button>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 border disabled:opacity-20 hover:bg-black hover:text-white transition-all"><ChevronRight size={18} /></button>
                    </div>
                </div>
            </div>

            {/* --- ADD PRODUCT MODAL --- */}
            {isPostModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="bg-white w-full max-w-xl my-auto p-8 md:p-12 relative shadow-2xl animate-in zoom-in duration-300">
                        <button onClick={() => setIsPostModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black"><X size={28} /></button>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 border-b pb-4">New Entry</h2>
                        <form onSubmit={handleCreateProduct} className="space-y-6">
                            <input name="name" placeholder="PRODUCT NAME" className="w-full border-b-2 py-3 text-sm font-black outline-none focus:border-black uppercase tracking-widest" required />
                            <div className="grid grid-cols-2 gap-6">
                                <input name="price" type="number" placeholder="PRICE ($)" className="w-full border-b-2 py-3 text-sm font-black outline-none focus:border-black" required />
                                <input name="stock" type="number" placeholder="STOCK" className="w-full border-b-2 py-3 text-sm font-black outline-none focus:border-black" required />
                            </div>
                            <input name="mainImage" placeholder="IMAGE URL (HTTPS://...)" className="w-full border-b-2 py-3 text-sm font-black outline-none focus:border-black" required />
                            <select name="category" className="w-full border-b-2 py-3 text-[10px] font-black uppercase tracking-widest bg-transparent outline-none">
                                <option value="skincare">Skincare</option>
                                <option value="lipsticks">Lipsticks</option>
                                <option value="fragrance">Fragrance</option>
                            </select>
                            <textarea name="description" placeholder="DESCRIPTION" className="w-full border-2 p-4 text-xs font-bold outline-none h-24 focus:border-black" required></textarea>
                            <button type="submit" className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#222] transition-all">Publish Now</button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- DETAIL MODAL --- */}
            {isDetailModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                    <div className="bg-white w-full max-w-5xl grid md:grid-cols-2 relative overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
                        <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-6 right-6 z-10 bg-white/50 p-2 rounded-full hover:bg-white"><X size={24} /></button>
                        <div className="bg-gray-100 h-[350px] md:h-full">
                            <img src={selectedProduct.mainImage} className="w-full h-full object-contain p-10" alt="" />
                        </div>
                        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
                            <span className="text-[10px] font-black uppercase text-[#CCAF91] tracking-[0.4em] mb-4 border-b border-[#CCAF91] w-fit">{selectedProduct.category}</span>
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none mb-6">{selectedProduct.name}</h2>
                            <p className="text-3xl font-black italic text-black mb-8">${selectedProduct.price}</p>
                            <p className="text-gray-400 text-sm leading-relaxed mb-10">{selectedProduct.description || "Curated Seoul Mirage collection item."}</p>
                            <div className="grid grid-cols-2 gap-8 border-t pt-8">
                                <div><p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Stock</p><p className="font-black text-sm italic">{selectedProduct.stock} UNITS</p></div>
                                <div><p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Rating</p><p className="font-black text-sm italic">{selectedProduct.rating} / 5</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;