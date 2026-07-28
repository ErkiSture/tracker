import { useTheme } from "@/shared/contexts/themeContext";
import { seedEntries } from "@/shared/database/seedEntries";
import { resetDatabase } from "@/shared/repositories/entryRepository";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, Text, View } from "react-native";
import { useEntries } from "../hooks/useEntries";

export default function DevButtons() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  const { getAllEntries } = useEntries();

  return (
    <View style={commonStyles.sectionCard}>
      <Pressable style={commonStyles.button} onPress={getAllEntries}>
        <Text style={commonStyles.buttonText}>log all</Text>
      </Pressable>
      <Pressable style={commonStyles.button} onPress={resetDatabase}>
        <Text style={commonStyles.buttonText}>reset db</Text>
      </Pressable>
      <Pressable style={commonStyles.button} onPress={seedEntries}>
        <Text style={commonStyles.buttonText}>Seed database</Text>
      </Pressable>
    </View>
  )
}