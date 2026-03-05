import React from "react";

export default function JoinCom() {
  return (
    <section className="py-20 bg-white border-t border-slate-50">
      {/* ✅ inline standard container */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Text Content */}
          <h2 className="newsletter-title">Join Our Community</h2>
          <p className="newsletter-desc">
            Subscribe to our newsletter for exclusive offers, skincare tips, and
            new product announcements.
          </p>

          {/* Subscription Form */}
          <div className="w-full max-w-[500px] flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full h-12 md:h-14 px-6 rounded-full border border-slate-200 
                           focus:outline-none focus:ring-2 focus:ring-[#CC99A2]/30 
                           transition-all text-slate-600 bg-white"
              />
            </div>

            <button
              className="w-full sm:w-auto h-12 md:h-14 px-10 rounded-full 
                         bg-[#CC99A2] hover:bg-[#B88691] text-white 
                         font-semibold transition-all shadow-sm"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
