import DailyForm from "@/features/daily-entry/components/DailyForm";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { View } from "react-native";

export default function Index() {

  const { themeColors } = useTheme();
  const styles = createCommonStyles(themeColors);

  return (
    <View style={styles.screenContainer}>
      <DailyForm />
    </View>
  );
}