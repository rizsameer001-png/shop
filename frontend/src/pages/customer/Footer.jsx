import { Link } from 'react-router-dom';
import { Package2, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Shield, Truck, RotateCcw, Headphones } from 'lucide-react';

const trust = [
  { icon: Truck, label: 'Free Shipping', sub: 'Over $50' },
  { icon: Shield, label: 'Secure Payment', sub: 'SSL Encrypted' },
  { icon: RotateCcw, label: 'Easy Returns', sub: '30 Days' },
  { icon: Headphones, label: '24/7 Support', sub: 'Always Here' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-0">
      {/* Trust strip */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trust.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-gray-500 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 text-white font-black text-xl mb-5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Package2 className="w-5 h-5 text-white" />
            </div>
            ShopNow
          </Link>
          <p className="text-sm leading-relaxed mb-5 max-w-xs">
            Your trusted destination for quality products at fair prices. Shopping should be joyful, personal, and trustworthy — that's what we're here for.
          </p>
          <div className="flex gap-3 mb-6">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-gray-500">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-blue-400" /> +1 800-SHOPNOW</div>
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-400" /> support@shopnow.com</div>
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-400" /> 123 Commerce Ave, New York, NY</div>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Shop</h3>
          <ul className="space-y-3 text-sm">
            {[['All Products', '/products'], ['Best Sellers', '/products?sort=-totalSold'], ['New Arrivals', '/products?sort=-createdAt'], ['Top Rated', '/products?sort=-ratings'], ['Deals & Offers', '/products?sort=-totalSold']].map(([label, to]) => (
              <li key={label}><Link to={to} className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Account</h3>
          <ul className="space-y-3 text-sm">
            {[['My Profile', '/profile'], ['My Orders', '/orders'], ['Shopping Cart', '/cart'], ['Login', '/login'], ['Sign Up', '/register']].map(([label, to]) => (
              <li key={label}><Link to={to} className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Company</h3>
          <ul className="space-y-3 text-sm">
            {[['About Us', '/about'], ['Contact Us', '/contact'], ['FAQ', '/faq'], ['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']].map(([label, to]) => (
              <li key={label}><Link to={to} className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter strip */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm">Get 10% off your first order</p>
            <p className="text-gray-500 text-xs">Subscribe for exclusive deals, new arrivals, and style tips.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input type="email" placeholder="Your email address"
              className="flex-1 md:w-64 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition-colors whitespace-nowrap">
              Subscribe <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} ShopNow Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            <Link to="/faq" className="hover:text-gray-400 transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50" />
          </div>
        </div>
      </div>
    </footer>
  );
}
