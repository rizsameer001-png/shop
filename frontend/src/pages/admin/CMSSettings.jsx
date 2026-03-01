import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Save, RotateCcw, Settings, Bell, Globe, Share2, ExternalLink } from 'lucide-react';
import { getCMS, updateCMSSection, getCMSDefaults } from '../../utils/cmsStore';
import toast from 'react-hot-toast';

export default function CMSSettings() {
  const [form, setForm] = useState(() => getCMS().siteSettings);
  const [dirty, setDirty] = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setDirty(true); };

  const save = () => {
    updateCMSSection('siteSettings', form);
    setDirty(false);
    toast.success('Site settings saved! Refresh your storefront to see changes.');
  };

  const reset = () => { setForm(getCMSDefaults().siteSettings); setDirty(true); };

  const f = (k) => ({ value: form[k] || '', onChange: e => set(k, e.target.value) });

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link to="/admin/cms" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5"/></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Settings className="w-6 h-6 text-gray-600"/>Site Settings</h1>
          <p className="text-sm text-gray-500">Global settings that affect the entire storefront.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="btn-secondary flex items-center gap-2 text-sm"><RotateCcw className="w-4 h-4"/>Reset</button>
          <button onClick={save} disabled={!dirty} className="btn-primary flex items-center gap-2 text-sm"><Save className="w-4 h-4"/>Save</button>
        </div>
      </div>

      {dirty && <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-amber-800 text-sm font-medium">⚠️ Unsaved changes</div>}

      {/* Brand */}
      <div className="card p-6 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-600"/>Brand Identity</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Site Name</label>
            <input {...f('siteName')} className="input mt-1" placeholder="ShopNow"/>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Tagline</label>
            <input {...f('tagline')} className="input mt-1" placeholder="Your trusted destination…"/>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Logo URL <span className="text-gray-400 font-normal">(leave blank for text logo)</span></label>
          <input {...f('logo')} className="input mt-1" placeholder="https://example.com/logo.png"/>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Contact Email (shown in top bar)</label>
          <input {...f('email')} className="input mt-1" placeholder="support@shopnow.com"/>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Contact Phone (shown in top bar)</label>
          <input {...f('phone')} className="input mt-1" placeholder="+1 800-SHOPNOW"/>
        </div>
      </div>

      {/* Announcement bar */}
      <div className="card p-6 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Bell className="w-5 h-5 text-orange-500"/>Announcement Bar</h2>
        <p className="text-xs text-gray-500">Displayed as an orange banner at the very top of every page.</p>
        <div>
          <label className="text-sm font-semibold text-gray-700">Announcement Text</label>
          <input {...f('announcement')} className="input mt-1" placeholder="🎉 Free shipping on all orders over $50!"/>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div className={`w-12 h-6 rounded-full transition-colors relative ${form.announcementActive ? 'bg-orange-500' : 'bg-gray-200'}`}
            onClick={() => set('announcementActive', !form.announcementActive)}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.announcementActive ? 'left-[26px]' : 'left-0.5'}`}/>
          </div>
          <span className="text-sm font-semibold text-gray-700">{form.announcementActive ? 'Announcement bar is VISIBLE' : 'Announcement bar is HIDDEN'}</span>
        </label>
        {form.announcement && (
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold py-2 px-4 text-center rounded-xl">
            Preview: {form.announcement}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="card p-6 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Share2 className="w-5 h-5 text-blue-600"/>Social Media Links</h2>
        <p className="text-xs text-gray-500">Shown in the footer. Use full URLs (https://…) or # to hide.</p>
        {[['socialFacebook','Facebook'],['socialTwitter','Twitter / X'],['socialInstagram','Instagram'],['socialYoutube','YouTube']].map(([k,l]) => (
          <div key={k}>
            <label className="text-sm font-semibold text-gray-700">{l}</label>
            <input {...f(k)} className="input mt-1" placeholder="https://facebook.com/yourpage"/>
          </div>
        ))}
      </div>

      {/* Preview link */}
      <div className="card p-4 bg-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-600">View your storefront to see changes</p>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 text-sm">
          <ExternalLink className="w-4 h-4"/> Open Storefront
        </a>
      </div>
    </div>
  );
}
