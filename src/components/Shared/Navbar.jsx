import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react'
import logo from '../../assets/img/logo.png'

const navLinks = [
  { name: 'Skincare', to: '/skincare', hasDropdown: true },
  { name: 'Collections', to: '/collections', hasDropdown: true },
  { name: 'About', to: '/about', hasDropdown: false },
  { name: 'Contact', to: '/contact', hasDropdown: false },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-[1000] w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <button
              className="lg:hidden p-2 hover:bg-slate-100 rounded-md transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="object-contain w-[70px] md:w-[93px]" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8 ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="group flex items-center gap-1 text-[15px] font-medium text-slate-700 hover:text-black transition-colors"
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-black transition-transform group-hover:rotate-180" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-6 text-slate-700">
            <button className="hover:text-black transition-colors p-1">
              <Search className="w-5 h-5 md:w-[22px] md:h-[22px]" />
            </button>

            <button className="hidden sm:block hover:text-black transition-colors p-1">
              <User className="w-5 h-5 md:w-[22px] md:h-[22px]" />
            </button>

            <button className="relative hover:text-black transition-colors p-1">
              <ShoppingBag className="w-5 h-5 md:w-[22px] md:h-[22px]" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="relative bg-white w-72 max-w-[80%] h-full shadow-lg p-6 animate-slide-in-left overflow-y-auto">
            <button
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>

            <div className="flex flex-col gap-6 mt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-900 border-b pb-2 flex justify-between items-center"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}