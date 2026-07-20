import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../theme/colors";

type ThemePreference = "light" | "dark" | "system";

type ThemeContextType = {
  theme: typeof lightTheme;
  preference: ThemePreference;
  changeTheme: (theme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  preference: "system",
  changeTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  
  // Default to system theme so new users follow their device settings.
  // User preference overrides this after they choose a theme.
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    async function loadTheme() {
      const saved = await AsyncStorage.getItem("theme");

      if (saved) {
        setPreference(saved as ThemePreference);
      }
    }

    loadTheme();
  }, []);

  async function changeTheme(newTheme: ThemePreference) {
    setPreference(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  }

  // Determine the actual theme to use based on user preference and system settings
  let isDark;
  if (preference === "system") {
    isDark = systemTheme === "dark";
  } else {
    isDark = preference === "dark";
  } 
  
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, preference, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);