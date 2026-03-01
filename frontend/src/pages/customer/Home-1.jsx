import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Truck, RotateCcw, Headphones,
  Star, Zap, TrendingUp, Gift, ChevronLeft, ChevronRight,
  Laptop, Shirt, BookOpen, Dumbbell, Home as HomeIcon, Grid3x3
} from 'lucide-react';
import { fetchFeatured, fetchCategories } from '../../store/slices/productSlice';
import ProductCard from '../../components/common/ProductCard';

const heroSlides = [
  {
    tag: '🎉 New Season Sale — Up to 60% Off',
    title: 'Discover Your', highlight: 'Perfect Style',
    sub: 'Explore thousands of products from top brands with unbeatable deals every day.',
    btn1: { label: 'Shop Now', to: '/products' },
    btn2: { label: 'View Deals', to: '/products?sort=-totalSold' },
    bg: 'from-blue-700 via-blue-600 to-indigo-700',
    emoji: '🛍️',
  },
  {
    tag: '⚡ Flash Sale — Today Only',
    title: 'Best Tech', highlight: 'Deals Ever',
    sub: 'The latest electronics at prices you\'ve never seen before. Limited stock.',
    btn1: { label: 'Shop Electronics', to: '/products?sort=-ratings' },
    btn2: { label: 'Best Sellers', to: '/products?sort=-totalSold' },
    bg: 'from-indigo-700 via-purple-700 to-pink-700',
    emoji: '💻',
  },
  {
    tag: '🌟 Premium Collection',
    title: 'Elevate Your', highlight: 'Lifestyle',
    sub: 'Handpicked premium products for those who appreciate quality and style.',
    btn1: { label: 'Browse Collection', to: '/products?sort=-price' },
    btn2: { label: 'New Arrivals', to: '/products?sort=-createdAt' },
    bg: 'from-emerald-700 via-teal-600 to-cyan-700',
    emoji: '✨',
  },
];

const catIcons = { Electronics: Laptop, Clothing: Shirt, Books: BookOpen, Sports: Dumbbell, 'Home & Garden': HomeIcon };
const catBgs = {
  Electronics: 'from-blue-500 to-indigo-600',
  Clothing: 'from-pink-500 to-rose-600',
  Books: 'from-amber-500 to-orange-600',
  Sports: 'from-green-500 to-emerald-600',
  'Home & Garden': 'from-purple-500 to-violet-600',
};

const stats = [
  { num: '50K+', label: 'Happy Customers' },
  { num: '10K+', label: 'Products' },
  { num: '99%', label: 'Satisfaction Rate' },
  { num: '24/7', label: 'Customer Support' },
];

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'bg-blue-100 text-blue-600' },
  { icon: Shield, title: 'Secure Payment', desc: '100% safe transactions', color: 'bg-green-100 text-green-600' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy', color: 'bg-orange-100 text-orange-600' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here to help', color: 'bg-purple-100 text-purple-600' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Regular Customer', rating: 5, text: 'Amazing products and super fast shipping! I\'ve been shopping here for 2 years and never disappointed.', avatar: 'SJ' },
  { name: 'Michael Chen', role: 'Tech Enthusiast', rating: 5, text: 'Best prices on electronics I\'ve found anywhere. The quality is outstanding and customer service is top notch.', avatar: 'MC' },
  { name: 'Emily Rodriguez', role: 'Fashion Lover', rating: 5, text: 'Incredible selection of clothing. Found exactly what I needed and the delivery was faster than expected!', avatar: 'ER' },
];

export default function Home() {
  const dispatch = useDispatch();
  const { featured, categories, loading } = useSelector(s => s.products);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchFeatured());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = heroSlides[slide];

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════ HERO SLIDER ═══════════════════════════ */}
      <section className={`relative bg-gradient-to-br ${current.bg} text-white overflow-hidden`}
        style={{ transition: 'background 0.8s ease' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full font-semibold mb-5 border border-white/20">
                {current.tag}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
                {current.title}<br />
                <span className="text-yellow-300 drop-shadow-lg">{current.highlight}</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                {current.sub}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to={current.btn1.to}
                  className="bg-white text-blue-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-black/20 flex items-center gap-2 text-sm">
                  {current.btn1.label} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to={current.btn2.to}
                  className="border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-white/20 transition-all text-sm">
                  {current.btn2.label}
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mt-10 justify-center md:justify-start">
                {stats.map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-black text-yellow-300">{s.num}</p>
                    <p className="text-xs text-white/70 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="flex-1 flex justify-center items-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 rounded-3xl flex items-center justify-center text-8xl md:text-9xl backdrop-blur-sm border border-white/20 shadow-2xl"
                  style={{ animation: 'float 3s ease-in-out infinite' }}>
                  {current.emoji}
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce">
                  🔥 Hot Deal
                </div>
                <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  ⚡ Limited Time
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <button onClick={() => setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`rounded-full transition-all ${i === slide ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'}`} />
          ))}
          <button onClick={() => setSlide(s => (s + 1) % heroSlides.length)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }`}</style>
      </section>

      {/* ═════════════════════════ FEATURE STRIP ════════════════════════════ */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-center gap-3 group">
                <div className={`w-11 h-11 ${color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════ BRAND MARQUEE ════════════════════════════ */}
{/*      <section className="bg-gray-50 border-y border-gray-100 py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {['APPLE', 'SAMSUNG', 'NIKE', 'ADIDAS', 'SONY', 'LEVI'S', 'CANON', 'PUMA', 'BOSE', 'UNDER ARMOUR', 'LG', 'PHILIPS', 'APPLE', 'SAMSUNG', 'NIKE', 'ADIDAS', 'SONY', 'LEVI'S', 'CANON', 'PUMA', 'BOSE', 'UNDER ARMOUR', 'LG', 'PHILIPS'].map((brand, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-8 text-gray-400 font-black text-sm tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              {brand}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 30s linear infinite; }
        `}</style>
      </section>*/}
      <section className="bg-gray-50 border-y border-gray-100 py-5 overflow-hidden">
  <div className="flex animate-marquee whitespace-nowrap">
    {[
      'APPLE', 
      'SAMSUNG', 
      'NIKE', 
      'ADIDAS', 
      'SONY', 
      "LEVI'S", 
      'CANON', 
      'PUMA', 
      'BOSE', 
      'UNDER ARMOUR', 
      'LG', 
      'PHILIPS',
      'APPLE', 
      'SAMSUNG', 
      'NIKE', 
      'ADIDAS', 
      'SONY', 
      "LEVI'S", 
      'CANON', 
      'PUMA', 
      'BOSE', 
      'UNDER ARMOUR', 
      'LG', 
      'PHILIPS'
    ].map((brand, i) => (
      <span
        key={i}
        className="inline-flex items-center gap-2 mx-8 text-gray-400 font-black text-sm tracking-widest"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
        {brand}
      </span>
    ))}
  </div>

  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
  `}</style>
</section>

      {/* ═════════════════════════ PROMO BANNERS ════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 text-[120px] opacity-10 leading-none">🛒</div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">LIMITED OFFER</span>
            <h3 className="text-2xl md:text-3xl font-black mb-2">Summer Big Sale<br /><span className="text-yellow-300">Up to 60% OFF</span></h3>
            <p className="text-white/70 text-sm mb-5">Don't miss the biggest deals of the year on all categories.</p>
            <Link to="/products?sort=-totalSold" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
              Shop the Sale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden flex-1">
              <div className="absolute right-2 top-2 text-5xl opacity-20">⚡</div>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">FLASH DEALS</span>
              <h4 className="text-xl font-black mt-2 mb-1">Daily Drops</h4>
              <p className="text-white/70 text-xs mb-3">New deals every 24 hours</p>
              <Link to="/products?sort=-createdAt" className="text-xs font-bold text-white underline">Shop Now →</Link>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden flex-1">
              <div className="absolute right-2 top-2 text-5xl opacity-20">🎁</div>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">FREE GIFTS</span>
              <h4 className="text-xl font-black mt-2 mb-1">Over $100</h4>
              <p className="text-white/70 text-xs mb-3">Get a surprise gift on every order</p>
              <Link to="/products" className="text-xs font-bold text-white underline">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CATEGORIES ════════════════════════════ */}
      {categories.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Browse</span>
              <h2 className="text-3xl font-black text-gray-900 mt-1">Shop by Category</h2>
              <p className="text-gray-500 mt-2 text-sm">Find exactly what you're looking for</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map((cat, i) => {
                const Icon = catIcons[cat.name] || Grid3x3;
                const bg = catBgs[cat.name] || 'from-gray-500 to-gray-600';
                return (
                  <Link key={cat._id} to={`/products?category=${cat._id}`}
                    className="group relative bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
                    <div className={`w-14 h-14 bg-gradient-to-br ${bg} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="font-bold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">{cat.name}</p>
                    <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${bg} transform scale-x-0 group-hover:scale-x-100 transition-transform rounded-b-2xl`} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════ DEAL TAGS ════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 pt-2 pb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {[['🔥 Best Sellers','/products?sort=-totalSold','bg-red-50 text-red-700 border-red-200'],
            ['⭐ Top Rated','/products?sort=-ratings','bg-yellow-50 text-yellow-700 border-yellow-200'],
            ['✨ New Arrivals','/products?sort=-createdAt','bg-blue-50 text-blue-700 border-blue-200'],
            ['💰 Lowest Price','/products?sort=price','bg-green-50 text-green-700 border-green-200'],
            ['👑 Premium','/products?sort=-price','bg-purple-50 text-purple-700 border-purple-200'],
          ].map(([label, to, cls]) => (
            <Link key={to} to={to} className={`border text-xs font-bold px-4 py-2 rounded-full hover:shadow-sm transition-all ${cls}`}>
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════ FEATURED PRODUCTS ════════════════════════════ */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Featured
              </span>
              <h2 className="text-3xl font-black text-gray-900 mt-0.5">Handpicked For You</h2>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map(product => <ProductCard key={product._id} product={product} />)}
          </div>
        </section>
      )}

      {/* ═══════════════════════ WHY CHOOSE US ══════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-2">Why Thousands Choose ShopNow</h2>
            <p className="text-white/70">We're committed to making your shopping experience exceptional</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏆', title: 'Quality Guaranteed', desc: 'Every product is vetted for quality. We partner only with trusted brands and sellers to ensure you receive the best.' },
              { icon: '⚡', title: 'Lightning Fast Delivery', desc: 'Get your orders delivered in record time. Our logistics network ensures packages reach you quickly and safely.' },
              { icon: '💬', title: 'World-Class Support', desc: 'Our dedicated support team is available 24/7 via chat, email, and phone to help with any questions.' },
            ].map(item => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════════════ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl font-black text-gray-900 mt-1">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NEWSLETTER ════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
          </div>
          <div className="relative z-10">
            <Gift className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-black mb-2">Get 10% Off Your First Order</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">Subscribe to our newsletter and receive exclusive deals, early access to sales, and style tips.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50" />
              <button className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
                Subscribe & Save
              </button>
            </div>
            <p className="text-white/50 text-xs mt-3">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
