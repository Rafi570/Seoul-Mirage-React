import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)
  const navigate = useNavigate();

  const isLoggedIn = true; 

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    console.log("Logging out...");
    setShowUserMenu(false);
    navigate('/');
  }

  return (
    <>
      <nav className="sticky top-0 z-[1000] w-full bg-white/90 backdrop-blur-md border-b border-slate-100 font-sans">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-slate-100 rounded-md transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>

            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="object-contain w-[70px] md:w-[93px]" />
            </Link>

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

            {/* User Icon & Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:text-black transition-colors p-1 flex items-center"
              >
                <User className="w-5 h-5 md:w-[22px] md:h-[22px]" />
              </button>

              {/* User Dropdown Menu (আপনার ইমেজের ডিজাইনের মতো) */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 shadow-xl rounded-sm py-2 z-50 animate-in fade-in zoom-in duration-200">
                  {!isLoggedIn ? (
                    <>
                      <Link to="/register" onClick={() => setShowUserMenu(false)} className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Sign-up</Link>
                      <Link to="/login" onClick={() => setShowUserMenu(false)} className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Sign in</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/profile" onClick={() => setShowUserMenu(false)} className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">My Account</Link>
                      <Link to="/orders" onClick={() => setShowUserMenu(false)} className="block px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Order History</Link>
                      <hr className="my-1 border-slate-50" />
                      <button onClick={handleLogout} className="w-full text-left px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50">Log Out</button>
                    </>
                  )}
                </div>
              )}
            </div>

            <button className="relative hover:text-black transition-colors p-1">
              <ShoppingBag className="w-5 h-5 md:w-[22px] md:h-[22px]" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR (আগের মতোই) */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          <div className="fixed inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white w-72 max-w-[80%] h-full shadow-lg p-6 animate-slide-in-left overflow-y-auto">
            <button className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-md" onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6 text-slate-700" />
            </button>
            <div className="flex flex-col gap-6 mt-10">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.to} onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b pb-2 flex justify-between items-center">
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              ))}
              {/* Mobile User Options */}
              {!isLoggedIn ? (
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-blue-600">Login / Register</Link>
              ) : (
                <button onClick={handleLogout} className="text-lg font-medium text-left text-red-500">Logout</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}