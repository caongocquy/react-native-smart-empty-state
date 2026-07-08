import React from 'react';
import { Pressable, Text } from 'react-native';
import type { SmartEmptyStateActionProps } from '../../types';
import { DEFAULT_COLORS, styles } from './styles';

export function SmartEmptyStateAction({
  label,
  onPress,
  variant = 'primary',
  colors,
  compact = false,
  testID,
}: SmartEmptyStateActionProps) {
  const isPrimary = variant === 'primary';
  const backgroundColor = isPrimary
    ? colors?.primary ?? DEFAULT_COLORS.primary
    : 'transparent';
  const textColor = isPrimary
    ? colors?.primaryText ?? DEFAULT_COLORS.primaryText
    : colors?.secondaryText ?? DEFAULT_COLORS.secondaryText;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.actionButton,
        compact && styles.compactActionButton,
        isPrimary ? styles.primaryAction : styles.secondaryAction,
        { backgroundColor },
      ]}
      testID={testID}
    >
      <Text
        style={[
          styles.actionLabel,
          compact && styles.compactActionLabel,
          { color: textColor },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
