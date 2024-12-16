import { createContext, FC, useState, useContext, useEffect } from "react";

import { ThemeProvider } from "@shopify/restyle";

import { chuzUILight, chuzUIDark } from "../theme";
import type { ChuzTheme, ChuzThemes, ChuzContextType, ChuzProviderProps } from "../types";
import { STORE, getItem, setItem } from "./store";

export const ChuzContext = createContext<ChuzContextType>({ theme: "light" } as ChuzContextType);

export const ChuzProvider: FC<ChuzProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ChuzThemes>("light");

  let restyle: ChuzTheme;

  const setThemeHandler = (t: ChuzThemes) => {
    setItem(STORE.theme, t);
    setTheme(t);
  };

  useEffect(() => {
    const getThemeFromStore = async () => {
      const t = await getItem<ChuzThemes | null>(STORE.theme);
      t && setThemeHandler(t);
    };
    getThemeFromStore();
  }, []);

  switch (theme) {
    case "light":
      restyle = chuzUILight;
      break;
    case "dark":
      restyle = chuzUIDark;
      break;
    default:
      restyle = chuzUILight;
      break;
  }

  return (
    <ChuzContext.Provider value={{ theme, setTheme: setThemeHandler }}>
      <ThemeProvider theme={restyle}>{children}</ThemeProvider>
    </ChuzContext.Provider>
  );
};

// Hook to use the theme context
export const useChuzContext = () => useContext(ChuzContext);
