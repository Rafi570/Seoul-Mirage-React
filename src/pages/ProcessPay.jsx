import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";

const ProcessPay = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();
  const [isPaying, setIsPaying] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postCode: "",
    phone: "", 
  });

  const selectedOrders = state?.selectedOrders || [];
  const totalPayable = state?.totalPayable || 0;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalPayment = async (e) => {
    e.preventDefault();
    if (selectedOrders.length === 0) return;

    setIsPaying(true);
    try {
    
      const paymentInfo = {
        orderIds: selectedOrders.map((order) => order._id),
        totalAmount: totalPayable,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postCode: formData.postCode,
          phone: formData.phone,
        },
      };

   
      const res = await axios.post("/api/orders/init-payment", paymentInfo);

      if (res.data?.url) {
        window.location.replace(res.data.url);
      } else {
        alert("Payment gateway error. Please try again.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Could not connect to payment gateway!");
    } finally {
      setIsPaying(false);
    }
  };

  if (!state) {
    return (
      <div className="p-20 text-center">No orders selected for payment.</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EADA] py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[42px] font-normal mb-10">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Shipping Form */}
          <div className="flex-1 bg-white p-8 md:p-12 shadow-sm rounded-sm">
            <h2 className="text-xl font-bold mb-8">Shipping Information</h2>
            <form onSubmit={handleFinalPayment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    First name
                  </label>
                  <input
                    name="firstName"
                    onChange={handleInputChange}
                    type="text"
                    required
                    className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    onChange={handleInputChange}
                    type="text"
                    required
                    className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    required
                    className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    onChange={handleInputChange}
                    type="text"
                    required
                    className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black"
                    placeholder="017XXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Address (Street & House)
                </label>
                <input
                  name="address"
                  onChange={handleInputChange}
                  type="text"
                  required
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  name="city"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="City"
                  required
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black"
                />
                <input
                  name="state"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="State/Province"
                  required
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black"
                />
                <input
                  name="postCode"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Postal Code"
                  required
                  className="w-full border border-gray-200 p-3 focus:outline-none focus:border-black"
                />
              </div>

              <div className="pt-6">
                <h3 className="font-bold mb-4">Shipping Method</h3>
                <div className="border border-black p-4 flex justify-between items-center rounded-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-4 border-black rounded-full"></div>
                    <span className="text-sm font-medium">
                      Standard Shipping (5-7 business days)
                    </span>
                  </div>
                  <span className="font-bold">$5.99</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPaying}
                className="w-full md:w-auto float-right bg-black text-white px-12 py-4 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all disabled:bg-gray-400"
              >
                {isPaying ? "Redirecting to SSL..." : "Proceed to Pay ❯"}
              </button>
            </form>
          </div>

    
          <div className="w-full lg:w-[450px]">
            <div className="bg-white p-8 shadow-sm border border-gray-50 sticky top-28">
              <h2 className="text-lg font-bold mb-6 italic">Order Summary</h2>
         
              <div className="max-h-[300px] overflow-y-auto mb-6 pr-2">
                {selectedOrders.map((order) => (
                  <div
                    key={order._id}
                    className="mb-6 last:mb-0 border-b border-gray-50 pb-4"
                  >
                    <p className="text-[10px] font-bold text-gray-400 mb-2 italic">
                      ORDER #{order._id.slice(-6).toUpperCase()}
                    </p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center mb-3">
                        <div className="w-16 h-16 bg-gray-50 flex-shrink-0">
                          <img
                            src={item.mainImage || item.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[13px] font-bold leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold">${item.price}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${(totalPayable - 5.99).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>$5.99</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-2 border-t border-gray-100 italic">
                  <span>Total</span>
                  <span>${totalPayable.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPay;
