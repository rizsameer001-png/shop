import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  ShoppingCart, User, Search, Menu, X, Package2, LogOut,
  Settings, ChevronDown, Laptop, Shirt, BookOpen, Dumbbell,
  Home, Grid3x3, Phone, Mail, Info, MessageCircle, HelpCircle
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { fetchCategories } from '../../store/slices/productSlice';
import { selectCartCount } from '../../store/slices/cartSlice';
import { getCMS } from '../../utils/cmsStore';
import toast from 'react-hot-toast';

const catMeta = {
  Electronics: { icon: Laptop, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  Clothing:    { icon: Shirt,   color: 'text-pink-400', bg: 'bg-pink-500/10' },
  Books:       { icon: BookOpen,color: 'text-amber-400',bg: 'bg-amber-500/10'},
  Sports:      { icon: Dumbbell,color: 'text-green-400',bg: 'bg-green-500/10'},
  'Home & Garden': { icon: Home, color: 'text-purple-400', bg: 'bg-purple-500/10' },
};

const quickLinks = [
  { label: '🔥 Best Sellers', to: '/products?sort=-totalSold' },
  { label: '⭐ Top Rated',    to: '/products?sort=-ratings' },
  { label: '✨ New Arrivals', to: '/products?sort=-createdAt' },
  { label: '💰 Best Deals',   to: '/products?sort=price' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen]     = useState(false);
  const [userOpen, setUserOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ]       = useState('');
  const [scrolled, setScrolled]     = useState(false);
  const [cms]                       = useState(() => getCMS());

  const { isAuthenticated, user } = useSelector(s => s.auth);
  const { categories } = useSelector(s => s.products);
  const cartCount = useSelector(selectCartCount);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const shopRef   = useRef(null);
  const userRef   = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
  useEffect(() => {
    setMobileOpen(false); setShopOpen(false); setUserOpen(false); setSearchOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    const h = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) setShopOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleLogout = async () => { await dispatch(logout()); toast.success('See you soon!'); navigate('/'); };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) { navigate('/products?keyword=' + encodeURIComponent(searchQ.trim())); setSearchQ(''); setSearchOpen(false); }
  };
  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  const s = cms.siteSettings;

  return (
    <>
      {s.announcementActive && s.announcement && (
        <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 text-white text-xs font-semibold py-2 px-4 text-center tracking-wide z-50 relative">
          {s.announcement}
        </div>
      )}
      <div className="hidden md:block bg-gray-950 text-gray-500 text-xs border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{s.phone || '+1 800-SHOPNOW'}</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{s.email || 'support@shopnow.com'}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about"   className="hover:text-white transition-colors flex items-center gap-1"><Info className="w-3 h-3"/>About</Link>
            <Link to="/faq"     className="hover:text-white transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3"/>FAQ</Link>
            <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1"><MessageCircle className="w-3 h-3"/>Contact</Link>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'nav-dark shadow-2xl shadow-black/40' : 'bg-gray-950'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <Package2 className="w-5 h-5 text-white"/>
              </div>
              <span className="font-black text-xl text-white tracking-tight">{s.siteName || 'ShopNow'}</span>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/') ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>Home</Link>

              <div ref={shopRef} className="relative">
                <button onClick={() => setShopOpen(v => !v)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/products') ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>
                  Shop <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`}/>
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-gray-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-5 z-50">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-bold text-white text-sm">Browse Categories</p>
                      <Link to="/products" className="text-xs text-orange-400 hover:text-orange-300 font-semibold">View all →</Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {categories.map(cat => {
                        const m = catMeta[cat.name] || { icon: Grid3x3, color: 'text-gray-400', bg: 'bg-gray-500/10' };
                        const Icon = m.icon;
                        return (
                          <Link key={cat._id} to={'/products?category='+cat._id}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                            <div className={`w-9 h-9 ${m.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-4 h-4 ${m.color}`}/>
                            </div>
                            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{cat.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t border-white/10 pt-3 grid grid-cols-4 gap-2">
                      {quickLinks.map(({label,to}) => (
                        <Link key={to} to={to} className="text-center text-[11px] font-bold text-gray-400 hover:text-orange-400 bg-white/5 hover:bg-orange-500/10 px-2 py-2 rounded-lg transition-all">{label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about"   className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/about')   ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>About</Link>
              <Link to="/contact" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/contact') ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>Contact</Link>
            </div>

            <div className="flex items-center gap-1">
              <div ref={searchRef} className="relative hidden md:block">
                <button onClick={() => setSearchOpen(v => !v)}
                  className={`p-2.5 rounded-xl transition-all ${searchOpen ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                  <Search className="w-[18px] h-[18px]"/>
                </button>
                {searchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl p-3 z-50">
                    <form onSubmit={handleSearch} className="flex gap-2">
                      <input autoFocus type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search products…"
                        className="flex-1 bg-white/10 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-all"/>
                      <button type="submit" className="bg-orange-500 text-white px-4 rounded-xl font-semibold text-sm hover:bg-orange-600 transition-colors">Go</button>
                    </form>
                  </div>
                )}
              </div>

              <Link to="/cart" className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <ShoppingCart className="w-[18px] h-[18px]"/>
                {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-black rounded-full w-[18px] h-[18px] flex items-center justify-center">{cartCount > 9 ? '9+' : cartCount}</span>}
              </Link>

              {isAuthenticated ? (
                <div className="relative" ref={userRef}>
                  <button onClick={() => setUserOpen(v => !v)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/5 transition-all ml-1">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name||'U')}&background=f97316&color=fff&size=32`} alt="" className="w-7 h-7 rounded-full ring-2 ring-orange-400/50"/>
                    <span className="hidden sm:block text-sm font-semibold text-gray-200">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3 h-3 text-gray-500 hidden sm:block"/>
                  </button>
                  {userOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2.5 border-b border-white/10 mb-1">
                        <p className="font-bold text-sm text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"><User className="w-4 h-4 text-gray-500"/>My Profile</Link>
                      <Link to="/orders"  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"><Package2 className="w-4 h-4 text-gray-500"/>My Orders</Link>
                      {user?.role === 'admin' && <Link to="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 font-semibold transition-colors"><Settings className="w-4 h-4"/>Admin Panel</Link>}
                      <div className="border-t border-white/10 mt-1 pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"><LogOut className="w-4 h-4"/>Sign Out</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 ml-1">
                  <Link to="/login"    className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all">Login</Link>
                  <Link to="/register" className="text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-orange-500/25">Sign Up</Link>
                </div>
              )}

              <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 ml-1 transition-all">
                {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-gray-950 pb-6">
            <div className="max-w-7xl mx-auto px-4 pt-4 space-y-1">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4"/>
                  <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search…"
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/10 text-white placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-all"/>
                </div>
              </form>
              {[['🏠 Home','/'],['🛍️ All Products','/products'],['ℹ️ About','/about'],['📞 Contact','/contact'],['❓ FAQ','/faq'],['🔒 Privacy','/privacy'],['📄 Terms','/terms']].map(([l,t]) => (
                <Link key={t} to={t} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 font-semibold text-sm transition-all">{l}</Link>
              ))}
              {categories.length > 0 && (
                <div className="px-1 py-2">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 px-3">Categories</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categories.map(cat => (
                      <Link key={cat._id} to={'/products?category='+cat._id}
                        className="px-3 py-2.5 bg-white/5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all">{cat.name}</Link>
                    ))}
                  </div>
                </div>
              )}
              {!isAuthenticated && (
                <div className="pt-2 flex gap-2">
                  <Link to="/login"    className="flex-1 text-center py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5">Login</Link>
                  <Link to="/register" className="flex-1 text-center py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
