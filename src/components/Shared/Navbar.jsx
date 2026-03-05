import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, ShoppingBag, ChevronDown, Menu, X, LogOut, Settings, Package } from 'lucide-react'
import logo from '../../assets/img/logo.png'
import { AuthContext } from '../../contexts/AuthContext'

const navLinks = [
  { name: 'Skincare', to: '/#', hasDropdown: true },
  { name: 'Collections', to: '/collections', hasDropdown: true },
  { name: 'About', to: '/about', hasDropdown: false },
  { name: 'Contact', to: '/contact', hasDropdown: false },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useContext(AuthContext) 
  const userMenuRef = useRef(null)
  const navigate = useNavigate()


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
    logout() 
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <>
      <nav className="sticky top-0 z-[1000] w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 font-sans">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* LEFT: Menu & Logo */}
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 hover:bg-slate-50 rounded-full" onClick={() => setIsOpen(true)}>
              <Menu className="w-6 h-6 text-slate-700" />
            </button>

            <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
              <img src={logo} alt="Logo" className="w-[85px] md:w-[100px] object-contain" />
            </Link>

            <div className="hidden lg:flex items-center gap-10 ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="group flex items-center gap-1.5 text-[14px] font-semibold text-slate-600 hover:text-black transition-all tracking-wide"
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            <button className="p-2.5 hover:bg-slate-50 rounded-full text-slate-700 transition-colors">
              <Search className="w-[20px] h-[20px]" />
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-2 p-2 rounded-full transition-all ${showUserMenu ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
              >
                <User className="w-[20px] h-[20px] text-slate-700" />
                {user && <span className="hidden md:block text-xs font-bold text-slate-800 uppercase tracking-tighter">{user.name?.split(' ')[0]}</span>}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-md py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {!user ? (
                    <div className="px-2 space-y-1">
                      <Link to="/register" onClick={() => setShowUserMenu(false)} className="block px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-sm">Sign-up</Link>
                      <Link to="/login" onClick={() => setShowUserMenu(false)} className="block px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-sm">Sign in</Link>
                    </div>
                  ) : (
                    <>
                      <div className="px-5 py-3 border-b border-slate-50 mb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                      </div>
                      <div className="px-2 space-y-1">
                        <Link to="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-sm font-medium">
                          <Settings className="w-4 h-4" /> My Account
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-sm font-bold mt-2 border-t border-slate-50">
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

              <Link to="/orders">
            <button className="relative p-2.5 hover:bg-slate-50 rounded-full text-slate-700 transition-colors">
                <ShoppingBag className="w-[20px] h-[20px]" />
              
              <span className="absolute top-1.5 right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">0</span>
            </button>
              </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} />
        <div className={`absolute left-0 top-0 bg-white w-[300px] h-full shadow-2xl p-8 transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <button className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-slate-500" />
          </button>
          <img src={logo} alt="Logo" className="w-20 mb-12" />
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.to} onClick={() => setIsOpen(false)} className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-3 flex justify-between items-center group hover:text-blue-600 transition-colors">
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-5 h-5 group-hover:rotate-180 transition-transform" />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}