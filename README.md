# Analytics Dashboard - High Performance React Application

A production-ready, high-performance analytics dashboard built with React, TypeScript, and modern web technologies. Handles **100,000+ rows** of data with optimized performance through virtualization and memoization.

![Dashboard Preview](https://via.placeholder.com/1200x600/0a0e1a/00f0ff?text=Analytics+Dashboard)

## 🚀 Features

### Core Functionality

- **High-Performance Data Table**: Handles 100k+ rows using `@tanstack/react-virtual` and `@tanstack/react-table`
- **Interactive Charts**: Line, Bar, and Pie charts with Recharts
- **Real-time Filtering**: Search and filter across multiple columns instantly
- **Advanced Sorting**: Client-side sorting with memoized selectors
- **Responsive Design**: Mobile-first, cyberpunk aesthetic
- **State Management**: Redux Toolkit with optimized selectors (Reselect)

### Performance Optimizations

- ✅ **Virtual Scrolling**: Optimized row rendering (only renders visible items)
- ✅ **Memoized Selectors**: Prevents unnecessary re-calculations with Reselect
- ✅ **Efficient Layout**: Uses CSS Grid with synchronized virtualization
- ✅ **Debounced Search**: Optimized input handling for large datasets
- ✅ **Production Ready**: Configured for GitHub Pages with HashRouter support

### Technology Stack

#### Core

- **React 18.2** / **TypeScript 5.3**
- **Vite 5.1** - Lightning-fast build tool
- **React Router 6** - Configured with HashRouter for static hosting

#### Data & State

- **Redux Toolkit 2.2** - State management
- **TanStack Table 8.12** - Headless table logic
- **TanStack Virtual 3.1** - High-performance virtualization
- **Recharts 2.12** - Declarative chart components

#### UI & Styling

- **Styled Components 6.1** - Component-level styling
- **React Icons 5.0** - Premium icon set

## 📦 Project Structure

```
analytics-dashboard/
├── apps/
│   └── dashboard/
│       └── src/
│           ├── components/      # UI components (VirtualizedTable, Charts, etc.)
│           ├── pages/           # Page layouts (Dashboard.tsx)
│           ├── store/           # Redux slices & selectors
│           ├── utils/           # Data generation & helpers
│           ├── styles/          # Theme & GlobalStyles
│           ├── App.tsx          # App entry with HashRouter
│           └── main.tsx         # Root mount point
├── vite.config.ts              # Vite & Alias configuration
├── package.json                # Scripts & Dependencies
└── README.md
```

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/kirannaikI/analytics-dashboard.git
cd analytics-dashboard

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will open at `http://localhost:4200`

### Production & Deployment

```bash
# Create production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📊 Performance Metrics

- **Initial Load**: < 2s
- **100k Row Initial Render**: < 1s
- **Filter/Sort Latency**: < 100ms
- **Scroll Performance**: Stable 60fps

## 🎨 Design Philosophy

### Cyberpunk Aesthetic

- **Dark Theme**: Deep midnight blue (`#0a0e1a`)
- **Neon Accents**: Cyan (`#00f0ff`) and Magenta (`#ff00e5`)
- **Animations**: Shimmer effects and smooth transitions for a premium feel

## 🧪 Testing

```bash
# Run unit tests
npm run test
```

## 📝 License

MIT License

---

**Built with ❤️ for high-performance data visualization**
