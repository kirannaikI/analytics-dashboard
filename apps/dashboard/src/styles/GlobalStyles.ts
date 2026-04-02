import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  :root {
    /* Base Colors - Deep Midnight Theme */
    --color-bg-primary: #0a0e1a;
    --color-bg-secondary: #141b2d;
    --color-bg-tertiary: #1a2332;
    --color-bg-elevated: #1f2937;
    
    /* Accent Colors - Vibrant Neon */
    --color-primary: #00f0ff;
    --color-primary-dark: #00b8cc;
    --color-primary-light: #4dfdff;
    --color-secondary: #ff00e5;
    --color-secondary-dark: #cc00b8;
    --color-tertiary: #ffea00;
    
    /* Text Colors */
    --color-text-primary: #f0f4f8;
    --color-text-secondary: #b8c5d6;
    --color-text-muted: #6b7d94;
    --color-text-accent: var(--color-primary);
    
    /* Semantic Colors */
    --color-success: #00ff88;
    --color-warning: #ffb800;
    --color-error: #ff4466;
    --color-info: var(--color-primary);
    
    /* Borders & Dividers */
    --color-border: rgba(255, 255, 255, 0.08);
    --color-border-focus: var(--color-primary);
    
    /* Shadows & Glows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
    --glow-primary: 0 0 20px rgba(0, 240, 255, 0.3);
    --glow-secondary: 0 0 20px rgba(255, 0, 229, 0.3);
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    
    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;
    
    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Typography */
    --font-primary: 'Outfit', -apple-system, sans-serif;
    --font-mono: 'Space Mono', 'Courier New', monospace;
    
    /* Z-index layers */
    --z-dropdown: 1000;
    --z-modal: 1100;
    --z-popover: 1200;
    --z-tooltip: 1300;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-primary);
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
    
    /* Animated background gradient */
    &::before {
      content: '';
      position: fixed;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle at 20% 50%,
        rgba(0, 240, 255, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(255, 0, 229, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 20%,
        rgba(255, 234, 0, 0.02) 0%,
        transparent 50%
      );
      animation: gradientShift 20s ease infinite;
      pointer-events: none;
      z-index: 0;
    }
  }

  @keyframes gradientShift {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(5%, 5%) rotate(120deg);
    }
    66% {
      transform: translate(-5%, 5%) rotate(240deg);
    }
  }

  #root {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 1.875rem);
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea, select {
    font-family: var(--font-primary);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: var(--radius-full);
    
    &:hover {
      background: var(--color-primary-light);
    }
  }

  /* Selection */
  ::selection {
    background: var(--color-primary);
    color: var(--color-bg-primary);
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .fade-in {
    animation: fadeIn var(--transition-base) ease-out;
  }

  /* Utility classes */
  .text-gradient {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glow-text {
    text-shadow: 0 0 10px currentColor,
                 0 0 20px currentColor,
                 0 0 30px currentColor;
  }
`;