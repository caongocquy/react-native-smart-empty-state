# @leo-showdar/react-native-smart-empty-state

A lightweight React Native TypeScript package for consistent loading, error, empty, offline, search-empty, and content states.

It works with Expo and React Native CLI because it only uses React Native components. There are no native modules and no runtime dependencies beyond React and React Native.

## Why this package?

Most apps repeat the same state handling in every screen:

- show loading while fetching
- show retry UI when an API fails
- show offline messaging
- show empty UI when a list has no data
- render content when data exists

This package keeps that flow small and reusable:

- `SmartStateView` for screen-level loading/error/empty/content rendering
- `SmartStateFlatList` for list states without losing normal `FlatList` props
- `SmartEmptyState` for presentational state UI
- `useAsyncState` for simple async loading/error/data state
- `SmartStateProvider` for global colors and preset text

## Install

```sh
npm install @leo-showdar/react-native-smart-empty-state
```

## Quick Start With SmartStateView

```tsx
import { Text, View } from 'react-native';
import { SmartStateView } from '@leo-showdar/react-native-smart-empty-state';

type Task = {
  id: string;
  title: string;
};

export function TasksScreen({
  loading,
  error,
  tasks,
  fetchTasks,
}: {
  loading: boolean;
  error: unknown;
  tasks: Task[] | null;
  fetchTasks: () => void;
}) {
  return (
    <SmartStateView
      loading={loading}
      error={error}
      data={tasks}
      onRetry={fetchTasks}
      renderContent={(items) => (
        <View>
          {items.map((task) => (
            <Text key={task.id}>{task.title}</Text>
          ))}
        </View>
      )}
    />
  );
}
```

State priority in `SmartStateView`:

1. `offline`
2. `loading`
3. `error`
4. `empty`
5. `content`

By default, `null`, `undefined`, and empty arrays are treated as empty.

## FlatList Example With SmartStateFlatList

```tsx
import { Text } from 'react-native';
import { SmartStateFlatList } from '@leo-showdar/react-native-smart-empty-state';

type Task = {
  id: string;
  title: string;
};

export function TaskList({
  tasks,
  loading,
  error,
  retry,
  refreshing,
  refresh,
}: {
  tasks: Task[];
  loading: boolean;
  error: unknown;
  retry: () => void;
  refreshing: boolean;
  refresh: () => void;
}) {
  return (
    <SmartStateFlatList
      data={tasks}
      loading={loading}
      error={error}
      onRetry={retry}
      refreshing={refreshing}
      onRefresh={refresh}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
}
```

`SmartStateFlatList` keeps normal `FlatList` props, including pull-to-refresh. It only replaces the empty area when the list has no data.

## Presentational Usage With SmartEmptyState

```tsx
import { SmartEmptyState } from '@leo-showdar/react-native-smart-empty-state';

export function EmptyProjects() {
  return (
    <SmartEmptyState
      preset="empty"
      title="No projects yet"
      description="Create your first project to get started."
      primaryActionLabel="Create project"
      onPrimaryAction={() => {}}
    />
  );
}
```

Available presets:

```tsx
<SmartEmptyState preset="empty" />
<SmartEmptyState preset="error" />
<SmartEmptyState preset="offline" />
<SmartEmptyState preset="loading" />
<SmartEmptyState preset="search" />
```

## useAsyncState Example

```tsx
import { Text } from 'react-native';
import {
  SmartStateView,
  useAsyncState,
} from '@leo-showdar/react-native-smart-empty-state';

type User = {
  id: string;
  name: string;
};

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://example.com/users');
  return response.json();
}

export function UsersScreen() {
  const { data, loading, error, execute } = useAsyncState(fetchUsers, {
    immediate: true,
    initialData: [],
  });

  return (
    <SmartStateView
      loading={loading}
      error={error}
      data={data}
      onRetry={execute}
      renderContent={(users) =>
        users.map((user) => <Text key={user.id}>{user.name}</Text>)
      }
    />
  );
}
```

## Global Theme With SmartStateProvider

```tsx
import {
  SmartStateProvider,
  SmartStateView,
} from '@leo-showdar/react-native-smart-empty-state';

export function App() {
  return (
    <SmartStateProvider
      colors={{
        background: '#F8FAFC',
        title: '#0F172A',
        description: '#475569',
        primary: '#0F766E',
        primaryText: '#FFFFFF',
        secondaryText: '#0F766E',
      }}
      presets={{
        empty: {
          title: 'Nothing here',
          description: 'New items will appear here when they are available.',
        },
      }}
    >
      <SmartStateView data={[]} renderContent={() => null} />
    </SmartStateProvider>
  );
}
```

Local component props override provider defaults.

## API Reference

### SmartStateView

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | When true, renders the loading state before checking `error`, `empty`, or content. |
| `error` | `unknown` | `undefined` | When truthy, renders the error state after `offline` and `loading` checks. |
| `offline` | `boolean` | `false` | When true, renders the offline state with the highest priority. |
| `data` | `T \| null \| undefined` | `undefined` | The value used for empty detection and passed to `renderContent` when content should render. |
| `isEmpty` | `(data) => boolean` | Built-in check | Overrides the default empty check. By default `null`, `undefined`, and empty arrays are empty. |
| `onRetry` | `() => void` | `undefined` | Passed to the default error/offline retry button as `onPrimaryAction`. |
| `renderContent` | `(data: T) => React.ReactNode` | Required | Renders the content state. It is called only after `data` is considered non-empty. |
| `loadingComponent` | `React.ReactNode` | `undefined` | Fully replaces the default loading `SmartEmptyState`. |
| `errorComponent` | `React.ReactNode` | `undefined` | Fully replaces the default error `SmartEmptyState`. |
| `emptyComponent` | `React.ReactNode` | `undefined` | Fully replaces the default empty `SmartEmptyState`. |
| `offlineComponent` | `React.ReactNode` | `undefined` | Fully replaces the default offline `SmartEmptyState`. |
| `emptyPreset` | `SmartEmptyStatePreset` | `'empty'` | Preset used for the default empty state. |
| `errorPreset` | `SmartEmptyStatePreset` | `'error'` | Preset used for the default error state. |
| `offlinePreset` | `SmartEmptyStatePreset` | `'offline'` | Preset used for the default offline state. |
| `loadingPreset` | `SmartEmptyStatePreset` | `'loading'` | Preset used for the default loading state. |
| `searchPreset` | `SmartEmptyStatePreset` | `undefined` | Reserved for search-empty flows when you want to pass a search preset through your own wrapper logic. |
| `stateProps` | `Partial<SmartEmptyStateProps>` | `undefined` | Shared props merged into every default `SmartEmptyState`, such as `compact`, `colors`, or custom text. |
| `testID` | `string` | `undefined` | Base test id. Default states append `-offline`, `-loading`, `-error`, or `-empty`. |

### SmartStateFlatList

`SmartStateFlatList<ItemT>` accepts all normal `FlatListProps<ItemT>` plus:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | When true and `data` is empty, renders the loading empty component. Existing list data stays visible. |
| `error` | `unknown` | `undefined` | When truthy and `data` is empty, renders the error empty component. Existing list data stays visible. |
| `offline` | `boolean` | `false` | When true and `data` is empty, renders the offline empty component before loading or error. |
| `onRetry` | `() => void` | `undefined` | Passed to default error/offline states as the primary retry action. |
| `emptyPreset` | `SmartEmptyStatePreset` | `'empty'` | Preset used when the list is empty and there is no loading/error/offline state. |
| `stateProps` | `Partial<SmartEmptyStateProps>` | `undefined` | Shared props passed to default `SmartEmptyState` list states. |
| `loadingComponent` | `React.ReactNode` | `undefined` | Fully replaces the default loading empty component. |
| `errorComponent` | `React.ReactNode` | `undefined` | Fully replaces the default error empty component. |
| `offlineComponent` | `React.ReactNode` | `undefined` | Fully replaces the default offline empty component. |
| `data` | `ItemT[] \| null \| undefined` | `undefined` | Normal `FlatList` data. Empty state logic only runs when this is missing or an empty array. |
| `ListEmptyComponent` | `FlatListProps<ItemT>['ListEmptyComponent']` | `undefined` | Used as the fallback empty UI when no loading/error/offline state is active. |
| `refreshing` | `boolean` | `undefined` | Normal `FlatList` pull-to-refresh prop; passed through unchanged. |
| `onRefresh` | `() => void` | `undefined` | Normal `FlatList` pull-to-refresh handler; passed through unchanged. |

### SmartEmptyState

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `preset` | `'empty' \| 'error' \| 'offline' \| 'loading' \| 'search'` | `'empty'` | Selects the default title, description, and loading behavior. Provider preset overrides are applied before local text props. |
| `title` | `string` | Preset title | Overrides the resolved preset title. |
| `description` | `string` | Preset description | Overrides the resolved preset description. |
| `icon` | `React.ReactNode` | `undefined` | Renders above the title when the state is not loading. |
| `loading` | `boolean` | Preset loading value | Forces the `ActivityIndicator` when true. `preset="loading"` enables it by default. |
| `compact` | `boolean` | `false` | Uses smaller padding, spacing, text sizes, and button dimensions. |
| `fullScreen` | `boolean` | `false` | Adds `flex: 1` to the root container for full-screen state layouts. |
| `primaryActionLabel` | `string` | `undefined` | Text for the primary button. The button renders only when both label and handler are provided. |
| `onPrimaryAction` | `() => void` | `undefined` | Press handler for the primary button. |
| `secondaryActionLabel` | `string` | `undefined` | Text for the secondary button. The button renders only when both label and handler are provided. |
| `onSecondaryAction` | `() => void` | `undefined` | Press handler for the secondary button. |
| `colors` | `SmartStateColors` | Provider/default colors | Overrides background, title, description, primary button, primary text, and secondary text colors. |
| `style` | `ViewStyle` | `undefined` | Extra style for the root container. Useful for margins, custom height, or screen layout. |
| `contentStyle` | `ViewStyle` | `undefined` | Extra style for the centered content wrapper. Useful for max width or alignment tweaks. |
| `testID` | `string` | `undefined` | Test id for the root container. Action test ids are derived as `-primary-action` and `-secondary-action`. |

### SmartStateColors

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `background` | `string` | `'transparent'` | Background color for the root state container. |
| `title` | `string` | `'#111827'` | Title text color. |
| `description` | `string` | `'#6B7280'` | Description text color. |
| `primary` | `string` | `'#2563EB'` | Primary button background and loading indicator color. |
| `primaryText` | `string` | `'#FFFFFF'` | Primary button label color. |
| `secondaryText` | `string` | `'#2563EB'` | Secondary button label color. |

### useAsyncState

```tsx
const { data, loading, error, execute, reset, setData } = useAsyncState(
  fetcher,
  options
);
```

Options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `immediate` | `boolean` | `false` | Runs `fetcher` once after mount. Inline callbacks will not cause repeated immediate fetches. |
| `initialData` | `T` | `undefined` | Initial `data` value and the value restored by `reset`. |
| `onSuccess` | `(data: T) => void` | `undefined` | Called after `execute` resolves and state has been updated with the new data. |
| `onError` | `(error: unknown) => void` | `undefined` | Called after `execute` rejects and state has stored the error. The error is re-thrown from `execute`. |

Return value:

| Field | Type | Description |
| --- | --- | --- |
| `data` | `T \| undefined` | Current data value. Starts as `initialData` when provided. |
| `loading` | `boolean` | True while `execute` is running. |
| `error` | `unknown` | Last error thrown by `fetcher`, or `undefined` after success/reset/new execute start. |
| `execute` | `(...args: Args) => Promise<T>` | Calls `fetcher` with the same arguments, updates state, and returns the fetched data. |
| `reset` | `() => void` | Restores `data` to `initialData` and clears `loading` and `error`. |
| `setData` | `React.Dispatch<React.SetStateAction<T \| undefined>>` | Lets you manually update data, for optimistic UI or local edits. |

### SmartStateProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `colors` | `SmartStateColors` | `undefined` | Default colors used by nested `SmartEmptyState` instances. Local `colors` props override provider colors. |
| `presets` | `Partial<Record<SmartEmptyStatePreset, SmartEmptyStatePresetConfig>>` | `undefined` | Overrides default preset title/description/loading values for the subtree. Local `title`, `description`, and `loading` props still win. |
| `children` | `React.ReactNode` | Required | App or subtree that should receive the default colors and preset overrides. |

## License

MIT
