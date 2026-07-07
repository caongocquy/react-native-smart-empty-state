import type React from 'react';
import type { FlatListProps, ViewStyle } from 'react-native';

export type SmartEmptyStatePreset =
  | 'empty'
  | 'error'
  | 'offline'
  | 'loading'
  | 'search';

export type SmartStateColors = {
  /** Background color for the root state container. */
  background?: string;
  /** Title text color. */
  title?: string;
  /** Description text color. */
  description?: string;
  /** Primary button background color and loading indicator color. */
  primary?: string;
  /** Primary button label color. */
  primaryText?: string;
  /** Secondary button label color. */
  secondaryText?: string;
};

export type SmartEmptyStateColors = SmartStateColors;

export type SmartEmptyStateProps = {
  /** Selects the default title, description, and loading behavior. Defaults to "empty". */
  preset?: SmartEmptyStatePreset;
  /** Overrides the resolved preset title. */
  title?: string;
  /** Overrides the resolved preset description. */
  description?: string;
  /** Renders above the title when the state is not loading. */
  icon?: React.ReactNode;
  /** Forces an ActivityIndicator when true. The loading preset enables this by default. */
  loading?: boolean;
  /** Uses smaller padding, spacing, text sizes, and button dimensions. */
  compact?: boolean;
  /** Adds flex: 1 to the root container for full-screen state layouts. */
  fullScreen?: boolean;
  /** Text for the primary action button. Requires onPrimaryAction to render. */
  primaryActionLabel?: string;
  /** Press handler for the primary action button. Requires primaryActionLabel to render. */
  onPrimaryAction?: () => void;
  /** Text for the secondary action button. Requires onSecondaryAction to render. */
  secondaryActionLabel?: string;
  /** Press handler for the secondary action button. Requires secondaryActionLabel to render. */
  onSecondaryAction?: () => void;
  /** Overrides provider/default colors for this state only. */
  colors?: SmartStateColors;
  /** Extra style for the root container. */
  style?: ViewStyle;
  /** Extra style for the centered content wrapper. */
  contentStyle?: ViewStyle;
  /** Test id for the root container. Action test ids are derived from this value. */
  testID?: string;
};

export type SmartEmptyStateActionProps = {
  /** Button label text. */
  label: string;
  /** Press handler for the button. */
  onPress: () => void;
  /** Visual style of the button. Defaults to "primary". */
  variant?: 'primary' | 'secondary';
  /** Colors used by the button label and background. */
  colors?: SmartStateColors;
  /** Uses smaller button dimensions and label size. */
  compact?: boolean;
  /** Test id for the button. */
  testID?: string;
};

export type SmartEmptyStatePresetConfig = {
  /** Default title for the preset. */
  title: string;
  /** Default description for the preset. */
  description: string;
  /** Whether this preset should show an ActivityIndicator by default. */
  loading?: boolean;
};

export type SmartStateProviderValue = {
  /** Default colors used by nested SmartEmptyState instances. Local props override these values. */
  colors?: SmartStateColors;
  /** Default preset overrides for the provider subtree. Local text/loading props still win. */
  presets?: Partial<
    Record<SmartEmptyStatePreset, SmartEmptyStatePresetConfig>
  >;
};

export type SmartStateProviderProps = SmartStateProviderValue & {
  /** App or subtree that should receive default colors and preset overrides. */
  children: React.ReactNode;
};

export type SmartStateViewProps<T> = {
  /** When true, renders the loading state before error, empty, or content. */
  loading?: boolean;
  /** When truthy, renders the error state after offline and loading checks. */
  error?: unknown;
  /** When true, renders the offline state with highest priority. */
  offline?: boolean;
  /** Data used for empty detection and passed to renderContent when non-empty. */
  data?: T | null | undefined;
  /** Custom empty check. Defaults to null/undefined/empty-array detection. */
  isEmpty?: (data: T | null | undefined) => boolean;
  /** Retry handler used by the default error and offline states. */
  onRetry?: () => void;
  /** Renders the content state. Called only when data is considered non-empty. */
  renderContent: (data: T) => React.ReactNode;
  /** Fully replaces the default loading SmartEmptyState. */
  loadingComponent?: React.ReactNode;
  /** Fully replaces the default error SmartEmptyState. */
  errorComponent?: React.ReactNode;
  /** Fully replaces the default empty SmartEmptyState. */
  emptyComponent?: React.ReactNode;
  /** Fully replaces the default offline SmartEmptyState. */
  offlineComponent?: React.ReactNode;
  /** Preset used for the default empty state. Defaults to "empty". */
  emptyPreset?: SmartEmptyStatePreset;
  /** Preset used for the default error state. Defaults to "error". */
  errorPreset?: SmartEmptyStatePreset;
  /** Preset used for the default offline state. Defaults to "offline". */
  offlinePreset?: SmartEmptyStatePreset;
  /** Preset used for the default loading state. Defaults to "loading". */
  loadingPreset?: SmartEmptyStatePreset;
  /** Preset available for search-empty wrapper flows. */
  searchPreset?: SmartEmptyStatePreset;
  /** Shared props merged into every default SmartEmptyState rendered by this view. */
  stateProps?: Partial<SmartEmptyStateProps>;
  /** Base test id. Default states append the current state name. */
  testID?: string;
};

export type SmartStateFlatListProps<ItemT> = FlatListProps<ItemT> & {
  /** When true and data is empty, renders the loading empty component. Existing list data stays visible. */
  loading?: boolean;
  /** When truthy and data is empty, renders the error empty component. Existing list data stays visible. */
  error?: unknown;
  /** When true and data is empty, renders the offline empty component before loading or error. */
  offline?: boolean;
  /** Retry handler used by the default error and offline empty states. */
  onRetry?: () => void;
  /** Preset used for the normal empty list state. Defaults to "empty". */
  emptyPreset?: SmartEmptyStatePreset;
  /** Shared props passed to default SmartEmptyState list states. */
  stateProps?: Partial<SmartEmptyStateProps>;
  /** Fully replaces the default loading empty component. */
  loadingComponent?: React.ReactNode;
  /** Fully replaces the default error empty component. */
  errorComponent?: React.ReactNode;
  /** Fully replaces the default offline empty component. */
  offlineComponent?: React.ReactNode;
};

export type UseAsyncStateOptions<T> = {
  /** Runs the fetcher once after mount. Inline callbacks will not cause repeated immediate fetches. */
  immediate?: boolean;
  /** Initial data value and the value restored by reset. */
  initialData?: T;
  /** Called after execute resolves and data state has been updated. */
  onSuccess?: (data: T) => void;
  /** Called after execute rejects and error state has been updated. The error is re-thrown. */
  onError?: (error: unknown) => void;
};

export type UseAsyncStateResult<T, Args extends unknown[]> = {
  /** Current data value. Starts as initialData when provided. */
  data: T | undefined;
  /** True while execute is running. */
  loading: boolean;
  /** Last error thrown by the fetcher, or undefined after reset/new execute start. */
  error: unknown;
  /** Calls the fetcher with the same arguments, updates state, and returns the fetched data. */
  execute: (...args: Args) => Promise<T>;
  /** Restores data to initialData and clears loading and error. */
  reset: () => void;
  /** Manually updates data, useful for optimistic UI or local edits. */
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
};
