import { calculateRem } from "@common/utils";
import type { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    // Primary brand colors - Professional blue inspired by The Flex Global
    primary: "#284e4c", // Modern blue
    primaryLight: "#3b82f6", // Lighter blue
    primaryDark: "#1d4ed8", // Darker blue

    // Secondary colors - Complementary grays
    secondary: "#64748b", // Slate gray
    secondaryLight: "#94a3b8", // Light slate
    secondaryDark: "#475569", // Dark slate

    // Neutral colors - Clean whites and grays
    background: "#fffdf6", // Warm white background
    backgroundSecondary: "#f8fafc", // Very light gray
    surface: "#ffffff", // White surface
    surfaceHover: "#f1f5f9", // Light gray hover
    surfaceLight: "#f1f3ee", // Light green-gray for sections

    // Text colors - High contrast for readability
    text: "#0f172a", // Very dark blue-gray
    textSecondary: "#475569", // Medium gray
    textMuted: "#64748b", // Muted gray

    // Status colors - Professional dashboard colors
    success: "#059669", // Green
    successDark: "#047857", // Darker green for published
    warning: "#d97706", // Amber
    error: "#dc2626", // Red
    info: "#0284c7", // Sky blue

    // Border and divider colors
    border: "#e2e8f0", // Light border
    borderLight: "#f1f5f9", // Very light border

    // Shadow colors
    shadow: "rgba(15, 23, 42, 0.08)", // Subtle shadow
    shadowLight: "rgba(15, 23, 42, 0.04)", // Very light shadow
  },
  spacing: {
    xs: calculateRem(4), // 4px
    sm: calculateRem(8), // 8px
    md: calculateRem(16), // 16px
    lg: calculateRem(24), // 24px
    xl: calculateRem(32), // 32px
    xxl: calculateRem(48), // 48px
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyHeading:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: {
      xs: calculateRem(12), // 12px
      sm: calculateRem(14), // 14px
      md: calculateRem(16), // 16px
      lg: calculateRem(18), // 18px
      xl: calculateRem(20), // 20px
      xxl: calculateRem(24), // 24px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  borderRadius: {
    sm: calculateRem(4), // 4px
    md: calculateRem(6), // 6px
    lg: calculateRem(8), // 8px
    xl: calculateRem(12), // 12px
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
    md: "0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)",
    lg: "0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)",
    xl: "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)",
  },
};
