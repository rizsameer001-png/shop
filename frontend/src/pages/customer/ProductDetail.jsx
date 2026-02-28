import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus, Package, ZoomIn, X, Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { fetchProduct } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

// ── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" onClick={e => e.stopPropagation()}>
        <span className="text-white/60 text-sm">{idx + 1} / {images.length}</span>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center relative px-16" onClick={e => e.stopPropagation()}>
        <button onClick={prev} className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img
          key={idx}
          src={images[idx]?.url}
          alt={`Product image ${idx + 1}`}
          className="max-h-[70vh] max-w-full object-contain rounded-xl select-none"
          style={{ animation: 'fadeIn 0.2s ease' }}
        />
        <button onClick={next} className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex justify-center gap-2 px-6 py-4 overflow-x-auto" onClick={e => e.stopPropagation()}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${i === idx ? 'border-blue-400 scale-110' : 'border-white/20 opacity-60 hover:opacity-100'}`}>
            <img src={img.url} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector(s => s.products);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    dispatch(fetchProduct(id));
    setActiveImg(0);
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success(`${product.name} added to cart!`);
  };

  const prevImg = () => setActiveImg(i => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () => setActiveImg(i => (i + 1) % product.images.length);

  // ── Loading skeleton ──
  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="h-96 bg-gray-200 rounded-2xl mb-3" />
          <div className="flex gap-2">{Array(4).fill(0).map((_, i) => <div key={i} className="w-16 h-16 bg-gray-200 rounded-xl" />)}</div>
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );

  if (!product) return null;

  const images = product.images?.length ? product.images : [{ url: 'https://via.placeholder.com/600', public_id: 'placeholder' }];
  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;
  const avgRating = Number(product.ratings).toFixed(1);

  return (
    <>
      {/* Lightbox */}
      {lightbox && <Lightbox images={images} startIdx={activeImg} onClose={() => setLightbox(false)} />}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* ── IMAGE GALLERY ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative group rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
              <img
                src={images[activeImg]?.url}
                alt={product.name}
                className="w-full h-[420px] object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                onClick={() => setLightbox(true)}
                onError={e => { e.target.src = 'https://via.placeholder.com/600'; }}
              />

              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  -{discount}% OFF
                </div>
              )}

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5" /> Click to zoom
              </div>

              {/* Prev/Next arrows (only if multiple images) */}
              {images.length > 1 && (
                <>
                  <button onClick={prevImg}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full shadow flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button onClick={nextImg}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full shadow flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image counter dots */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`rounded-full transition-all ${i === activeImg ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`} />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeImg ? 'border-blue-500 shadow-md shadow-blue-100 scale-105' : 'border-gray-200 hover:border-blue-300 opacity-70 hover:opacity-100'
                    }`}>
                    <img src={img.url} alt={`View ${i + 1}`} className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://via.placeholder.com/80'; }} />
                  </button>
                ))}
              </div>
            )}

            {/* Image count badge */}
            {images.length > 1 && (
              <p className="text-xs text-gray-400 text-center">
                📷 {images.length} photos · Click main image to view fullscreen
              </p>
            )}
          </div>

          {/* ── PRODUCT INFO ── */}
          <div className="flex flex-col">
            {/* Category & wishlist */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {product.category?.name}
              </span>
              <button onClick={() => setWishlisted(w => !w)}
                className={`p-2 rounded-full transition-all ${wishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-400 hover:bg-red-50'}`}>
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.ratings) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{avgRating}</span>
              <span className="text-sm text-gray-400">({product.numReviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-5 pb-5 border-b border-gray-100">
              <span className="text-4xl font-black text-gray-900">${product.price}</span>
              {product.comparePrice && (
                <span className="text-xl text-gray-400 line-through mb-1">${product.comparePrice}</span>
              )}
              {discount > 0 && (
                <span className="mb-1 bg-red-100 text-red-700 text-sm font-bold px-2.5 py-0.5 rounded-lg">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{product.description}</p>

            {/* Stock & Brand */}
            <div className="flex items-center gap-4 mb-5 text-sm">
              <div className={`flex items-center gap-1.5 font-medium ${
                product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                <Package className="w-4 h-4" />
                {product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? `⚠ Only ${product.stock} left` : '✗ Out of Stock'}
              </div>
              {product.brand && (
                <span className="text-gray-500">Brand: <span className="font-semibold text-gray-700">{product.brand}</span></span>
              )}
            </div>

            {/* Quantity + Cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button onClick={handleAddToCart} disabled={product.stock === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-200">
                <ShoppingCart className="w-5 h-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Over $50' },
                { icon: ShieldCheck, label: 'Secure Pay', sub: 'SSL Encrypted' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '30 days' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center bg-gray-50 rounded-xl p-2.5">
                  <Icon className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-700">{label}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── REVIEWS ── */}
        {product.reviews?.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-yellow-700 text-sm">{avgRating}</span>
                <span className="text-yellow-600 text-xs">({product.numReviews})</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((review, i) => (
                <div key={i} className="card p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img src={`https://ui-avatars.com/api/?name=${review.name}&background=6366f1&color=fff&size=36`}
                        alt={review.name} className="w-9 h-9 rounded-full" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{review.name}</p>
                        <p className="text-xs text-gray-400">{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Verified buyer'}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
