import React, { useEffect, useState, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
const navigate =useNavigate()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(`/api/orders/user/${user.email}`);
          setOrders(res.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user, axios]);

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const selectedSubtotal = orders
    .filter((order) => selectedOrders.includes(order._id))
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const shipping = selectedOrders.length > 0 ? 5.99 : 0;
  const finalTotal = selectedSubtotal + shipping;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
        <div className="animate-pulse text-lg font-medium text-gray-400 italic">
          Loading Seoul Mirage...
        </div>
      </div>
    );
const handleProceedToPay = () => {
    const ordersToPay = orders.filter((order) => selectedOrders.includes(order._id));
    navigate("/process-pay", { 
        state: { 
            selectedOrders: ordersToPay, 
            totalPayable: finalTotal 
        } 
    });
};
  return (
    <div className="min-h-screen bg-[#F2EADA] py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[42px] font-normal text-[#111] mb-12">
          Order Selection
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Orders with Mark Option */}
          <div className="flex-1 space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`relative group flex gap-6 p-6 border transition-all ${
                  selectedOrders.includes(order._id)
                    ? "bg-white border-black shadow-md"
                    : "bg-white/50 border-gray-100 opacity-80"
                }`}
              >
                {order.status === "Unpaid" && (
                  <div className="flex items-start pt-1">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => handleSelectOrder(order._id)}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex justify-between mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      ID: #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${order.status === "Unpaid" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center mb-3">
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover bg-gray-50"
                        alt=""
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity} x ${item.price}
                        </p>
                      </div>
                      <p className="font-bold text-sm">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[380px]">
            <div className="bg-[#F5F0E9] p-8 sticky top-28 rounded-sm">
              <h2 className="text-xl font-bold mb-8 italic">Payment Summary</h2>

              <div className="space-y-4 border-b border-gray-300 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Selected Items ({selectedOrders.length})
                  </span>
                  <span className="font-bold">
                    ${selectedSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimated Shipping</span>
                  <span className="font-bold">${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6">
                <span className="text-lg font-bold">Total Payable</span>
                <span className="text-2xl font-black italic">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              <button onClick={handleProceedToPay}
                disabled={selectedOrders.length === 0}
                className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-all ${
                  selectedOrders.length > 0
                    ? "bg-black text-white hover:bg-gray-800 shadow-xl shadow-black/10"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proceed to Pay
              </button>

              {selectedOrders.length === 0 && (
                <p className="text-[10px] text-center mt-4 text-red-400 italic">
                  * Select at least one unpaid order to proceed.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
