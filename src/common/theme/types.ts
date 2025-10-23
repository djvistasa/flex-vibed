export interface Theme {
  colors: {
    // Primary brand colors
    primary: string;
    primaryLight: string;
    primaryDark: string;

    // Secondary colors
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;

    // Neutral colors
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceHover: string;

    // Text colors
    text: string;
    textSecondary: string;
    textMuted: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Border and divider colors
    border: string;
    borderLight: string;

    // Shadow colors
    shadow: string;
    shadowLight: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: string;
    fontFamilyHeading: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface ThemeProps {
  theme: Theme;
}
