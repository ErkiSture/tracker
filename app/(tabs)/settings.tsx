import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  const { theme, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(theme);

  return (
    <View style={commonStyles.screenContainer}>
      <Pressable
        style={commonStyles.button}
        onPress={() => changeTheme("light")}
      >
        <Text style={commonStyles.buttonText}>Light</Text>
      </Pressable>

      <Pressable
        style={commonStyles.button}
        onPress={() => changeTheme("dark")}
      >
        <Text style={commonStyles.buttonText}>Dark</Text>
      </Pressable>

      <Pressable
        style={commonStyles.button}
        onPress={() => changeTheme("system")}
      >
        <Text style={commonStyles.buttonText}>System</Text>
      </Pressable>
    </View>
  );
}