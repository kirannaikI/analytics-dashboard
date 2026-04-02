import React from 'react';
import styled from 'styled-components';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  totalRows: number;
  filteredRows: number;
}

const Container = styled.div`
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  
  h3 {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    
    .icon {
      color: var(--color-primary);
    }
  }
  
  .stats {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    
    .filtered {
      color: var(--color-primary);
      font-weight: 600;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: var(--spacing-md);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  background: var(--color-bg-primary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--glow-primary);
  }
  
  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const FilterLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Select = styled.select`
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-primary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--glow-primary);
  }
  
  &:hover {
    border-color: var(--color-primary);
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255, 68, 102, 0.1);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-md);
  color: var(--color-error);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: rgba(255, 68, 102, 0.2);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'Software', label: 'Software' },
  { value: 'Services', label: 'Services' },
  { value: 'Training', label: 'Training' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Support', label: 'Support' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Security', label: 'Security' },
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  onClearFilters,
  totalRows,
  filteredRows,
}) => {
  const hasActiveFilters = searchQuery || Object.values(filters).some(v => v);

  return (
    <Container>
      <Header>
        <h3>
          <FiFilter className="icon" />
          Filters & Search
        </h3>
        <div className="stats">
          Showing <span className="filtered">{filteredRows.toLocaleString()}</span> of {totalRows.toLocaleString()} rows
        </div>
      </Header>

      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search by name, email, product, or country..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </SearchContainer>

      <FiltersGrid>
        <FilterGroup>
          <FilterLabel htmlFor="status-filter">Status</FilterLabel>
          <Select
            id="status-filter"
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="category-filter">Category</FilterLabel>
          <Select
            id="category-filter"
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterGroup>

        {hasActiveFilters && (
          <FilterGroup style={{ justifyContent: 'flex-end' }}>
            <FilterLabel>&nbsp;</FilterLabel>
            <ClearButton onClick={onClearFilters}>
              <FiX />
              Clear All Filters
            </ClearButton>
          </FilterGroup>
        )}
      </FiltersGrid>
    </Container>
  );
};