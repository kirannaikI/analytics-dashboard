# Analytics Dashboard - High Performance React Application

A production-ready, high-performance analytics dashboard built with React, TypeScript, and modern web technologies. Handles **100,000+ rows** of data with optimized performance through virtualization and memoization.

![Dashboard Preview](https://via.placeholder.com/1200x600/0a0e1a/00f0ff?text=Analytics+Dashboard)

## 🚀 Features

### Core Functionality

- **High-Performance Data Table**: Handles 100k+ rows using React Virtual and TanStack Table
- **Interactive Charts**: Line, Bar, and Pie charts with Recharts
- **Real-time Filtering**: Search and filter across multiple columns
- **Advanced Sorting**: Client-side sorting with memoized selectors
- **Responsive Design**: Mobile-first, works on all screen sizes
- **State Management**: Redux Toolkit with optimized selectors (Reselect)

### Performance Optimizations

- ✅ Virtual scrolling for large datasets (React Virtual)
- ✅ Memoized selectors with Reselect
- ✅ Code splitting with dynamic imports
- ✅ Debounced search input
- ✅ Optimized re-renders with React.memo
- ✅ Lazy loading of chart data
- ✅ Web Workers ready for heavy computations

### Technology Stack

#### Core

- **React 18.2** - UI library with concurrent features
- **TypeScript 5.3** - Type safety
- **Vite 5.1** - Lightning-fast build tool
- **React Router 6** - Client-side routing (with HashRouter for GH Pages)

#### State Management

- **Redux Toolkit 2.2** - State management
- **Reselect 5.1** - Memoized selectors
- **React Redux 9.1** - React bindings

#### UI & Styling

- **Styled Components 6.1** - CSS-in-JS
- **Emotion 11.11** - Alternative styling solution
- **React Icons 5.0** - Icon library

#### Data Visualization

- **Recharts 2.12** - Chart library
- **D3.js 7.9** - Low-level visualization primitives

#### Data Management

- **TanStack Table 8.12** - Headless table library
- **TanStack Virtual 3.1** - Virtual scrolling
- **TanStack Query 5.24** - Data fetching & caching
- **Axios 1.6** - HTTP client

#### Forms & Validation

- **React Hook Form 7.50** - Form management
- **Lodash 4.17** - Utility functions

#### Development Tools

- **Storybook 7.6** - Component development
- **Vitest 1.3** - Unit testing
- **Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Project Structure

```
analytics-dashboard/
├── apps/
│   └── dashboard/
│       └── src/
│           ├── components/      # Reusable UI components
│           │   ├── LineChart.tsx
│           │   ├── BarChart.tsx
│           │   ├── PieChart.tsx
│           │   ├── VirtualizedTable.tsx
│           │   ├── FilterControls.tsx
│           │   ├── StatCard.tsx
│           │   └── *.stories.tsx    # Storybook stories
│           ├── pages/           # Page components
│           │   └── Dashboard.tsx
│           ├── store/           # Redux store & slices
│           │   ├── index.ts
│           │   ├── dashboardSlice.ts
│           │   └── tableSlice.ts
│           ├── utils/           # Utility functions
│           │   └── dataGenerator.ts
│           ├── hooks/           # Custom React hooks
│           ├── styles/          # Global styles
│           │   └── GlobalStyles.ts
│           ├── App.tsx
│           └── main.tsx
├── libs/                        # Shared libraries (Nx structure)
│   └── shared/
│       ├── ui/                  # Shared UI components
│       ├── data-access/         # API & data layer
│       └── utils/               # Shared utilities
├── .storybook/                  # Storybook configuration
├── vite.config.ts              # Vite configuration
├── vitest.config.ts             # Vitest configuration
├── tsconfig.json                # TypeScript configuration
└── package.json

```

## 🎨 Design Philosophy

### Visual Design

- **Dark Theme**: Deep midnight blue with neon accents
- **Cyberpunk Aesthetic**: Glowing effects and animated gradients
- **Typography**: Outfit for UI, Space Mono for data
- **Color Palette**:
  - Primary: `#00f0ff` (Cyan)
  - Secondary: `#ff00e5` (Magenta)
  - Tertiary: `#ffea00` (Yellow)
  - Success: `#00ff88` (Green)

### UX Principles

- Minimal loading states with shimmer effects
- Smooth animations and transitions
- Clear visual hierarchy
- Accessible color contrast
- Keyboard navigation support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/kirannaikI/analytics-dashboard.git
cd analytics-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:4200`

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build           # Production build
npm run preview         # Preview production build

# Deployment
npm run deploy          # Build and deploy to GitHub Pages

# Testing
npm run test            # Run unit tests
npm run test:ui         # Run tests with UI

# Storybook
npm run storybook       # Start Storybook dev server
npm run build-storybook # Build Storybook for deployment

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
```

## 📊 Performance Metrics

### Lighthouse Scores (Target)

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Load Times

- **Initial Load**: < 2s
- **100k Row Render**: < 1s
- **Filter/Sort**: < 100ms

### Bundle Size Optimization

- Code splitting by route and feature
- Tree shaking of unused code
- Lazy loading of charts
- Gzip compression

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

Tests are written using Vitest and Testing Library:

- Component rendering tests
- User interaction tests
- State management tests
- Hook tests

### Component Testing

```bash
npm run storybook
```

All components have Storybook stories with:

- Multiple variants
- Interactive controls
- Accessibility tests
- Documentation

### Test Coverage

```bash
npm run test -- --coverage
```

Target coverage:

- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

## 🎯 Key Components

### VirtualizedTable

Efficiently renders 100k+ rows using virtualization.

```tsx
<VirtualizedTable data={data} onSortChange={handleSort} sortBy="revenue" sortDirection="desc" />
```

**Features**:

- Virtual scrolling (only renders visible rows)
- Sortable columns
- Custom cell renderers
- Sticky header
- Responsive design

### LineChart

Multi-metric time series visualization.

```tsx
<LineChart data={chartData} selectedMetrics={['revenue', 'users', 'conversion']} height={400} />
```

**Features**:

- Multiple data series
- Interactive tooltips
- Responsive scaling
- Animated transitions
- Data sampling for large datasets

### FilterControls

Advanced filtering interface.

```tsx
<FilterControls
  searchQuery={query}
  onSearchChange={setQuery}
  filters={filters}
  onFilterChange={updateFilter}
  onClearFilters={clearAll}
  totalRows={100000}
  filteredRows={5432}
/>
```

**Features**:

- Full-text search
- Multiple filter types
- Clear all functionality
- Live result count

## 🎨 Storybook

Component documentation and development environment.

### View Components

```bash
npm run storybook
```

### Writing Stories

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example',
    value: 100,
  },
};
```

## 🔧 Configuration

### Vite Configuration

- Path aliases for clean imports
- Code splitting strategy
- Plugin configuration
- Build optimizations

### TypeScript

- Strict mode enabled
- Path mapping
- Type checking on build

### ESLint & Prettier

- Consistent code style
- Automatic formatting
- Pre-commit hooks ready

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

Output in `dist/` directory.

### Deployment Platforms

#### GitHub Pages (Automated)

```bash
npm run deploy
```

#### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

#### Vercel

```bash
# Auto-detected framework: Vite
# Build command: npm run build
# Output directory: dist
```

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Analytics Dashboard
```

## 🎓 Learning Resources

### Nx

- [Nx Documentation](https://nx.dev)
- [Nx React Plugin](https://nx.dev/react/overview)

### Storybook

- [Storybook Docs](https://storybook.js.org/docs/react/get-started/introduction)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)

### React Performance

- [React.memo](https://react.dev/reference/react/memo)
- [useMemo & useCallback](https://react.dev/reference/react/useMemo)
- [Code Splitting](https://react.dev/reference/react/lazy)

### Testing

- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## 🐛 Debugging

### React DevTools

- Component hierarchy inspection
- Props and state debugging
- Performance profiling

### Redux DevTools

- Time-travel debugging
- Action inspection
- State diff visualization

### Browser DevTools

- Network tab for API calls
- Performance tab for bottlenecks
- Memory profiler for leaks

## 🤝 Contributing

### Code Style

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Add tests
4. Update documentation
5. Submit PR

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- React team for amazing tools
- TanStack for powerful libraries
- Recharts for beautiful charts
- Styled Components for great styling API

---

**Built with ❤️ using modern React ecosystem**
