import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TableRow } from '@store/tableSlice';

const API_URL = 'https://api.example.com';

// API client
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const fetchTableData = async (): Promise<TableRow[]> => {
  const { data } = await apiClient.get('/analytics/data');
  return data;
};

export const fetchChartData = async (dateRange: { start: Date; end: Date }) => {
  const { data } = await apiClient.get('/analytics/charts', {
    params: {
      startDate: dateRange.start.toISOString(),
      endDate: dateRange.end.toISOString(),
    },
  });
  return data;
};

export const exportData = async (filters: Record<string, any>): Promise<Blob> => {
  const { data } = await apiClient.post(
    '/analytics/export',
    { filters },
    { responseType: 'blob' }
  );
  return data;
};

// React Query Hooks

/**
 * Fetch table data with caching and automatic refetching
 */
export const useTableData = () => {
  return useQuery({
    queryKey: ['tableData'],
    queryFn: fetchTableData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
};

/**
 * Fetch chart data based on date range
 */
export const useChartData = (dateRange: { start: Date; end: Date }) => {
  return useQuery({
    queryKey: ['chartData', dateRange],
    queryFn: () => fetchChartData(dateRange),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!dateRange.start && !!dateRange.end,
  });
};

/**
 * Export data mutation
 */
export const useExportData = () => {
  return useMutation({
    mutationFn: exportData,
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-export-${new Date().toISOString()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error('Export failed:', error);
    },
  });
};

/**
 * Prefetch data for better UX
 */
export const usePrefetchData = () => {
  const queryClient = useQueryClient();

  const prefetchTableData = () => {
    queryClient.prefetchQuery({
      queryKey: ['tableData'],
      queryFn: fetchTableData,
    });
  };

  const prefetchChartData = (dateRange: { start: Date; end: Date }) => {
    queryClient.prefetchQuery({
      queryKey: ['chartData', dateRange],
      queryFn: () => fetchChartData(dateRange),
    });
  };

  return { prefetchTableData, prefetchChartData };
};

/**
 * Invalidate and refetch data
 */
export const useRefreshData = () => {
  const queryClient = useQueryClient();

  const refreshTableData = () => {
    queryClient.invalidateQueries({ queryKey: ['tableData'] });
  };

  const refreshChartData = () => {
    queryClient.invalidateQueries({ queryKey: ['chartData'] });
  };

  const refreshAll = () => {
    queryClient.invalidateQueries();
  };

  return { refreshTableData, refreshChartData, refreshAll };
};