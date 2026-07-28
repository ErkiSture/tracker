import SettingsScreen from "@/features/settings/components/SettingsScreen";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { ScrollView } from "react-native";

export default function Settings() {
  const { themeColors, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <ScrollView style={commonStyles.screenContainer}>
      <SettingsScreen></SettingsScreen>
    </ScrollView>
  );
}