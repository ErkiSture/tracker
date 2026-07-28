import DailyEntryScreen from "@/features/daily-entry/components/DailyEntryScreen";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { ScrollView } from "react-native";

export default function Index() {

  const { themeColors } = useTheme();
  const styles = createCommonStyles(themeColors);

  return (
    <ScrollView style={styles.screenContainer}>
      <DailyEntryScreen></DailyEntryScreen>
    </ScrollView>
  );
}