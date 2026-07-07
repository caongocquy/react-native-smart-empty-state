import React, { createContext, useContext, useMemo } from 'react';
import type {
  SmartStateProviderProps,
  SmartStateProviderValue,
} from '../types';

const SmartStateContext = createContext<SmartStateProviderValue>({});

export function SmartStateProvider({
  children,
  colors,
  presets,
}: SmartStateProviderProps) {
  const value = useMemo(
    () => ({
      colors,
      presets,
    }),
    [colors, presets]
  );

  return (
    <SmartStateContext.Provider value={value}>
      {children}
    </SmartStateContext.Provider>
  );
}

export function useSmartStateDefaults(): SmartStateProviderValue {
  return useContext(SmartStateContext);
}
