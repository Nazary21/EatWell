import { colors, radius, spacing, elevation } from './tokens';

/**
 * Custom component styles that build on top of the base theme
 * These can be imported and applied to components directly
 */
export const componentStyles = {
  // Card styles
  card: {
    default: {
      borderRadius: radius.md,
      backgroundColor: colors.neutral[50],
      padding: spacing.md,
      ...elevation.sm,
    },
    elevated: {
      borderRadius: radius.md,
      backgroundColor: colors.neutral[50],
      padding: spacing.md,
      ...elevation.md,
    },
    outlined: {
      borderRadius: radius.md,
      backgroundColor: colors.neutral[50],
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.neutral[200],
    },
    dark: {
      borderRadius: radius.md,
      backgroundColor: colors.darkTheme.surface,
      padding: spacing.md,
      ...elevation.sm,
    },
  },
  
  // Button styles
  button: {
    primary: {
      backgroundColor: colors.purple[500],
      borderRadius: radius.full,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      ...elevation.sm,
    },
    secondary: {
      backgroundColor: colors.green[500],
      borderRadius: radius.full,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      ...elevation.sm,
    },
    outline: {
      backgroundColor: 'transparent',
      borderRadius: radius.full,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderWidth: 1,
      borderColor: colors.purple[500],
    },
    text: {
      backgroundColor: 'transparent',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
  },
  
  // Input styles
  input: {
    default: {
      backgroundColor: colors.neutral[100],
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderWidth: 1,
      borderColor: colors.neutral[200],
    },
    focused: {
      backgroundColor: colors.neutral[100],
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderWidth: 1,
      borderColor: colors.purple[500],
    },
    error: {
      backgroundColor: colors.neutral[100],
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderWidth: 1,
      borderColor: colors.red[500],
    },
  },
  
  // List item styles
  listItem: {
    default: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
    },
    compact: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
    },
  },
  
  // Badge styles
  badge: {
    default: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      borderRadius: radius.full,
      backgroundColor: colors.purple[100],
    },
    success: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      borderRadius: radius.full,
      backgroundColor: colors.green[100],
    },
    error: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      borderRadius: radius.full,
      backgroundColor: colors.red[100],
    },
    warning: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      borderRadius: radius.full,
      backgroundColor: colors.yellow[100],
    },
    info: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      borderRadius: radius.full,
      backgroundColor: colors.blue[100],
    },
  },
  
  // Header styles
  header: {
    large: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: colors.neutral[50],
      ...elevation.sm,
    },
    default: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.neutral[50],
      ...elevation.xs,
    },
    transparent: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: 'transparent',
    },
  },
}; 