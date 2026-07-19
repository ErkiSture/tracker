import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../theme/theme";

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