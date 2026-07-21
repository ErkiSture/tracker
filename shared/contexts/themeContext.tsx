import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkThemeColors, lightThemeColors } from "../theme/colors";
import { ThemePreference } from "../types/themePreference";

type ThemeContextType = {
  themeColors: typeof lightThemeColors;
  themePreference: ThemePreference;
  changeTheme: (theme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  themeColors: lightThemeColors,
  themePreference: "system",
  changeTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  
  // Default to system theme so new users follow their device settings.
  // UserthemePreference overrides this after they choose a theme.
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");

  useEffect(() => {
    async function loadTheme() {
      const saved = await AsyncStorage.getItem("theme");

      if (saved) {
        setThemePreference(saved as ThemePreference);
      }
    }

    loadTheme();
  }, []);

  async function changeTheme(newTheme: ThemePreference) {
    setThemePreference(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  }

  // Determine the actual theme to use based on userthemePreference and system settings
  let isDark;
  if (themePreference === "system") {
    isDark = systemTheme === "dark";
  } else {
    isDark = themePreference === "dark";
  } 
  
  const themeColors = isDark ? darkThemeColors : lightThemeColors;

  return (
    <ThemeContext.Provider value={{themeColors, themePreference, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);