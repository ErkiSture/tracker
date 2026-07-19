import { ThemeProvider, useTheme } from "@/shared/contexts/themeContext";
import setUpDatabase from "@/shared/database/sqlite";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const theme = useTheme();

  useEffect(() => {
    // Set up the database when the app starts
    setUpDatabase();
  }, []);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
    </ThemeProvider>
  );
}
