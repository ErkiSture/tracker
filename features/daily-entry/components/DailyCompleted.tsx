import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Text, View } from "react-native";

export default function DailyCompleted() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <View style={{ gap: 12 }}>
      <Text style={commonStyles.title}>
        Today's entry completed ✓
      </Text>

      <Text style={commonStyles.text}>
        Come back tomorrow for your next entry.
      </Text>
    </View>
  );
}