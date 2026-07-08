import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSmartStateDefaults } from '../../provider';
import type { SmartEmptyStateProps } from '../../types';
import { resolvePreset } from '../../utils/resolvePreset';
import { SmartEmptyStateAction } from './SmartEmptyStateAction';
import { DEFAULT_COLORS, styles } from './styles';

export function SmartEmptyState({
  preset = 'empty',
  title,
  description,
  icon,
  loading,
  compact = false,
  fullScreen = false,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  colors,
  style,
  contentStyle,
  testID,
}: SmartEmptyStateProps) {
  const defaults = useSmartStateDefaults();
  const resolvedColors = {
    ...defaults.colors,
    ...colors,
  };
  const presetConfig = resolvePreset(preset, defaults.presets);
  const resolvedTitle = title ?? presetConfig.title;
  const resolvedDescription = description ?? presetConfig.description;
  const isLoading = loading ?? presetConfig.loading ?? false;
  const primaryAction =
    primaryActionLabel && onPrimaryAction
      ? { label: primaryActionLabel, onPress: onPrimaryAction }
      : undefined;
  const secondaryAction =
    secondaryActionLabel && onSecondaryAction
      ? { label: secondaryActionLabel, onPress: onSecondaryAction }
      : undefined;
  const hasActions = Boolean(primaryAction || secondaryAction);
  const backgroundColor =
    resolvedColors.background ?? DEFAULT_COLORS.background;

  return (
    <View
      style={[
        styles.container,
        compact && styles.compactContainer,
        fullScreen && styles.fullScreen,
        { backgroundColor },
        style,
      ]}
      testID={testID}
    >
      <View style={[styles.content, contentStyle]}>
        {isLoading ? (
          <ActivityIndicator
            color={resolvedColors.primary ?? DEFAULT_COLORS.primary}
            size={compact ? 'small' : 'large'}
            style={[styles.icon, compact && styles.compactIcon]}
          />
        ) : icon ? (
          <View style={[styles.icon, compact && styles.compactIcon]}>
            {icon}
          </View>
        ) : null}

        <Text
          accessibilityRole="header"
          style={[
            styles.title,
            compact && styles.compactTitle,
            { color: resolvedColors.title ?? DEFAULT_COLORS.title },
          ]}
        >
          {resolvedTitle}
        </Text>

        <Text
          style={[
            styles.description,
            compact && styles.compactDescription,
            {
              color:
                resolvedColors.description ?? DEFAULT_COLORS.description,
            },
          ]}
        >
          {resolvedDescription}
        </Text>

        {hasActions ? (
          <View style={[styles.actions, compact && styles.compactActions]}>
            {primaryAction ? (
              <SmartEmptyStateAction
                colors={resolvedColors}
                compact={compact}
                label={primaryAction.label}
                onPress={primaryAction.onPress}
                testID={testID ? `${testID}-primary-action` : undefined}
              />
            ) : null}

            {secondaryAction ? (
              <SmartEmptyStateAction
                colors={resolvedColors}
                compact={compact}
                label={secondaryAction.label}
                onPress={secondaryAction.onPress}
                testID={testID ? `${testID}-secondary-action` : undefined}
                variant="secondary"
              />
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}
