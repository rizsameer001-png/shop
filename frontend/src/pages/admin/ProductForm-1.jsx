import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Save, Upload, X, Plus, ImageIcon, Star, GripVertical, Link2 } from 'lucide-react';
import { fetchCategories } from '../../store/slices/productSlice';
import { createProduct, updateProduct } from '../../store/slices/adminSlice';
import api from '../../services/api';
import toast from 'react-hot-toast';

// Supported formats
const ACCEPTED_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png',
  'image/webp', 'image/tiff', 'image/tif',
  'image/bmp', 'image/gif', 'image/svg+xml',
];
const ACCEPTED_EXTS = /\.(jpe?g|png|webp|tiff?|bmp|gif|svg)$/i;

const isValidImage = (file) =>
  ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTS.test(file.name);

// Compress + convert to JPEG via Canvas (handles jpg, png, webp, tiff, bmp, gif)
// TIFF/BMP: browser Canvas reads them via FileReader → drawImage → re-encode as JPEG
const fileToDataURL = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onerror = () => rej(new Error(`Cannot read: ${file.name}`));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => rej(new Error(`Cannot decode: ${file.name}`));
      img.onload = () => {
        const MAX = 1200;
        let { width, height } = img;
        if (width > MAX) { height = Math.round(height * MAX / width); width = MAX; }
        if (height > MAX) { width = Math.round(width * MAX / height); height = MAX; }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        // White background for transparent PNGs / WebP
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        // SVGs keep as PNG, everything else → JPEG
        const outFormat = file.type === "image/svg+xml" ? "image/png" : "image/jpeg";
        res(canvas.toDataURL(outFormat, 0.82));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector(s => s.products);
  const { loading } = useSelector(s => s.admin);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '', description: '', price: '', comparePrice: '',
    category: '', brand: '', stock: '', sku: '',
    isFeatured: false, isActive: true,
  });

  // images: [{ public_id, url, file?, isNew?, name? }]
  const [images, setImages] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);
  const [mainIdx, setMainIdx] = useState(0);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`).then(({ data }) => {
        const p = data.product;
        setForm({
          name: p.name, description: p.description, price: p.price,
          comparePrice: p.comparePrice || '', category: p.category?._id || '',
          brand: p.brand || '', stock: p.stock, sku: p.sku || '',
          isFeatured: p.isFeatured, isActive: p.isActive,
        });
        setImages(p.images?.length ? p.images.map(img => ({ ...img, isNew: false })) : []);
      }).catch(() => toast.error('Failed to load product'));
    }
  }, [id, isEdit]);

  const handleFiles = async (files) => {
    const valid = Array.from(files).filter(isValidImage);
    const rejected = Array.from(files).filter(f => !isValidImage(f));
    if (rejected.length) toast.error(`Skipped: ${rejected.map(f => f.name).join(', ')} — unsupported format`);
    if (!valid.length) { toast.error('No valid images found. Supported: JPG, PNG, WebP, TIFF, BMP, GIF, SVG'); return; }
    if (images.length + valid.length > 8) { toast.error('Maximum 8 images allowed'); return; }
    const newImgs = await Promise.all(
      valid.map(async (file) => ({
        public_id: 'local_' + Date.now() + '_' + Math.random().toString(36).slice(2),
        url: await fileToDataURL(file),
        file, isNew: true, name: file.name,
      }))
    );
    setImages(prev => [...prev, ...newImgs]);
    toast.success(`${newImgs.length} image${newImgs.length > 1 ? 's' : ''} added`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    try { new URL(urlInput); } catch { toast.error('Enter a valid URL'); return; }
    if (images.length >= 8) { toast.error('Max 8 images allowed'); return; }
    setImages(prev => [...prev, { public_id: 'url_' + Date.now(), url: urlInput.trim(), isNew: true }]);
    setUrlInput(''); setShowUrlInput(false);
    toast.success('Image URL added');
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    if (mainIdx >= idx && mainIdx > 0) setMainIdx(m => m - 1);
  };

  // Drag-to-reorder
  const onDragStart = (idx) => setDragIdx(idx);
  const onDragOver = (e, idx) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const arr = [...images];
    const [moved] = arr.splice(dragIdx, 1);
    arr.splice(idx, 0, moved);
    const newMain = dragIdx === mainIdx ? idx : idx === mainIdx ? dragIdx : mainIdx;
    setImages(arr); setDragIdx(idx); setMainIdx(newMain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) { toast.error('Add at least one product image'); return; }
    const ordered = [...images];
    if (mainIdx > 0) { const [m] = ordered.splice(mainIdx, 1); ordered.unshift(m); }
    const productData = {
      ...form, price: Number(form.price), stock: Number(form.stock),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
      images: ordered.map(({ public_id, url }) => ({ public_id, url })),
    };
    const result = isEdit
      ? await dispatch(updateProduct({ id, ...productData }))
      : await dispatch(createProduct(productData));
    if (!result.error) {
      toast.success(isEdit ? 'Product updated!' : 'Product created!');
      navigate('/admin/products');
    } else {
      toast.error(result.payload || 'Something went wrong');
    }
  };

  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <Link to="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Product' : 'New Product'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Basic Info */}
        <div className="card p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Basic Info</h2>
          <div>
            <label className="text-sm font-medium text-gray-700">Product Name *</label>
            <input {...f('name')} className="input mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Description *</label>
            <textarea {...f('description')} className="input mt-1 h-28 resize-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Brand</label>
              <input {...f('brand')} className="input mt-1" placeholder="Apple, Nike..." />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">SKU</label>
              <input {...f('sku')} className="input mt-1" placeholder="Auto-generated if empty" />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="card p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Pricing & Inventory</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Price ($) *</label>
              <input {...f('price')} type="number" min="0" step="0.01" className="input mt-1" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Compare Price ($)</label>
              <input {...f('comparePrice')} type="number" min="0" step="0.01" className="input mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Stock *</label>
              <input {...f('stock')} type="number" min="0" className="input mt-1" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Category *</label>
            <select {...f('category')} className="input mt-1" required>
              <option value="">Select category</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* ── IMAGE UPLOAD ── */}
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              Product Images
              <span className="text-xs font-normal text-gray-400">({images.length}/8)</span>
            </h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowUrlInput(v => !v)}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                <Link2 className="w-3.5 h-3.5" /> URL
              </button>
              <button type="button" onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors">
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
            </div>
          </div>

          <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.tiff,.tif,.bmp,.gif,.svg,image/jpeg,image/png,image/webp,image/tiff,image/bmp,image/gif,image/svg+xml" multiple className="hidden"
            onChange={e => { handleFiles(e.target.files); e.target.value = ''; }} />

          {/* URL Input */}
          {showUrlInput && (
            <div className="flex gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <input type="url" value={urlInput} onChange={e => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="input flex-1 text-sm bg-white"
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())} />
              <button type="button" onClick={handleAddUrl} className="btn-primary text-xs px-3 py-2">Add</button>
              <button type="button" onClick={() => setShowUrlInput(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`border-2 border-dashed rounded-xl transition-all duration-200 ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            } ${images.length === 0 ? 'cursor-pointer' : ''}`}
            onClick={() => images.length === 0 && fileInputRef.current?.click()}
          >
            {images.length === 0 ? (
              /* Empty state */
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-700 mb-1">Drop images here or click to browse</p>
                <p className="text-sm text-gray-400">JPG · PNG · WebP · TIFF · BMP · GIF · SVG  ·  Max 8 images</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">📁 From your computer</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">🔗 Or paste a URL above</span>
                </div>
              </div>
            ) : (
              /* Image grid */
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div key={img.public_id} draggable
                      onDragStart={() => onDragStart(idx)}
                      onDragOver={e => onDragOver(e, idx)}
                      onDragEnd={() => setDragIdx(null)}
                      className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-150 cursor-grab active:cursor-grabbing ${
                        idx === mainIdx
                          ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      } ${dragIdx === idx ? 'opacity-40 scale-95' : 'opacity-100'}`}
                    >
                      <img src={img.url} alt={`img-${idx}`}
                        className="w-full h-28 object-cover"
                        onError={e => { e.target.src = 'https://via.placeholder.com/200?text=Invalid'; }} />

                      {/* Main badge */}
                      {idx === mainIdx && (
                        <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                          <Star className="w-2.5 h-2.5 fill-white" /> Cover
                        </div>
                      )}

                      {/* Drag hint */}
                      <div className="absolute top-1.5 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="w-3.5 h-3.5 text-white drop-shadow-md" />
                      </div>

                      {/* Remove */}
                      <button type="button" onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Set main overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {idx !== mainIdx ? (
                          <button type="button" onClick={() => setMainIdx(idx)}
                            className="w-full text-[11px] font-bold text-white bg-blue-600/80 hover:bg-blue-600 py-0.5 rounded-lg transition-colors">
                            Set as Cover
                          </button>
                        ) : (
                          <p className="text-center text-[10px] text-blue-200 font-semibold">✓ Cover photo</p>
                        )}
                      </div>

                      {/* File name */}
                      {img.name && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[9px] px-1.5 py-0.5 truncate leading-tight opacity-0 group-hover:opacity-100 transition-opacity" style={{bottom: '26px'}}>
                          {img.name}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add more tile */}
                  {images.length < 8 && (
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      className="h-28 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                      <Plus className="w-6 h-6 mb-1" />
                      <span className="text-xs font-semibold">Add more</span>
                    </button>
                  )}
                </div>
                <p className="text-center text-xs text-gray-400 mt-3">
                  🖱️ <strong>Drag</strong> to reorder · Hover to <strong>Set Cover</strong> · ✕ to remove
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-4">Settings</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm font-medium text-gray-700">Featured Product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm font-medium text-gray-700">Active (visible to customers)</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pb-8">
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 px-6 py-2.5">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <Link to="/admin/products" className="btn-secondary py-2.5">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
