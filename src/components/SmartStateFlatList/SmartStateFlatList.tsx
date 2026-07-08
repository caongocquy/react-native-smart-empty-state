import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import type { SmartStateFlatListProps } from '../../types';
import { isEmptyData } from '../../utils/isEmptyData';
import { SmartEmptyState } from '../SmartEmptyState';

export function SmartStateFlatList<ItemT>({
  data,
  loading = false,
  error,
  offline = false,
  onRetry,
  emptyPreset = 'empty',
  stateProps,
  loadingComponent,
  errorComponent,
  offlineComponent,
  ListEmptyComponent,
  ...flatListProps
}: SmartStateFlatListProps<ItemT>) {
  const isEmpty = isEmptyData(data);

  const stateEmptyComponent = useMemo<
    SmartStateFlatListProps<ItemT>['ListEmptyComponent']
  >(() => {
    if (!isEmpty) {
      return ListEmptyComponent;
    }

    if (offline) {
      const content =
        offlineComponent ?? (
          <SmartEmptyState
            preset="offline"
            primaryActionLabel={onRetry ? 'Try again' : undefined}
            onPrimaryAction={onRetry}
            {...stateProps}
          />
        );

      return () => <>{content}</>;
    }

    if (loading) {
      const content =
        loadingComponent ?? (
          <SmartEmptyState preset="loading" {...stateProps} />
        );

      return () => <>{content}</>;
    }

    if (error) {
      const content =
        errorComponent ?? (
          <SmartEmptyState
            preset="error"
            primaryActionLabel={onRetry ? 'Try again' : undefined}
            onPrimaryAction={onRetry}
            {...stateProps}
          />
        );

      return () => <>{content}</>;
    }

    if (ListEmptyComponent) {
      return ListEmptyComponent;
    }

    return () => <SmartEmptyState preset={emptyPreset} {...stateProps} />;
  }, [
    ListEmptyComponent,
    emptyPreset,
    error,
    errorComponent,
    isEmpty,
    loading,
    loadingComponent,
    offline,
    offlineComponent,
    onRetry,
    stateProps,
  ]);

  return (
    <FlatList
      data={data}
      ListEmptyComponent={stateEmptyComponent}
      {...flatListProps}
    />
  );
}
