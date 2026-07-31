import { resetDatabase } from "@/features/entries/repositories/entryRepository";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { seedEntries } from "@/shared/database/seedEntries";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, Text, View } from "react-native";

export default function DevButtons() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { refreshMetrics } = useMetrics()

  return (
    <View style={commonStyles.sectionCard}>
      <Pressable style={commonStyles.button} onPress={async () => {
        await resetDatabase();
        await refreshMetrics();
        // await loadEntries();
      }}>
        <Text style={commonStyles.buttonText}>reset db</Text>
      </Pressable>
      <Pressable style={commonStyles.button} onPress={async () => {
        await seedEntries()
        await refreshMetrics()
        // await loadEntries();
      }}>
        <Text style={commonStyles.buttonText}>Seed database</Text>
      </Pressable>
    </View>
  )
}