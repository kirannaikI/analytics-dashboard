import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './app';


describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have "Analytics Dashboard" as the title', async () => {
    render(<App />);
    // screen.debug(); // For debugging
    const title = await screen.findByText(/Analytics Dashboard/i);
    expect(title).toBeInTheDocument();
  });
});
