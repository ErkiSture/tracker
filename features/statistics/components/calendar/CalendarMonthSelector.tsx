import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Text, View } from "react-native";

export default function CalendarMonthSelector() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  return (
    <View>
      <Text style={commonStyles.text}>CalendarMonthSelector</Text>
    </View>
  )
} 