import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterControls } from '@components/FilterControls';

describe('FilterControls', () => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    filters: {},
    onFilterChange: vi.fn(),
    onClearFilters: vi.fn(),
    totalRows: 100000,
    filteredRows: 100000,
  };

  it('renders search input', () => {
    render(<FilterControls {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search by name, email, product, or country/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('displays total and filtered row counts', () => {
    const { container } = render(<FilterControls {...defaultProps} filteredRows={5000} />);
    
    const statsText = container.querySelector('.stats')?.textContent;
    expect(statsText).toMatch(/Showing/i);
    // Flexible match for numbers: allows for any separator (comma, space, dot)
    // 5,000 or 5 000 or 5.000
    expect(statsText).toMatch(/5\D?000/);
    // 100,000 or 100 000 or 1.00.000
    expect(statsText).toMatch(/1\D?00\D?000/);
  });

  it('calls onSearchChange when typing in search input', () => {
    render(<FilterControls {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search by name, email, product, or country/i);
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('test query');
  });

  it('calls onFilterChange when selecting status filter', () => {
    render(<FilterControls {...defaultProps} />);
    
    const statusSelect = screen.getByLabelText(/status/i);
    fireEvent.change(statusSelect, { target: { value: 'active' } });
    
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('status', 'active');
  });

  it('calls onFilterChange when selecting category filter', () => {
    render(<FilterControls {...defaultProps} />);
    
    const categorySelect = screen.getByLabelText(/category/i);
    fireEvent.change(categorySelect, { target: { value: 'Software' } });
    
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('category', 'Software');
  });

  it('shows clear filters button when filters are active', () => {
    render(
      <FilterControls
        {...defaultProps}
        searchQuery="test"
      />
    );
    
    expect(screen.getByText(/clear all filters/i)).toBeInTheDocument();
  });

  it('hides clear filters button when no filters are active', () => {
    render(<FilterControls {...defaultProps} />);
    
    expect(screen.queryByText(/clear all filters/i)).not.toBeInTheDocument();
  });

  it('calls onClearFilters when clicking clear button', () => {
    render(
      <FilterControls
        {...defaultProps}
        searchQuery="test"
      />
    );
    
    const clearButton = screen.getByText(/clear all filters/i);
    fireEvent.click(clearButton);
    
    expect(defaultProps.onClearFilters).toHaveBeenCalled();
  });
});