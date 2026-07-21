import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Text, View } from "react-native";

export default function CalendarMetricSelector() {
  const { theme } = useTheme();
  const commonStyles = createCommonStyles(theme);

  return (
    <View>
      <Text style={commonStyles.text}>CalendarMetricSelector</Text>
    </View>
  )
} 