import { StyleSheet } from 'react-native';

export const DEFAULT_COLORS = {
  background: 'transparent',
  title: '#111827',
  description: '#6B7280',
  primary: '#2563EB',
  primaryText: '#FFFFFF',
  secondaryText: '#2563EB',
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: DEFAULT_COLORS.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  fullScreen: {
    flex: 1,
  },
  compactContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 360,
    width: '100%',
  },
  icon: {
    marginBottom: 16,
  },
  compactIcon: {
    marginBottom: 10,
  },
  title: {
    color: DEFAULT_COLORS.title,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    textAlign: 'center',
  },
  compactTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  description: {
    color: DEFAULT_COLORS.description,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  compactDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  actions: {
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  compactActions: {
    marginTop: 16,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 120,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  compactActionButton: {
    minHeight: 38,
    minWidth: 104,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  primaryAction: {
    backgroundColor: DEFAULT_COLORS.primary,
  },
  secondaryAction: {
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  compactActionLabel: {
    fontSize: 14,
    lineHeight: 18,
  },
});
