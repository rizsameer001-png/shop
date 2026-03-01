import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, GripVertical, Eye, EyeOff, Save, RotateCcw } from 'lucide-react';
import { getCMS, updateCMSSection, getCMSDefaults } from '../../utils/cmsStore';
import toast from 'react-hot-toast';

const gradients = [
  { label: 'Orange Fire',    value: 'from-orange-600 via-orange-500 to-amber-500' },
  { label: 'Indigo Purple',  value: 'from-indigo-700 via-purple-600 to-pink-600' },
  { label: 'Green Teal',     value: 'from-emerald-700 via-teal-600 to-cyan-600' },
  { label: 'Blue Indigo',    value: 'from-blue-700 via-blue-600 to-indigo-700' },
  { label: 'Rose Pink',      value: 'from-rose-600 via-pink-500 to-fuchsia-500' },
  { label: 'Dark Slate',     value: 'from-slate-800 via-slate-700 to-gray-800' },
  { label: 'Yellow Amber',   value: 'from-yellow-600 via-amber-500 to-orange-500' },
  { label: 'Green Lime',     value: 'from-green-700 via-lime-600 to-emerald-500' },
];

const emojis = ['🛍️','💻','✨','🎉','🔥','👑','🎁','⚡','🌟','🏆','💎','🚀'];

const defaultBanner = () => ({
  id: 'b' + Date.now(),
  active: true,
  order: 0,
  tag: '🎉 New Offer',
  title: 'Amazing',
  highlight: 'Deals Await',
  subtitle: 'Discover our latest collection of top products.',
  btn1Label: 'Shop Now', btn1Link: '/products',
  btn2Label: 'View Deals', btn2Link: '/products?sort=-totalSold',
  bg: gradients[0].value,
  emoji: '🛍️',
});

export default function CMSBanners() {
  const [banners, setBanners] = useState(() => getCMS().banners);
  const [editing, setEditing] = useState(null); // index
  const [dirty, setDirty]     = useState(false);
  const [dragIdx, setDragIdx] = useState(null);

  const update = (idx, key, val) => {
    const updated = banners.map((b, i) => i === idx ? { ...b, [key]: val } : b);
    setBanners(updated); setDirty(true);
  };

  const addBanner = () => {
    const nb = defaultBanner();
    setBanners(prev => [...prev, nb]);
    setEditing(banners.length);
    setDirty(true);
  };

  const removeBanner = (idx) => {
    setBanners(prev => prev.filter((_, i) => i !== idx));
    if (editing === idx) setEditing(null);
    setDirty(true);
  };

  const toggleActive = (idx) => update(idx, 'active', !banners[idx].active);

  const onDragOver = (e, idx) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const arr = [...banners];
    const [moved] = arr.splice(dragIdx, 1);
    arr.splice(idx, 0, moved);
    setBanners(arr); setDragIdx(idx); setDirty(true);
  };

  const save = () => {
    updateCMSSection('banners', banners);
    setDirty(false);
    toast.success('Banners saved! Changes are live on your storefront.');
  };

  const reset = () => {
    setBanners(getCMSDefaults().banners);
    setDirty(true);
    toast('Reset to defaults');
  };

  const ed = editing !== null ? banners[editing] : null;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Link to="/admin/cms" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5"/></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Hero Banners</h1>
          <p className="text-sm text-gray-500">Manage the rotating slides on your homepage hero.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="btn-secondary flex items-center gap-2 text-sm"><RotateCcw className="w-4 h-4"/>Reset</button>
          <button onClick={save} disabled={!dirty} className="btn-primary flex items-center gap-2 text-sm"><Save className="w-4 h-4"/>Save Changes</button>
        </div>
      </div>

      {dirty && <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-amber-800 text-sm font-medium">⚠️ You have unsaved changes. Click "Save Changes" to apply them to your storefront.</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Banner list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-700 text-sm">Slides ({banners.length})</p>
            <button onClick={addBanner} className="btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"><Plus className="w-3.5 h-3.5"/>Add Slide</button>
          </div>

          {banners.map((b, idx) => (
            <div key={b.id} draggable
              onDragStart={() => setDragIdx(idx)}
              onDragOver={e => onDragOver(e, idx)}
              onDragEnd={() => setDragIdx(null)}
              onClick={() => setEditing(idx === editing ? null : idx)}
              className={`card p-4 cursor-pointer transition-all ${editing === idx ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'} ${dragIdx === idx ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-300 cursor-grab flex-shrink-0"/>
                {/* Mini preview */}
                <div className={`w-14 h-9 bg-gradient-to-br ${b.bg} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>{b.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{b.title} {b.highlight}</p>
                  <p className="text-xs text-gray-500 truncate">{b.tag}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={e => {e.stopPropagation(); toggleActive(idx);}}
                    className={`p-1.5 rounded-lg transition-colors ${b.active ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'}`}>
                    {b.active ? <Eye className="w-3.5 h-3.5"/> : <EyeOff className="w-3.5 h-3.5"/>}
                  </button>
                  <button onClick={e => {e.stopPropagation(); removeBanner(idx);}}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5"/>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {banners.length === 0 && (
            <div className="card p-10 text-center text-gray-400">
              <p className="font-semibold mb-2">No banners yet</p>
              <button onClick={addBanner} className="btn-primary text-sm">Add First Slide</button>
            </div>
          )}
        </div>

        {/* Editor */}
        {ed && (
          <div className="card p-5 space-y-4 sticky top-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Edit Slide {editing + 1}</h3>
              {/* Live preview */}
              <div className={`w-16 h-10 bg-gradient-to-br ${ed.bg} rounded-lg flex items-center justify-center text-2xl`}>{ed.emoji}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600">Main Title</label>
                <input value={ed.title} onChange={e => update(editing, 'title', e.target.value)} className="input mt-1 text-sm" placeholder="Discover Your"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Highlight (accent)</label>
                <input value={ed.highlight} onChange={e => update(editing, 'highlight', e.target.value)} className="input mt-1 text-sm" placeholder="Perfect Style"/>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Tag / Badge Text</label>
              <input value={ed.tag} onChange={e => update(editing, 'tag', e.target.value)} className="input mt-1 text-sm" placeholder="🎉 New Season Sale"/>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Subtitle</label>
              <textarea value={ed.subtitle} onChange={e => update(editing, 'subtitle', e.target.value)} className="input mt-1 text-sm resize-none h-16"/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600">Button 1 Label</label>
                <input value={ed.btn1Label} onChange={e => update(editing, 'btn1Label', e.target.value)} className="input mt-1 text-sm"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Button 1 Link</label>
                <input value={ed.btn1Link} onChange={e => update(editing, 'btn1Link', e.target.value)} className="input mt-1 text-sm" placeholder="/products"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Button 2 Label</label>
                <input value={ed.btn2Label} onChange={e => update(editing, 'btn2Label', e.target.value)} className="input mt-1 text-sm"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Button 2 Link</label>
                <input value={ed.btn2Link} onChange={e => update(editing, 'btn2Link', e.target.value)} className="input mt-1 text-sm" placeholder="/products?sort=-totalSold"/>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Background Gradient</label>
              <div className="grid grid-cols-4 gap-2">
                {gradients.map(g => (
                  <button key={g.value} type="button" onClick={() => update(editing, 'bg', g.value)}
                    title={g.label}
                    className={`h-8 rounded-lg bg-gradient-to-br ${g.value} border-2 transition-all ${ed.bg === g.value ? 'border-blue-500 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}/>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Emoji</label>
              <div className="flex flex-wrap gap-2">
                {emojis.map(em => (
                  <button key={em} type="button" onClick={() => update(editing, 'emoji', em)}
                    className={`w-9 h-9 text-xl rounded-lg border-2 transition-all ${ed.emoji === em ? 'border-blue-500 bg-blue-50 scale-110' : 'border-gray-200 hover:border-gray-300'}`}>
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
