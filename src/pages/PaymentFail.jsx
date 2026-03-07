import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFail = () => {
    return (
        <div className="min-h-[80vh] bg-[#F2EADA] flex items-center justify-center px-4">
            <div className="max-w-3xl w-full text-center py-20">
                {/* Fail Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#8E443D] rounded-full flex items-center justify-center shadow-lg">
                        <XCircle className="text-white w-12 h-12" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#333] mb-4">
                    Oops! Your Payment Wasn't <span className="text-[#8E443D] italic">Completed</span>!
                </h1>
                <p className="text-gray-600 text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed">
                    It looks like your transaction was canceled—please double-check your details and try again or contact support if the problem persists.
                </p>

                {/* Action Button */}
                <Link 
                    to="/checkout" 
                    className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all shadow-md"
                >
                    Try Again ❯
                </Link>
            </div>
        </div>
    );
};

export default PaymentFail;