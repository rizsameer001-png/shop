import { Link } from 'react-router-dom';
import { Package2, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Shield, Truck, RotateCcw, Headphones } from 'lucide-react';
import { getCMS } from '../../utils/cmsStore';

export default function Footer() {
  const { siteSettings: s, contact: c } = getCMS();
  return (
    <footer className="bg-gray-950 text-gray-500">
      {/* Trust strip */}
      <div className="border-y border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{icon:Truck,l:'Free Shipping',s:'Over $50'},{icon:Shield,l:'Secure Payment',s:'SSL Encrypted'},{icon:RotateCcw,l:'Easy Returns',s:'30 Days'},{icon:Headphones,l:'24/7 Support',s:'Always Here'}].map(({icon:Icon,l,s:sub}) => (
            <div key={l} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-orange-400"/>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{l}</p>
                <p className="text-gray-600 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 text-white font-black text-xl mb-5">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Package2 className="w-5 h-5 text-white"/>
            </div>
            {s.siteName || 'ShopNow'}
          </Link>
          <p className="text-sm leading-relaxed mb-5 max-w-xs">{s.tagline || 'Your trusted destination for quality products at fair prices.'}</p>
          <div className="flex gap-3 mb-6">
            {[{Icon:Facebook,href:s.socialFacebook},{Icon:Twitter,href:s.socialTwitter},{Icon:Instagram,href:s.socialInstagram},{Icon:Youtube,href:s.socialYoutube}].map(({Icon,href},i) => (
              <a key={i} href={href||'#'} className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-orange-500 text-gray-500 hover:text-white transition-all">
                <Icon className="w-4 h-4"/>
              </a>
            ))}
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-orange-400"/>{c.phone || s.phone || '+1 800-SHOPNOW'}</div>
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-orange-400"/>{c.email || s.email || 'support@shopnow.com'}</div>
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-orange-400"/>{c.address || '123 Commerce Ave, New York, NY'}</div>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Shop</h3>
          <ul className="space-y-3 text-sm">
            {[['All Products','/products'],['Best Sellers','/products?sort=-totalSold'],['New Arrivals','/products?sort=-createdAt'],['Top Rated','/products?sort=-ratings'],['Deals','/products?sort=-totalSold']].map(([l,t]) => (
              <li key={l}><Link to={t} className="hover:text-white hover:translate-x-1 inline-flex items-center transition-all">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Account</h3>
          <ul className="space-y-3 text-sm">
            {[['My Profile','/profile'],['My Orders','/orders'],['Shopping Cart','/cart'],['Login','/login'],['Sign Up','/register']].map(([l,t]) => (
              <li key={l}><Link to={t} className="hover:text-white hover:translate-x-1 inline-flex items-center transition-all">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Company</h3>
          <ul className="space-y-3 text-sm">
            {[['About Us','/about'],['Contact','/contact'],['FAQ','/faq'],['Privacy Policy','/privacy'],['Terms of Service','/terms']].map(([l,t]) => (
              <li key={l}><Link to={t} className="hover:text-white hover:translate-x-1 inline-flex items-center transition-all">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm">Get 10% off your first order</p>
            <p className="text-gray-600 text-xs">Subscribe for exclusive deals and new arrivals.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input type="email" placeholder="Your email address"
              className="flex-1 md:w-64 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"/>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition-colors whitespace-nowrap">
              Subscribe <ArrowRight className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-700">
          <p>© {new Date().getFullYear()} {s.siteName || 'ShopNow'} Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[['Privacy','/privacy'],['Terms','/terms'],['FAQ','/faq'],['Contact','/contact']].map(([l,t]) => (
              <Link key={l} to={t} className="hover:text-gray-400 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
