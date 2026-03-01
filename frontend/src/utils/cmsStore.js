// Simple localStorage-based content store — no backend needed for CMS data
// Admin saves here → frontend reads here

const STORAGE_KEY = 'shopnow_cms';

const defaults = {
  banners: [
    {
      id: 'b1', active: true, order: 0,
      tag: '🎉 New Season Sale — Up to 60% Off',
      title: 'Discover Your', highlight: 'Perfect Style',
      subtitle: 'Explore thousands of products from top brands with unbeatable deals every day.',
      btn1Label: 'Shop Now', btn1Link: '/products',
      btn2Label: 'View Deals', btn2Link: '/products?sort=-totalSold',
      bg: 'from-orange-600 via-orange-500 to-amber-500',
      emoji: '🛍️',
    },
    {
      id: 'b2', active: true, order: 1,
      tag: '⚡ Flash Sale — Today Only',
      title: 'Best Tech', highlight: 'Deals Ever',
      subtitle: "The latest electronics at prices you've never seen before. Limited stock.",
      btn1Label: 'Shop Electronics', btn1Link: '/products',
      btn2Label: 'Best Sellers', btn2Link: '/products?sort=-totalSold',
      bg: 'from-indigo-700 via-purple-600 to-pink-600',
      emoji: '💻',
    },
    {
      id: 'b3', active: true, order: 2,
      tag: '🌟 Premium Collection',
      title: 'Elevate Your', highlight: 'Lifestyle',
      subtitle: 'Handpicked premium products for those who appreciate quality and style.',
      btn1Label: 'Browse Collection', btn1Link: '/products',
      btn2Label: 'New Arrivals', btn2Link: '/products?sort=-createdAt',
      bg: 'from-emerald-700 via-teal-600 to-cyan-600',
      emoji: '✨',
    },
  ],
  promos: [
    { id: 'p1', active: true, label: 'LIMITED OFFER', title: 'Summer Big Sale', highlight: 'Up to 60% OFF', subtitle: "Don't miss the biggest deals of the year.", btnLabel: 'Shop the Sale', btnLink: '/products?sort=-totalSold', bg: 'from-orange-500 to-red-600', emoji: '🔥', size: 'large' },
    { id: 'p2', active: true, label: 'FLASH DEALS', title: 'Daily Drops', subtitle: 'New deals every 24 hours', btnLabel: 'Shop Now', btnLink: '/products?sort=-createdAt', bg: 'from-indigo-500 to-purple-600', emoji: '⚡', size: 'small' },
    { id: 'p3', active: true, label: 'FREE GIFTS', title: 'Over $100', subtitle: 'Get a surprise gift on every order', btnLabel: 'Learn More', btnLink: '/products', bg: 'from-emerald-500 to-teal-600', emoji: '🎁', size: 'small' },
  ],
  about: {
    heroTitle: "We're on a Mission to Make Shopping Joyful",
    heroSubtitle: "ShopNow was built on the belief that everyone deserves access to quality products at fair prices.",
    story: "ShopNow was founded in 2019 with a simple idea: what if shopping online felt as good as your favourite local store?\n\nWe started with just 50 products and a small team of 4 people. Today, we offer over 10,000 products, serve 50+ countries, and have 120+ passionate team members.\n\nWhat hasn't changed is our belief — you deserve honest product information, fast reliable shipping, and support that actually helps.",
    stats: [
      { value: '50K+', label: 'Happy Customers' },
      { value: '10K+', label: 'Products' },
      { value: '50+', label: 'Countries' },
      { value: '4.9★', label: 'Avg Rating' },
    ],
    team: [
      { name: 'Alex Morgan', role: 'CEO & Founder', avatar: 'AM', bio: '10+ years in e-commerce. Passionate about great products for everyone.', color: 'from-orange-400 to-red-500' },
      { name: 'Priya Sharma', role: 'Head of Design', avatar: 'PS', bio: 'Creates beautiful, intuitive experiences customers love.', color: 'from-pink-400 to-rose-500' },
      { name: 'James Wu', role: 'CTO', avatar: 'JW', bio: 'Builds fast, reliable, and secure systems for millions.', color: 'from-blue-400 to-indigo-500' },
      { name: 'Sofia Garcia', role: 'Customer Success', avatar: 'SG', bio: 'Ensures every customer has an outstanding experience.', color: 'from-emerald-400 to-teal-500' },
    ],
    milestones: [
      { year: '2019', event: 'Founded', desc: 'Started with a big vision in a small office.' },
      { year: '2020', event: '10K Customers', desc: 'First major milestone hit during global shift online.' },
      { year: '2022', event: 'Global Expansion', desc: 'Launched international shipping to 50+ countries.' },
      { year: '2024', event: '500K+ Orders', desc: 'Half a million orders at 99% satisfaction.' },
    ],
  },
  contact: {
    phone: '+1 800-SHOPNOW',
    email: 'support@shopnow.com',
    address: '123 Commerce Ave, Suite 400, New York, NY 10001',
    hours: 'Monday – Friday, 9AM – 6PM EST',
    mapEmbed: '',
    chatEnabled: true,
  },
  siteSettings: {
    siteName: 'ShopNow',
    tagline: 'Your trusted destination for quality products',
    logo: '',
    primaryColor: '#f97316',
    announcement: '🎉 Free shipping on all orders over $50! Use code FREESHIP at checkout.',
    announcementActive: true,
    socialFacebook: '#',
    socialTwitter: '#',
    socialInstagram: '#',
    socialYoutube: '#',
  },
};

export const getCMS = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaults;
    const parsed = JSON.parse(stored);
    // Deep merge with defaults to handle new keys
    return {
      banners: parsed.banners ?? defaults.banners,
      promos: parsed.promos ?? defaults.promos,
      about: { ...defaults.about, ...parsed.about },
      contact: { ...defaults.contact, ...parsed.contact },
      siteSettings: { ...defaults.siteSettings, ...parsed.siteSettings },
    };
  } catch { return defaults; }
};

export const setCMS = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
};

export const updateCMSSection = (section, value) => {
  const current = getCMS();
  const updated = { ...current, [section]: value };
  setCMS(updated);
  return updated;
};

export const resetCMS = () => { localStorage.removeItem(STORAGE_KEY); };
export const getCMSDefaults = () => defaults;
