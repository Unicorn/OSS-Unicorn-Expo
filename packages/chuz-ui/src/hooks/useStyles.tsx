import type { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { useTheme } from "@shopify/restyle";

type ReStyled = StyleSheet.NamedStyles<any>;

// TODO: Revisit when doing a final pass for dark/light theme colors
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #ccc #f0f0f0;
  }
`;

const injectScrollbarStyles = () => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined") {
      const styleElement = document.createElement("style");
      styleElement.textContent = scrollbarStyles;
      document.head.append(styleElement);
    }
  }
};

const replaceColors = (styles: ReStyled, colors: any): ReStyled => {
  const newStyles: ReStyled = {};

  for (const key in styles) {
    if (typeof styles[key] === "object" && !Array.isArray(styles[key])) {
      newStyles[key] = replaceColors(styles[key] as ReStyled, colors);
    } else if (typeof styles[key] === "string" && (styles[key] as string).startsWith("colors.")) {
      const colorKey = (styles[key] as string).substring(7); // Remove "colors." prefix
      newStyles[key] = colors[colorKey];
    } else {
      newStyles[key] = styles[key];
    }
  }

  return newStyles;
};

export const useStyles = (styles: ReStyled): ReStyled => {
  const { colors } = useTheme();
  injectScrollbarStyles();
  return replaceColors(styles, colors);
};
