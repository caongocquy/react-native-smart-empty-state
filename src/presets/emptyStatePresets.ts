import type {
  SmartEmptyStatePreset,
  SmartEmptyStatePresetConfig,
} from '../types';

export const emptyStatePresets: Record<
  SmartEmptyStatePreset,
  SmartEmptyStatePresetConfig
> = {
  empty: {
    title: 'No data found',
    description: 'There is nothing to show right now.',
  },
  error: {
    title: 'Something went wrong',
    description: 'Please try again later.',
  },
  offline: {
    title: 'You are offline',
    description: 'Check your internet connection and try again.',
  },
  loading: {
    title: 'Loading',
    description: 'Please wait a moment.',
    loading: true,
  },
  search: {
    title: 'No results found',
    description: 'Try adjusting your search keywords.',
  },
};
