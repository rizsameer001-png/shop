import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Truck, RotateCcw, Headphones,
  Star, ChevronLeft, ChevronRight, Zap, Sparkles,
  Laptop, Shirt, BookOpen, Dumbbell, Home as HomeIcon, Grid3x3, CheckCircle
} from 'lucide-react';
import { fetchFeatured, fetchCategories } from '../../store/slices/productSlice';
import ProductCard from '../../components/common/ProductCard';
import { getCMS } from '../../utils/cmsStore';

const catBgs   = { Electronics:'from-blue-600 to-indigo-700', Clothing:'from-pink-500 to-rose-600', Books:'from-amber-500 to-orange-600', Sports:'from-green-500 to-emerald-600', 'Home & Garden':'from-purple-500 to-violet-600' };
const catIcons = { Electronics:Laptop, Clothing:Shirt, Books:BookOpen, Sports:Dumbbell, 'Home & Garden':HomeIcon };
const brands   = ['APPLE','SAMSUNG','NIKE','ADIDAS','SONY',"LEVI'S",'CANON','PUMA','BOSE','PHILIPS','DYSON','ARMOUR'];

export default function Home() {
  const dispatch = useDispatch();
  const { featured, categories } = useSelector(s => s.products);
  const [slide, setSlide] = useState(0);
  const [cms]  = useState(() => getCMS());
  const iRef   = useRef(null);

  const banners = (cms.banners || []).filter(b => b.active);
  const promos  = (cms.promos  || []).filter(p => p.active);

  useEffect(() => { dispatch(fetchFeatured()); dispatch(fetchCategories()); }, [dispatch]);

  useEffect(() => {
    if (banners.length < 2) return;
    iRef.current = setInterval(() => setSlide(s => (s+1) % banners.length), 5500);
    return () => clearInterval(iRef.current);
  }, [banners.length]);

  const goPrev = () => { clearInterval(iRef.current); setSlide(s => (s-1+banners.length) % banners.length); };
  const goNext = () => { clearInterval(iRef.current); setSlide(s => (s+1) % banners.length); };

  const cur = banners[slide] || {};
  const largeP  = promos.find(p => p.size === 'large');
  const smallPs = promos.filter(p => p.size === 'small');

  return (
    <div className="overflow-x-hidden">

      {/* HERO */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${cur.bg || 'from-gray-900 to-gray-800'}`} style={{transition:'background 0.9s ease', minHeight:'540px'}}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-xl"/>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-lg"/>
          <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'32px 32px'}}/>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left" key={slide}>
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 fade-in-up">
                <Sparkles className="w-3 h-3 text-yellow-300"/> {cur.tag || '🎉 New Collection'}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[68px] font-black leading-[1.05] text-white mb-5 fade-in-up" style={{animationDelay:'60ms'}}>
                {cur.title || 'Discover Your'}<br/>
                <span className="text-yellow-300 drop-shadow-lg playfair italic">{cur.highlight || 'Perfect Style'}</span>
              </h1>
              <p className="text-white/75 text-base md:text-lg mb-8 max-w-lg leading-relaxed fade-in-up" style={{animationDelay:'120ms'}}>
                {cur.subtitle || 'Explore thousands of products from top brands with unbeatable deals every day.'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start fade-in-up" style={{animationDelay:'180ms'}}>
                <Link to={cur.btn1Link || '/products'} className="flex items-center gap-2 bg-white text-gray-900 font-black px-7 py-3.5 rounded-2xl hover:bg-yellow-300 transition-all shadow-2xl shadow-black/25 text-sm">
                  {cur.btn1Label || 'Shop Now'} <ArrowRight className="w-4 h-4"/>
                </Link>
                <Link to={cur.btn2Link || '/products?sort=-totalSold'} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-white/20 transition-all text-sm">
                  {cur.btn2Label || 'View Deals'}
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-10 justify-center md:justify-start fade-in-up" style={{animationDelay:'240ms'}}>
                {[['50K+','Customers'],['10K+','Products'],['99%','Satisfaction']].map(([n,l]) => (
                  <div key={l} className="text-center">
                    <p className="text-2xl font-black text-yellow-300 leading-none">{n}</p>
                    <p className="text-[11px] text-white/60 font-medium mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 relative">
              <div className="float w-56 h-56 md:w-72 md:h-72 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-8xl md:text-[100px] border border-white/20 shadow-2xl">
                {cur.emoji || '🛍️'}
              </div>
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-full shadow-xl animate-bounce">🔥 HOT</div>
              <div className="absolute -bottom-3 -left-3 bg-white text-gray-900 text-xs font-black px-3 py-1.5 rounded-full shadow-xl">⚡ LIMITED</div>
            </div>
          </div>
        </div>
        {banners.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            <button onClick={goPrev} className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"><ChevronLeft className="w-4 h-4"/></button>
            {banners.map((_,i) => <button key={i} onClick={() => setSlide(i)} className={`rounded-full transition-all duration-300 ${i===slide?'w-6 h-2.5 bg-white':'w-2.5 h-2.5 bg-white/35 hover:bg-white/60'}`}/>)}
            <button onClick={goNext} className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"><ChevronRight className="w-4 h-4"/></button>
          </div>
        )}
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{icon:Truck,t:'Free Shipping',s:'On orders over $50',c:'bg-blue-50 text-blue-600'},{icon:Shield,t:'Secure Payment',s:'100% safe & encrypted',c:'bg-green-50 text-green-600'},{icon:RotateCcw,t:'Easy Returns',s:'30-day return policy',c:'bg-orange-50 text-orange-500'},{icon:Headphones,t:'24/7 Support',s:'Always here to help',c:'bg-purple-50 text-purple-600'}].map(({icon:Icon,t,s,c}) => (
            <div key={t} className="flex items-center gap-3 group">
              <div className={`w-11 h-11 ${c} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}><Icon className="w-5 h-5"/></div>
              <div><p className="font-bold text-sm text-gray-900">{t}</p><p className="text-xs text-gray-500">{s}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <section className="bg-gray-950 py-5 overflow-hidden border-b border-gray-800">
        <div className="flex marquee-track whitespace-nowrap">
          {[...brands,...brands].map((b,i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-8 text-gray-600 font-black text-xs tracking-[0.2em]">
              <span className="w-1 h-1 rounded-full bg-orange-500 inline-block"/>{b}
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="mesh-bg py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <span className="section-tag">Browse</span>
              <h2 className="section-title">Shop by <span className="playfair italic text-orange-500">Category</span></h2>
              <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">Find exactly what you're looking for across our curated collections</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map(cat => {
                const Icon = catIcons[cat.name] || Grid3x3;
                const bg   = catBgs[cat.name]   || 'from-gray-600 to-gray-700';
                return (
                  <Link key={cat._id} to={'/products?category='+cat._id}
                    className="group relative bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 overflow-hidden">
                    <div className={`w-14 h-14 bg-gradient-to-br ${bg} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-7 h-7 text-white"/>
                    </div>
                    <p className="font-bold text-sm text-gray-800 group-hover:text-gray-900">{cat.name}</p>
                    <div className={`absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r ${bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}/>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PROMO BANNERS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {largeP && (
            <div className={`md:col-span-2 bg-gradient-to-br ${largeP.bg} rounded-3xl p-8 md:p-10 text-white relative overflow-hidden group`}>
              <div className="absolute right-0 top-0 text-[140px] opacity-10 leading-none select-none group-hover:scale-110 transition-transform duration-500">{largeP.emoji}</div>
              <span className="relative inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 border border-white/20">{largeP.label}</span>
              <h3 className="relative text-2xl md:text-4xl font-black mb-1">{largeP.title}</h3>
              <p className="relative text-yellow-300 text-2xl md:text-4xl font-black mb-3 playfair italic">{largeP.highlight}</p>
              <p className="relative text-white/70 text-sm mb-6">{largeP.subtitle}</p>
              <Link to={largeP.btnLink || '/products'} className="relative inline-flex items-center gap-2 bg-white text-gray-900 font-black text-sm px-6 py-3 rounded-2xl hover:bg-yellow-300 transition-all shadow-xl">
                {largeP.btnLabel} <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {smallPs.map(p => (
              <div key={p.id} className={`bg-gradient-to-br ${p.bg} rounded-2xl p-6 text-white relative overflow-hidden group flex-1`}>
                <div className="absolute right-3 top-3 text-5xl opacity-15 select-none group-hover:scale-110 transition-transform duration-300">{p.emoji}</div>
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full border border-white/20">{p.label}</span>
                <h4 className="text-xl font-black mt-2 mb-0.5">{p.title}</h4>
                <p className="text-white/70 text-xs mb-3">{p.subtitle}</p>
                <Link to={p.btnLink || '/products'} className="text-xs font-bold text-white underline underline-offset-2 hover:no-underline">{p.btnLabel} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER TAGS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8 flex flex-wrap gap-2 justify-center">
        {[['🔥 Best Sellers','/products?sort=-totalSold','bg-red-50 text-red-600 border-red-200'],['⭐ Top Rated','/products?sort=-ratings','bg-yellow-50 text-yellow-700 border-yellow-200'],['✨ New Arrivals','/products?sort=-createdAt','bg-blue-50 text-blue-700 border-blue-200'],['💰 Lowest Price','/products?sort=price','bg-green-50 text-green-700 border-green-200'],['👑 Premium','/products?sort=-price','bg-purple-50 text-purple-700 border-purple-200']].map(([l,t,c]) => (
          <Link key={t} to={t} className={`border text-xs font-bold px-5 py-2 rounded-full hover:shadow-md transition-all ${c}`}>{l}</Link>
        ))}
      </div>

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="section-tag flex items-center gap-1.5"><Zap className="w-3.5 h-3.5"/>Featured</span>
              <h2 className="section-title">Handpicked <span className="playfair italic text-orange-500">For You</span></h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-900 border-2 border-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-900 hover:text-white transition-all">
              View All <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {featured.map(product => <ProductCard key={product._id} product={product}/>)}
          </div>
        </section>
      )}

      {/* WHY US — DARK */}
      <section className="bg-gray-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%)'}}/>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="section-tag">Why ShopNow</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">Thousands Choose Us <span className="playfair italic text-orange-400">Every Day</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{e:'🏆',t:'Quality Guaranteed',d:'Every product is vetted for quality. We partner only with trusted brands so you always receive the best.'},{e:'⚡',t:'Lightning Fast Delivery',d:"Our logistics network ensures your orders arrive in record time — safely and reliably."},{e:'💬',t:'World-Class Support',d:'Our dedicated team is available 24/7 via chat, email, and phone to help with anything.'}].map(item => (
              <div key={item.t} className="group bg-white/5 rounded-3xl p-7 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.e}</div>
                <h3 className="font-bold text-white text-lg mb-2">{item.t}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mesh-bg py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="section-tag">Reviews</span>
            <h2 className="section-title">What Our Customers <span className="playfair italic text-orange-500">Say</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[{name:'Sarah Johnson',role:'Regular Customer',rating:5,text:"Amazing products and super fast shipping! I've been shopping here for 2 years and never disappointed.",av:'SJ',c:'from-orange-400 to-red-500'},{name:'Michael Chen',role:'Tech Enthusiast',rating:5,text:"Best prices on electronics anywhere. Quality is outstanding and customer service is top notch.",av:'MC',c:'from-blue-400 to-indigo-500'},{name:'Emily Rodriguez',role:'Fashion Lover',rating:5,text:"Incredible clothing selection. Found exactly what I needed and delivery was faster than expected!",av:'ER',c:'from-pink-400 to-rose-500'}].map(t => (
              <div key={t.name} className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="flex gap-0.5 mb-4">{[...Array(t.rating)].map((_,i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400"/>)}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${t.c} rounded-xl flex items-center justify-center text-white font-black text-sm shadow`}>{t.av}</div>
                  <div><p className="font-bold text-sm text-gray-900">{t.name}</p><p className="text-xs text-gray-400">{t.role}</p></div>
                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="bg-gray-950 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle at 30% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)'}}/>
          <div className="relative z-10">
            <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full border border-orange-500/30 mb-5 tracking-widest uppercase">Exclusive Offer</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-1">Get <span className="text-orange-400 playfair italic">10% Off</span></h2>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Your First Order</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">Subscribe for exclusive deals, early access to sales, and style inspiration.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-orange-500 transition-all"/>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-7 py-3.5 rounded-2xl transition-all text-sm whitespace-nowrap shadow-xl shadow-orange-500/25 hover:-translate-y-0.5">
                Subscribe & Save
              </button>
            </div>
            <p className="text-gray-700 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
