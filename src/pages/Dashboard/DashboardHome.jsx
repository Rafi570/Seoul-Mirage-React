import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend 
} from 'recharts';
import { DollarSign, ShoppingCart, Users, TrendingUp, Loader2, Package, CheckCircle, Clock } from 'lucide-react';

const DashboardHome = () => {
    const { user: currentUser, logout, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        avgOrderValue: 0,
        recentOrders: [],
        topProducts: [],
        categoryData: [],
        revenueTrend: []
    });
    const [loading, setLoading] = useState(true);

    // ১. অ্যাডমিন গার্ড (Admin Guard)
    useEffect(() => {
        if (!authLoading && (!currentUser || currentUser.role !== 'admin')) {
            navigate('/');
        }
    }, [currentUser, authLoading, navigate]);

    // ২. ডায়নামিক ডাটা ফেচিং (Dynamic Data Fetching)
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // আপনার দেওয়া রাউটগুলো থেকে ডাটা কল করা হচ্ছে
                const [ordersRes, productsRes] = await Promise.all([
                    axios.get('https://seoul-sage.vercel.app/api/orders/all'),
                    axios.get('https://seoul-sage.vercel.app/api/products')
                ]);

                const orders = ordersRes.data || [];
                const products = productsRes.data || [];

                // ক) রেভিনিউ ক্যালকুলেশন
                const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
                
                // খ) পাই চার্টের জন্য ক্যাটাগরি ডাটা তৈরি (Dynamic Category calculation from Orders)
                const categoryMap = {};
                orders.forEach(order => {
                    order.items?.forEach(item => {
                        // আমরা প্রডাক্ট লিস্ট থেকে ক্যাটাগরি ম্যাচ করছি (যদি থাকে)
                        const prodInfo = products.find(p => p._id === item.productId);
                        const cat = prodInfo?.category || 'General';
                        categoryMap[cat] = (categoryMap[cat] || 0) + item.quantity;
                    });
                });
                const pieData = Object.keys(categoryMap).map(key => ({ name: key, value: categoryMap[key] }));

                // গ) লাইন চার্টের জন্য ট্রেন্ড (Trend by Date)
                const trendMap = {};
                orders.slice(0, 10).reverse().forEach(o => {
                    const date = new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    trendMap[date] = (trendMap[date] || 0) + o.totalAmount;
                });
                const trendData = Object.keys(trendMap).map(date => ({ date, amount: trendMap[date] }));

                setStats({
                    totalRevenue: revenue.toLocaleString(),
                    totalOrders: orders.length,
                    totalProducts: products.length,
                    avgOrderValue: orders.length > 0 ? (revenue / orders.length).toFixed(2) : 0,
                    recentOrders: orders.slice(0, 5),
                    categoryData: pieData.length > 0 ? pieData : [{name: 'No Data', value: 1}],
                    revenueTrend: trendData
                });
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?.role === 'admin') fetchAllData();
    }, [currentUser]);

    if (authLoading || loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#CCAF91]" size={40} /></div>;

    const COLORS = ['#884D5D', '#B17366', '#D6B18D', '#9A7E62', '#634A41'];

    return (
        <div className="space-y-8 pb-10 animate-in fade-in duration-500 text-left">
            {/* ১. স্ট্যাটাস কার্ডস (Dynamic Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon={<DollarSign size={20}/>} />
                <StatCard title="Orders" value={stats.totalOrders} icon={<ShoppingCart size={20}/>} />
                <StatCard title="Total Products" value={stats.totalProducts} icon={<Package size={20}/>} />
                <StatCard title="Avg. Order Value" value={`$${stats.avgOrderValue}`} icon={<TrendingUp size={20}/>} />
            </div>

            {/* ২. চার্ট সেকশন (Pie Chart & Line Chart) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart: Sales by Category */}
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                    <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#884D5D]"></div> Sales by Category
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={stats.categoryData} 
                                    innerRadius={60} 
                                    outerRadius={80} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                >
                                    {stats.categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase'}}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart: Revenue Trend */}
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                    <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                         <div className="w-2 h-2 bg-black"></div> Revenue Trend (Recent)
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.revenueTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="date" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{borderRadius: '0', border: '1px solid #eee'}} />
                                <Line type="monotone" dataKey="amount" stroke="#884D5D" strokeWidth={3} dot={{r: 4, fill: '#884D5D'}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ৩. রিসেন্ট অর্ডার উইথ প্রডাক্ট আইটেমস (Recent Orders) */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-sm">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest">Recent Activity</h3>
                    <button onClick={() => navigate('/dashboard/orders')} className="text-[10px] font-black uppercase underline tracking-tighter hover:text-[#884D5D]">View All</button>
                </div>
                <div className="divide-y divide-gray-50">
                    {stats.recentOrders.map((order) => (
                        <div key={order._id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="bg-gray-50 p-3 border border-gray-100">
                                    {order.status === 'Paid' ? <CheckCircle className="text-green-500" size={18}/> : <Clock className="text-orange-300" size={18}/>}
                                </div>
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-tighter">ORD-{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">{order.userEmail}</p>
                                    {/* Product Option Show */}
                                    <div className="flex gap-1 mt-2">
                                        {order.items?.map((item, idx) => (
                                            <span key={idx} className="text-[8px] bg-black text-white px-2 py-0.5 font-black uppercase tracking-tighter">
                                                {item.name?.split(' ')[0]} x{item.quantity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black italic tracking-tighter">${order.totalAmount}</p>
                                <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${order.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// সাব-কম্পোনেন্ট: StatCard
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm flex items-start justify-between">
        <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">{title}</p>
            <h4 className="text-3xl font-black italic tracking-tighter text-black">{value}</h4>
        </div>
        <div className="p-3 bg-[#FDFBF9] border border-[#F5EEE6] rounded-sm text-[#884D5D]">
            {icon}
        </div>
    </div>
);

export default DashboardHome;