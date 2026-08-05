import EntryProvider from "@/features/entries/contexts/entryContext";
import { MetricProvider } from "@/features/metrics/contexts/metricContext";
import { ThemeProvider } from "@/shared/contexts/themeContext";
import setUpDatabase from "@/shared/database/sqlite";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

export default function RootLayout() {
  useEffect(() => {
    // Set up the database when the app starts
    setUpDatabase();
  }, []);

  return (
    <MenuProvider>
      <ThemeProvider>
        <EntryProvider>
          <MetricProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            </Stack>
          </MetricProvider>
        </EntryProvider>
      </ThemeProvider>
    </MenuProvider>
  );
}