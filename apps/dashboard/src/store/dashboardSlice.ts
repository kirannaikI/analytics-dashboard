import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DateRange = {
  start: Date;
  end: Date;
};

export type ChartType = 'line' | 'bar' | 'pie' | 'area';

export interface DashboardState {
  dateRange: DateRange;
  selectedMetrics: string[];
  chartType: ChartType;
  filters: Record<string, unknown>;
  isLoading: boolean;
  refreshInterval: number | null;
}

const initialState: DashboardState = {
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date(),
  },
  selectedMetrics: ['revenue', 'users', 'conversion'],
  chartType: 'line',
  filters: {},
  isLoading: false,
  refreshInterval: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    setSelectedMetrics: (state, action: PayloadAction<string[]>) => {
      state.selectedMetrics = action.payload;
    },
    toggleMetric: (state, action: PayloadAction<string>) => {
      const metric = action.payload;
      const index = state.selectedMetrics.indexOf(metric);
      if (index > -1) {
        state.selectedMetrics.splice(index, 1);
      } else {
        state.selectedMetrics.push(metric);
      }
    },
    setChartType: (state, action: PayloadAction<ChartType>) => {
      state.chartType = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRefreshInterval: (state, action: PayloadAction<number | null>) => {
      state.refreshInterval = action.payload;
    },
  },
});

export const {
  setDateRange,
  setSelectedMetrics,
  toggleMetric,
  setChartType,
  setFilter,
  clearFilters,
  setLoading,
  setRefreshInterval,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;