import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
    return (
        <div className="min-h-[80vh] bg-[#F2EADA] flex items-center justify-center px-4">
            <div className="max-w-3xl w-full text-center py-20 border-2 border-dashed border-[#A3B899] rounded-sm">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#6E9562] rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="text-white w-12 h-12" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#333] mb-4">
                    Your payment has been <span className="text-[#6E9562] italic">received</span>!
                </h1>
                <p className="text-gray-600 text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed">
                    Please check your email for a payment confirmation & invoice. We'll start processing your order right away.
                </p>

                {/* Action Button */}
                <Link 
                    to="/all-products" 
                    className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all shadow-md"
                >
                    Continue Shopping ❯
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;