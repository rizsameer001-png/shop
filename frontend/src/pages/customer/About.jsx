import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, HeartHandshake, Leaf, Award, Users, Package, Globe, ArrowRight, Star } from 'lucide-react';

const team = [
  { name: 'Alex Morgan', role: 'CEO & Founder', avatar: 'AM', bio: '10+ years in e-commerce. Passionate about making great products accessible to everyone.', color: 'from-blue-500 to-indigo-600' },
  { name: 'Priya Sharma', role: 'Head of Design', avatar: 'PS', bio: 'Creates beautiful, intuitive shopping experiences that customers love to use every day.', color: 'from-pink-500 to-rose-600' },
  { name: 'James Wu', role: 'CTO', avatar: 'JW', bio: 'Leads our tech team in building fast, reliable, and secure systems for millions of shoppers.', color: 'from-emerald-500 to-teal-600' },
  { name: 'Sofia Garcia', role: 'Customer Success', avatar: 'SG', bio: 'Dedicated to ensuring every customer has an outstanding experience from browse to delivery.', color: 'from-amber-500 to-orange-600' },
];

const milestones = [
  { year: '2019', event: 'ShopNow Founded', desc: 'Started in a small office with a big vision to democratize online shopping.' },
  { year: '2020', event: '10,000 Customers', desc: 'Reached our first major milestone during the global shift to online retail.' },
  { year: '2022', event: 'Expanded Globally', desc: 'Launched international shipping to 50+ countries across 5 continents.' },
  { year: '2024', event: '500K+ Orders', desc: 'Half a million orders fulfilled with 99% customer satisfaction rate.' },
];

const values = [
  { icon: ShieldCheck, title: 'Trust & Transparency', desc: 'We believe every customer deserves honest information, fair pricing, and genuine product reviews.', color: 'bg-blue-100 text-blue-600' },
  { icon: HeartHandshake, title: 'Customer First', desc: 'Every decision we make starts with one question: is this the best experience for our customers?', color: 'bg-pink-100 text-pink-600' },
  { icon: Leaf, title: 'Sustainability', desc: "We're committed to reducing our carbon footprint through eco-friendly packaging and carbon-offset shipping.", color: 'bg-green-100 text-green-600' },
  { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standards in product quality, service delivery, and customer care.', color: 'bg-amber-100 text-amber-600' },
];

const stats = [
  { icon: Users, value: '50,000+', label: 'Happy Customers' },
  { icon: Package, value: '10,000+', label: 'Products' },
  { icon: Globe, value: '50+', label: 'Countries Served' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-white/5 rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold mb-5 border border-white/20">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            We're on a Mission to Make<br />
            <span className="text-yellow-300">Shopping Joyful</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            ShopNow was built on the belief that everyone deserves access to quality products at fair prices, with a shopping experience that feels personal and trustworthy.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">How It Started</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2 mb-5">From Idea to Trusted Marketplace</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>ShopNow was founded in 2019 with a simple idea: what if shopping online felt as good as shopping at your favourite local store — personal, trustworthy, and enjoyable?</p>
              <p>We started with just 50 products and a small team of 4 people. Today, we offer over 10,000 products across dozens of categories, serve customers in 50+ countries, and have a team of 120+ passionate people dedicated to making your experience exceptional.</p>
              <p>What hasn't changed is our core belief — that you deserve honest product information, fast reliable shipping, and customer support that actually helps when something goes wrong.</p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {milestones.map(m => (
              <div key={m.year} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <span className="text-2xl font-black text-blue-600">{m.year}</span>
                <p className="font-bold text-gray-900 text-sm mt-1">{m.event}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">The People Behind ShopNow</span>
          <h2 className="text-3xl font-black text-gray-900 mt-2">Meet Our Team</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">Passionate people working every day to make your shopping experience better.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <div className={`w-16 h-16 bg-gradient-to-br ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-black text-xl shadow-lg`}>
                {member.avatar}
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-blue-600 text-xs font-semibold mb-3">{member.role}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-14 px-4 text-white text-center">
        <h2 className="text-3xl font-black mb-3">Ready to Start Shopping?</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">Join 50,000+ happy customers and discover why ShopNow is the fastest growing online marketplace.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/products" className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg">
            Shop Now
          </Link>
          <Link to="/contact" className="border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-white/10 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
