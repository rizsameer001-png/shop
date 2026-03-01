import { Link } from 'react-router-dom';
import { Image, FileText, Phone, Settings, ChevronRight, Megaphone, Globe } from 'lucide-react';

const sections = [
  { to: '/admin/cms/banners',  icon: Image,     color: 'bg-blue-100 text-blue-600',   title: 'Hero Banners',     desc: 'Edit homepage slider slides — title, subtitle, buttons, gradient, emoji.' },
  { to: '/admin/cms/promos',   icon: Megaphone, color: 'bg-orange-100 text-orange-600',title: 'Promo Banners',    desc: 'Manage the promotional offer cards below the hero slider.' },
  { to: '/admin/cms/about',    icon: FileText,  color: 'bg-green-100 text-green-600',  title: 'About Us Page',   desc: 'Edit company story, team members, milestones and stats.' },
  { to: '/admin/cms/contact',  icon: Phone,     color: 'bg-purple-100 text-purple-600',title: 'Contact Info',    desc: 'Update phone, email, address, office hours displayed on Contact page.' },
  { to: '/admin/cms/settings', icon: Settings,  color: 'bg-gray-100 text-gray-600',   title: 'Site Settings',   desc: 'Site name, announcement bar, social links, logo and brand color.' },
];

export default function CMSHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-600" /> Content Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Edit the content displayed on your public-facing website without touching code.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map(({ to, icon: Icon, color, title, desc }) => (
          <Link key={to} to={to}
            className="card p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>

      <div className="card p-5 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-800 font-medium">
          💡 <strong>How it works:</strong> All changes are saved instantly to local storage and reflected on your storefront immediately. No server restart needed.
        </p>
      </div>
    </div>
  );
}
