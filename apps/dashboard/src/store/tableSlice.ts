import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from './index';

export interface TableRow {
  id: string;
  name: string;
  email: string;
  revenue: number;
  status: 'active' | 'inactive' | 'pending';
  date: string;
  country: string;
  product: string;
  quantity: number;
  category: string;
}

export interface TableState {
  rawData: TableRow[];
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  filters: Record<string, unknown>;
  searchQuery: string;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

const initialState: TableState = {
  rawData: [],
  sortBy: null,
  sortDirection: 'asc',
  filters: {},
  searchQuery: '',
  pagination: {
    pageIndex: 0,
    pageSize: 50,
  },
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TableRow[]>) => {
      state.rawData = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      if (state.sortBy === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortDirection = 'asc';
      }
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: unknown }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilter: (state, action: PayloadAction<string>) => {
      delete state.filters[action.payload];
    },
    clearAllFilters: (state) => {
      state.filters = {};
      state.searchQuery = '';
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.pagination.pageIndex = 0; // Reset to first page on search
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      state.pagination.pageIndex = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
      state.pagination.pageIndex = 0;
    },
  },
});

export const {
  setData,
  setSortBy,
  setFilter,
  clearFilter,
  clearAllFilters,
  setSearchQuery,
  setPageIndex,
  setPageSize,
} = tableSlice.actions;

// Memoized selectors for performance
export const selectRawData = (state: RootState) => state.table.rawData;
export const selectFilters = (state: RootState) => state.table.filters;
export const selectSearchQuery = (state: RootState) => state.table.searchQuery;
export const selectSortBy = (state: RootState) => state.table.sortBy;
export const selectSortDirection = (state: RootState) => state.table.sortDirection;

// Filtered and sorted data selector
export const selectProcessedData = createSelector(
  [selectRawData, selectFilters, selectSearchQuery, selectSortBy, selectSortDirection],
  (data, filters, searchQuery, sortBy, sortDirection) => {
    let processed = [...data];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      processed = processed.filter(
        (row) =>
          row.name.toLowerCase().includes(query) ||
          row.email.toLowerCase().includes(query) ||
          row.product.toLowerCase().includes(query) ||
          row.country.toLowerCase().includes(query)
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          processed = processed.filter((row) => value.includes(row[key as keyof TableRow]));
        } else {
          processed = processed.filter((row) => row[key as keyof TableRow] === value);
        }
      }
    });

    // Apply sorting
    if (sortBy) {
      processed.sort((a, b) => {
        const aVal = a[sortBy as keyof TableRow];
        const bVal = b[sortBy as keyof TableRow];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
    }

    return processed;
  }
);

// Paginated data selector
export const selectPaginatedData = createSelector(
  [selectProcessedData, (state: RootState) => state.table.pagination],
  (data, pagination) => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return data.slice(start, end);
  }
);

export const selectTotalPages = createSelector(
  [selectProcessedData, (state: RootState) => state.table.pagination.pageSize],
  (data, pageSize) => Math.ceil(data.length / pageSize)
);

export default tableSlice.reducer;