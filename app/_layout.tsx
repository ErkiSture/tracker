import { MetricProvider } from "@/features/metrics/contexts/metricContext";
import EntryProvider from "@/shared/contexts/entryContext";
import { ThemeProvider } from "@/shared/contexts/themeContext";
import setUpDatabase from "@/shared/database/sqlite";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    // Set up the database when the app starts
    setUpDatabase();
  }, []);

  return (
    <ThemeProvider>
      <MetricProvider>
        <EntryProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          </Stack>
        </EntryProvider>
      </MetricProvider>
    </ThemeProvider>
  );
}
