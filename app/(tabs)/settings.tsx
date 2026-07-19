import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Button, View } from "react-native";

export default function Settings() {
  const { theme, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(theme);

  return (
    <View style={commonStyles.screenContainer}>
      <Button
        title="Light"
        onPress={() => changeTheme("light")}
      />

      <Button
        title="Dark"
        onPress={() => changeTheme("dark")}
      />

      <Button
        title="System"
        onPress={() => changeTheme("system")}
      />
    </View>
  );
}