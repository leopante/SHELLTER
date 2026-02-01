# 🦀 THE SHELLTER - Complete Setup Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Deployment to Vercel](#deployment-to-vercel)
4. [How to Modify Content](#how-to-modify-content)
5. [File Structure](#file-structure)
6. [Customization Guide](#customization-guide)

---

## 🎯 Project Overview

**The Shellter** is a premium meme coin website featuring:
- ✨ Stunning animations and effects
- 🦀 Animated crab mascot
- 🎮 Fully functional browser game (Crab Shooter)
- 📊 Tokenomics visualization
- 🗺️ Interactive roadmap
- 🤖 AI market analysis section (ready for integration)
- 📱 Fully responsive design
- 🚀 Optimized for Vercel deployment

---

## 💻 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Steps

1. **Navigate to project folder:**
```bash
cd the-shellter
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

---

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Deploy to production:**
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

**Your site will be live in ~2 minutes!** 🎉

---

## ✏️ How to Modify Content

### 🏷️ Change Contract Address

**File:** `src/app/page.tsx`
**Line:** ~8

```typescript
const [contractAddress] = useState('YOUR_CONTRACT_ADDRESS_HERE');
```

Replace `'TBA - Coming Soon!'` with your actual contract address.

---

### 🎨 Change Colors

**File:** `tailwind.config.js`
**Lines:** 14-20

```javascript
shell: {
  primary: '#FF6B35',    // Main orange color
  secondary: '#004E89',  // Blue color
  accent: '#F7B801',     // Gold/yellow color
  dark: '#1A1423',       // Dark background
  light: '#FFE5D9',      // Light text
}
```

---

### 📝 Change Main Title & Description

**File:** `src/app/page.tsx`
**Lines:** ~60-70

```typescript
<h2 className="...">
  <span className="text-shell-primary">THE</span>{' '}
  <span className="text-shell-accent">SHELLTER</span>
</h2>

<p className="...">
  Your Only Refuge in the Crypto Storm! 🌊
</p>
```

---

### 💰 Modify Tokenomics

**File:** `src/app/page.tsx`
**Lines:** ~165-175

```typescript
[
  { title: 'Total Supply', value: '1,000,000,000 SHELL', icon: '🏦' },
  { title: 'Presale', value: '40%', icon: '🚀' },
  // ... add or modify entries
]
```

---

### 🗺️ Update Roadmap

**File:** `src/app/page.tsx`
**Lines:** ~200-230

```typescript
{
  phase: 'Phase 1: The Awakening',
  items: ['Website Launch', 'Social Media Blitz', ...],
  status: 'LIVE NOW! 🔴',
}
```

---

### 🔗 Update Social Media Links

**File:** `src/app/page.tsx`
**Lines:** ~330-340

```typescript
{ name: 'Twitter', icon: '🐦', link: 'https://twitter.com/yourhandle' },
{ name: 'Telegram', icon: '✈️', link: 'https://t.me/yourchannel' },
```

---

### 💬 Change Mascot Messages

**File:** `src/components/CrabMascot.tsx`
**Lines:** 8-14

```typescript
const messages = [
  "Welcome to The Shellter! 🦀",
  "Early crabs get the gains! 💰",
  // ... add your custom messages
];
```

---

### 🎯 Modify Urgency Ticker

**File:** `src/app/page.tsx`
**Lines:** ~20-25

```typescript
🔥 PRESALE LIVE NOW! 🔥 EARLY BIRDS GET 10X GAINS! 🚀
```

Change this text to create your own urgency message.

---

## 📁 File Structure

```
the-shellter/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles & animations
│   │   ├── layout.tsx           # Main layout wrapper
│   │   └── page.tsx             # Main homepage (MOST IMPORTANT!)
│   └── components/
│       ├── CrabGame.tsx         # Browser game
│       └── CrabMascot.tsx       # Animated mascot
├── public/                      # Static files (add images here)
├── package.json                 # Dependencies
├── tailwind.config.js           # Theme & colors
├── tsconfig.json               # TypeScript config
└── next.config.js              # Next.js config
```

---

## 🎨 Customization Guide

### Add New Section

1. Open `src/app/page.tsx`
2. Add between existing sections:

```typescript
<section className="min-h-screen flex items-center justify-center py-20 px-4">
  <div className="container mx-auto">
    <h2 className="text-5xl font-display font-black text-center mb-12">
      YOUR SECTION TITLE
    </h2>
    {/* Your content here */}
  </div>
</section>
```

---

### Change Fonts

**File:** `src/app/globals.css`
**Line:** 1

Replace font import URL:
```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');
```

Then update `tailwind.config.js`:
```javascript
fontFamily: {
  display: ['YOUR_FONT', 'sans-serif'],
}
```

---

### Add Images/Logos

1. Place images in `public/` folder
2. Reference in code:

```typescript
<img src="/your-image.png" alt="description" />
```

---

### Modify Animations

**File:** `tailwind.config.js`
**Lines:** 25-45

Add custom animations or modify existing ones:

```javascript
animation: {
  'your-animation': 'your-animation 2s ease infinite',
},
keyframes: {
  'your-animation': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
}
```

---

## 🔧 Advanced Modifications

### Integrate Real AI Market Analysis

**File:** `src/app/page.tsx`
**Section:** AI Market Analysis (~290-340)

Replace the placeholder with real API calls:

```typescript
const [marketData, setMarketData] = useState(null);

useEffect(() => {
  fetch('YOUR_AI_API_ENDPOINT')
    .then(res => res.json())
    .then(data => setMarketData(data));
}, []);
```

---

### Add More Games

1. Create new component in `src/components/YourGame.tsx`
2. Import in `page.tsx`
3. Add button to toggle display

---

### SEO Optimization

**File:** `src/app/layout.tsx`
**Lines:** 7-15

Modify metadata:
```typescript
export const metadata: Metadata = {
  title: 'Your Custom Title',
  description: 'Your custom description',
  keywords: 'your, custom, keywords',
}
```

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Deployment Issues

- Ensure `next.config.js` is present
- Check Node.js version (18+)
- Verify all dependencies in `package.json`

---

## 📞 Support

For issues or questions:
- Check [Next.js Docs](https://nextjs.org/docs)
- Check [Vercel Docs](https://vercel.com/docs)
- Check [Tailwind Docs](https://tailwindcss.com/docs)

---

## 🎉 You're Ready!

Your Shellter site is now:
- ✅ Fully functional
- ✅ Ready to deploy
- ✅ Easy to customize
- ✅ Optimized for performance

**Remember:** The earlier you launch, the more you gain! 🚀🦀

Good luck with your meme coin launch! 💰✨
