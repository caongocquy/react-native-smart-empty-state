import { emptyStatePresets } from '../presets/emptyStatePresets';
import type {
  SmartEmptyStatePreset,
  SmartEmptyStatePresetConfig,
} from '../types';

export function resolvePreset(
  preset: SmartEmptyStatePreset = 'empty',
  overrides?: Partial<Record<SmartEmptyStatePreset, SmartEmptyStatePresetConfig>>
): SmartEmptyStatePresetConfig {
  return {
    ...emptyStatePresets[preset],
    ...overrides?.[preset],
  };
}
