import React from 'react';
import type { SmartStateViewProps } from '../../types';
import { isEmptyData } from '../../utils/isEmptyData';
import { SmartEmptyState } from '../SmartEmptyState';

export function SmartStateView<T>({
  loading = false,
  error,
  offline = false,
  data,
  isEmpty = isEmptyData,
  onRetry,
  renderContent,
  loadingComponent,
  errorComponent,
  emptyComponent,
  offlineComponent,
  emptyPreset = 'empty',
  errorPreset = 'error',
  offlinePreset = 'offline',
  loadingPreset = 'loading',
  stateProps,
  testID,
}: SmartStateViewProps<T>) {
  if (offline) {
    return (
      <>
        {offlineComponent ?? (
          <SmartEmptyState
            preset={offlinePreset}
            primaryActionLabel={onRetry ? 'Try again' : undefined}
            onPrimaryAction={onRetry}
            testID={testID ? `${testID}-offline` : undefined}
            {...stateProps}
          />
        )}
      </>
    );
  }

  if (loading) {
    return (
      <>
        {loadingComponent ?? (
          <SmartEmptyState
            preset={loadingPreset}
            testID={testID ? `${testID}-loading` : undefined}
            {...stateProps}
          />
        )}
      </>
    );
  }

  if (error) {
    return (
      <>
        {errorComponent ?? (
          <SmartEmptyState
            preset={errorPreset}
            primaryActionLabel={onRetry ? 'Try again' : undefined}
            onPrimaryAction={onRetry}
            testID={testID ? `${testID}-error` : undefined}
            {...stateProps}
          />
        )}
      </>
    );
  }

  if (isEmpty(data)) {
    return (
      <>
        {emptyComponent ?? (
          <SmartEmptyState
            preset={emptyPreset}
            testID={testID ? `${testID}-empty` : undefined}
            {...stateProps}
          />
        )}
      </>
    );
  }

  return <>{renderContent(data as T)}</>;
}
