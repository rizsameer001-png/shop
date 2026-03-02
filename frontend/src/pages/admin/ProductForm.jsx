import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ChevronLeft, Save, Upload, X, Plus, ImageIcon,
  Star, GripVertical, Link2, Cloud, AlertCircle, Loader, CheckCircle
} from 'lucide-react';
import { fetchCategories } from '../../store/slices/productSlice';
import { createProduct, updateProduct } from '../../store/slices/adminSlice';
import api from '../../services/api';
import toast from 'react-hot-toast';

// ─── Cloudinary config (set in frontend/.env) ───────────────────────────────
// VITE_CLOUDINARY_CLOUD_NAME=dp8xxxxxx
// VITE_CLOUDINARY_UPLOAD_PRESET=shopnow_unsigned   ← create this in Cloudinary dashboard
const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    || '';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';
const CL_URL        = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const cloudinaryOn  = () => Boolean(CLOUD_NAME);

// ─── Accepted formats ────────────────────────────────────────────────────────
const OK_TYPES = ['image/jpeg','image/jpg','image/png','image/webp','image/tiff','image/tif','image/bmp','image/gif','image/svg+xml'];
const OK_EXT   = /\.(jpe?g|png|webp|tiff?|bmp|gif|svg)$/i;
const isImg    = (f) => OK_TYPES.includes(f.type) || OK_EXT.test(f.name);

// ─── Upload to Cloudinary (direct browser → CDN, no backend involved) ───────
const uploadCloud = (file, onPct) =>
  new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', UPLOAD_PRESET);
    fd.append('folder', 'shopnow/products');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', CL_URL);
    xhr.upload.onprogress = e => { if (e.lengthComputable && onPct) onPct(Math.round(e.loaded/e.total*100)); };
    xhr.onload = () => {
      if (xhr.status === 200) {
        const d = JSON.parse(xhr.responseText);
        resolve({ public_id: d.public_id, url: d.secure_url });
      } else {
        try { reject(new Error(JSON.parse(xhr.responseText).error?.message || 'Upload failed')); }
        catch { reject(new Error(`HTTP ${xhr.status}`)); }
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(fd);
  });

// ─── Fallback local compression (when Cloudinary not configured) ─────────────
const compressLocal = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onerror = () => rej(new Error('Read failed'));
    reader.onload  = e => {
      const img = new Image();
      img.onerror = () => rej(new Error('Decode failed'));
      img.onload  = () => {
        for (const [d, q] of [[800,0.78],[650,0.70],[500,0.62],[400,0.55]]) {
          let {width:w,height:h} = img;
          if (w>d){h=Math.round(h*d/w);w=d;} if (h>d){w=Math.round(w*d/h);h=d;}
          const cv = document.createElement('canvas'); cv.width=w; cv.height=h;
          const ctx = cv.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h); ctx.drawImage(img,0,0,w,h);
          const out = cv.toDataURL(file.type==='image/svg+xml'?'image/png':'image/jpeg', q);
          if (out.length < 400*1024 || q===0.55) return res(out);
        }
        res(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

// ─────────────────────────────────────────────────────────────────────────────
export default function ProductForm() {
  const { id }  = useParams();
  const isEdit  = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector(s => s.products);
  const { loading }    = useSelector(s => s.admin);
  const fileInputRef   = useRef(null);

  const [form, setForm] = useState({
    name:'', description:'', price:'', comparePrice:'',
    category:'', brand:'', stock:'', sku:'',
    isFeatured:false, isActive:true,
  });
  const [images, setImages]           = useState([]);
  const [urlInput, setUrlInput]       = useState('');
  const [showUrl, setShowUrl]         = useState(false);
  const [dragOver, setDragOver]       = useState(false);
  const [dragIdx, setDragIdx]         = useState(null);
  const [mainIdx, setMainIdx]         = useState(0);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/products/${id}`)
      .then(({ data }) => {
        const p = data.product;
        setForm({
          name:p.name, description:p.description, price:p.price,
          comparePrice:p.comparePrice||'', category:p.category?._id||'',
          brand:p.brand||'', stock:p.stock, sku:p.sku||'',
          isFeatured:p.isFeatured, isActive:p.isActive,
        });
        if (p.images?.length) setImages(p.images.map(img => ({...img, uploading:false})));
      })
      .catch(() => toast.error('Failed to load product'));
  }, [id, isEdit]);

  const handleFiles = async (rawFiles) => {
    const valid    = Array.from(rawFiles).filter(isImg);
    const rejected = Array.from(rawFiles).filter(f => !isImg(f));
    if (rejected.length) toast(`Skipped: ${rejected.map(f=>f.name).join(', ')}`);
    if (!valid.length)   { toast.error('No valid images found'); return; }
    if (images.length + valid.length > 8) { toast.error('Max 8 images'); return; }

    const slots = valid.map(file => ({
      public_id: 'pending_' + Date.now() + '_' + Math.random().toString(36).slice(2),
      url: URL.createObjectURL(file),
      uploading:true, progress:0, file, name:file.name,
    }));
    setImages(prev => [...prev, ...slots]);

    await Promise.all(slots.map(async slot => {
      const pid = slot.public_id;
      try {
        let result;
        if (cloudinaryOn()) {
          result = await uploadCloud(slot.file, pct =>
            setImages(prev => prev.map(i => i.public_id===pid ? {...i, progress:pct} : i))
          );
        } else {
          const url = await compressLocal(slot.file);
          result = { public_id:'local_'+Date.now(), url };
        }
        setImages(prev => prev.map(i => i.public_id===pid
          ? { public_id:result.public_id, url:result.url, name:slot.file.name, uploading:false, progress:100 }
          : i
        ));
      } catch (err) {
        setImages(prev => prev.map(i => i.public_id===pid ? {...i, uploading:false, error:err.message} : i));
        toast.error(`"${slot.file.name}" failed: ${err.message}`);
      }
    }));
    toast.success(`${slots.length} image${slots.length>1?'s':''} uploaded ✓`);
  };

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); };

  const addUrl = () => {
    if (!urlInput.trim()) return;
    try { new URL(urlInput); } catch { toast.error('Invalid URL'); return; }
    if (images.length >= 8) { toast.error('Max 8 images'); return; }
    setImages(prev => [...prev, { public_id:'url_'+Date.now(), url:urlInput.trim() }]);
    setUrlInput(''); setShowUrl(false); toast.success('URL added');
  };

  const remove = (idx) => {
    setImages(prev => prev.filter((_,i) => i!==idx));
    if (mainIdx >= idx && mainIdx > 0) setMainIdx(m => m-1);
  };

  const retry = (idx) => { const f = images[idx].file; remove(idx); if (f) handleFiles([f]); };

  const onDragStart = (i) => setDragIdx(i);
  const onDragOver  = (e, i) => {
    e.preventDefault();
    if (dragIdx===null || dragIdx===i) return;
    const arr = [...images]; const [m] = arr.splice(dragIdx,1); arr.splice(i,0,m);
    const nm  = dragIdx===mainIdx ? i : i===mainIdx ? dragIdx : mainIdx;
    setImages(arr); setDragIdx(i); setMainIdx(nm);
  };

  const anyUploading = images.some(i => i.uploading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (anyUploading) { toast.error('Wait for uploads to finish'); return; }
    const ready = images.filter(i => !i.error && !i.uploading);
    if (!ready.length) { toast.error('Add at least one image'); return; }
    const ordered = [...ready];
    if (mainIdx > 0 && mainIdx < ordered.length) { const [m]=ordered.splice(mainIdx,1); ordered.unshift(m); }
    const productData = {
      ...form, price:Number(form.price), stock:Number(form.stock),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
      images: ordered.map(({ public_id, url }) => ({ public_id, url })),
    };
    const result = isEdit
      ? await dispatch(updateProduct({ id, ...productData }))
      : await dispatch(createProduct(productData));
    if (!result.error) { toast.success(isEdit ? 'Product updated!' : 'Product created!'); navigate('/admin/products'); }
    else toast.error(result.payload || 'Something went wrong');
  };

  const f = k => ({ value:form[k], onChange:e => setForm({...form,[k]:e.target.value}) });

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <Link to="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5"/></Link>
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Product' : 'New Product'}</h1>
        {cloudinaryOn()
          ? <span className="ml-auto flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full font-medium"><Cloud className="w-3.5 h-3.5"/>Cloudinary connected</span>
          : <span className="ml-auto flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-medium"><AlertCircle className="w-3.5 h-3.5"/>Set VITE_CLOUDINARY_CLOUD_NAME in .env</span>
        }
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="card p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Basic Info</h2>
          <div><label className="text-sm font-medium text-gray-700">Product Name *</label><input {...f('name')} className="input mt-1" required/></div>
          <div><label className="text-sm font-medium text-gray-700">Description *</label><textarea {...f('description')} className="input mt-1 h-28 resize-none" required/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-gray-700">Brand</label><input {...f('brand')} className="input mt-1" placeholder="Apple, Nike..."/></div>
            <div><label className="text-sm font-medium text-gray-700">SKU</label><input {...f('sku')} className="input mt-1" placeholder="Auto-generated if empty"/></div>
          </div>
        </div>

        {/* Pricing */}
        <div className="card p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Pricing & Inventory</h2>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-sm font-medium text-gray-700">Price ($) *</label><input {...f('price')} type="number" min="0" step="0.01" className="input mt-1" required/></div>
            <div><label className="text-sm font-medium text-gray-700">Compare Price ($)</label><input {...f('comparePrice')} type="number" min="0" step="0.01" className="input mt-1"/></div>
            <div><label className="text-sm font-medium text-gray-700">Stock *</label><input {...f('stock')} type="number" min="0" className="input mt-1" required/></div>
          </div>
          <div><label className="text-sm font-medium text-gray-700">Category *</label>
            <select {...f('category')} className="input mt-1" required>
              <option value="">Select category</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Images */}
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600"/>Product Images
              <span className="text-xs font-normal text-gray-400">({images.filter(i=>!i.error).length}/8)</span>
            </h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowUrl(v=>!v)} className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"><Link2 className="w-3.5 h-3.5"/>URL</button>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"><Upload className="w-3.5 h-3.5"/>Upload</button>
            </div>
          </div>

          {cloudinaryOn() && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <Cloud className="w-4 h-4 text-green-600 flex-shrink-0"/>
              <p className="text-xs text-green-700 font-medium">Images upload directly to Cloudinary — bypasses your server entirely. No 413 errors.</p>
            </div>
          )}

          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => { handleFiles(e.target.files); e.target.value=''; }}/>

          {showUrl && (
            <div className="flex gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <input type="url" value={urlInput} onChange={e=>setUrlInput(e.target.value)} placeholder="https://example.com/image.jpg"
                className="input flex-1 text-sm bg-white" onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addUrl())}/>
              <button type="button" onClick={addUrl} className="btn-primary text-xs px-3 py-2">Add</button>
              <button type="button" onClick={()=>setShowUrl(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><X className="w-4 h-4"/></button>
            </div>
          )}

          <div onDrop={handleDrop} onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
            className={`border-2 border-dashed rounded-xl transition-all duration-200 ${dragOver?'border-blue-500 bg-blue-50':'border-gray-300 hover:border-blue-400'} ${images.length===0?'cursor-pointer':''}`}
            onClick={()=>images.length===0&&fileInputRef.current?.click()}>
            {images.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {cloudinaryOn() ? <Cloud className="w-8 h-8 text-blue-600"/> : <Upload className="w-8 h-8 text-blue-600"/>}
                </div>
                <p className="font-semibold text-gray-700 mb-1">Drop images here or click to browse</p>
                <p className="text-sm text-gray-400">JPG · PNG · WebP · TIFF · BMP · GIF · SVG · Max 8 images</p>
                {cloudinaryOn() && <p className="text-xs text-green-600 font-medium mt-2">⚡ Direct Cloudinary CDN upload</p>}
              </div>
            ) : (
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div key={img.public_id} draggable={!img.uploading&&!img.error}
                      onDragStart={()=>onDragStart(idx)} onDragOver={e=>onDragOver(e,idx)} onDragEnd={()=>setDragIdx(null)}
                      className={`relative group rounded-xl overflow-hidden border-2 transition-all ${
                        img.error?'border-red-400 bg-red-50':img.uploading?'border-blue-300 bg-blue-50':idx===mainIdx
                          ?'border-blue-500 ring-2 ring-blue-200 shadow-lg cursor-grab':'border-gray-200 hover:border-blue-300 hover:shadow-md cursor-grab'
                      } ${dragIdx===idx?'opacity-40 scale-95':''}`}>
                      <img src={img.url} alt="" className={`w-full h-28 object-cover ${img.uploading?'opacity-40':''}`}
                        onError={e=>{e.target.src='https://via.placeholder.com/200?text=?';}}/>

                      {img.uploading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 gap-2">
                          <Loader className="w-6 h-6 text-blue-600 animate-spin"/>
                          {img.progress > 0 && (
                            <div className="w-3/4">
                              <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full transition-all" style={{width:img.progress+'%'}}/>
                              </div>
                              <p className="text-center text-[10px] text-blue-600 font-bold mt-0.5">{img.progress}%</p>
                            </div>
                          )}
                        </div>
                      )}

                      {img.error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/90 gap-1 p-2">
                          <AlertCircle className="w-5 h-5 text-red-500"/>
                          <p className="text-[10px] text-red-600 font-medium text-center leading-tight">{img.error}</p>
                          {img.file && <button type="button" onClick={()=>retry(idx)} className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-bold hover:bg-red-600 mt-1">Retry</button>}
                        </div>
                      )}

                      {!img.uploading&&!img.error&&idx===mainIdx&&(
                        <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                          <Star className="w-2.5 h-2.5 fill-white"/>Cover
                        </div>
                      )}

                      {!img.uploading&&!img.error&&img.url?.includes('cloudinary')&&(
                        <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100">
                          <CheckCircle className="w-3 h-3 text-green-400 drop-shadow"/>
                        </div>
                      )}

                      {!img.uploading&&(
                        <button type="button" onClick={()=>remove(idx)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                          <X className="w-3.5 h-3.5"/>
                        </button>
                      )}

                      {!img.uploading&&!img.error&&(
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {idx!==mainIdx
                            ? <button type="button" onClick={()=>setMainIdx(idx)} className="w-full text-[11px] font-bold text-white bg-blue-600/80 hover:bg-blue-600 py-0.5 rounded-lg">Set as Cover</button>
                            : <p className="text-center text-[10px] text-blue-200 font-semibold">✓ Cover photo</p>}
                        </div>
                      )}
                    </div>
                  ))}
                  {images.length < 8 && (
                    <button type="button" onClick={()=>fileInputRef.current?.click()}
                      className="h-28 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                      <Plus className="w-6 h-6 mb-1"/><span className="text-xs font-semibold">Add more</span>
                    </button>
                  )}
                </div>
                <p className="text-center text-xs text-gray-400 mt-3">🖱️ <strong>Drag</strong> to reorder · Hover to <strong>Set Cover</strong> · ✕ remove</p>
              </div>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-4">Settings</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={e=>setForm({...form,isFeatured:e.target.checked})} className="w-4 h-4 text-blue-600 rounded"/>
              <span className="text-sm font-medium text-gray-700">Featured Product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})} className="w-4 h-4 text-blue-600 rounded"/>
              <span className="text-sm font-medium text-gray-700">Active (visible to customers)</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pb-8">
          <button type="submit" disabled={loading||anyUploading} className="btn-primary flex items-center gap-2 px-6 py-2.5">
            <Save className="w-4 h-4"/>
            {anyUploading?'Uploading images…':loading?'Saving…':isEdit?'Update Product':'Create Product'}
          </button>
          <Link to="/admin/products" className="btn-secondary py-2.5">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
