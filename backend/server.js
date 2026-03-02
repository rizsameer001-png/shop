const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars first
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ── Body parser ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// ── CORS — manual middleware (handles multiple origins reliably) ──────────────
// On Render set:  FRONTEND_URL=https://gleeful-semolina-bba9a0.netlify.app
// Locally it defaults to http://localhost:3000
// Multiple origins? Use ONE value — your production Netlify URL.
// Local dev works via Vite proxy so localhost never hits the backend directly.
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);       // exactly ONE origin
    res.setHeader('Vary', 'Origin');                             // tell CDNs to cache per-origin
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Respond immediately to preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// ── Cookie parser ─────────────────────────────────────────────────────────────
app.use(cookieParser());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/products',  require('./routes/productRoutes'));
app.use('/api/orders',    require('./routes/orderRoutes'));
app.use('/api/users',     require('./routes/userRoutes'));
app.use('/api/categories',require('./routes/categoryRoutes'));
app.use('/api/payment',   require('./routes/paymentRoutes'));
app.use('/api/reviews',   require('./routes/reviewRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', allowedOrigins });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large' || err.status === 413) {
    return res.status(413).json({
      success: false,
      message: 'Request too large. Please use Cloudinary for image uploads.',
    });
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Allowed CORS origins:`, allowedOrigins);
});
