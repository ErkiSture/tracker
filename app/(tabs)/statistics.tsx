import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Text, View } from "react-native";

export default function Statistics() {
  const { theme } = useTheme();
  const commonStyles = createCommonStyles(theme);

  return (
    <>
      <View style= {commonStyles.screenContainer}>
        <Text>Stats</Text>
      </View>
    </>
  );
}