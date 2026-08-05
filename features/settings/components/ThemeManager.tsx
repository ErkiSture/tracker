import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, StyleSheet, Text, View } from "react-native";

const themes = ["light", "dark", "system"] as const;

export default function Settings() {
  const { themeColors, themePreference, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <View style={commonStyles.sectionCard}>
      <Text style={commonStyles.sectionTitle}>
        Theme
      </Text>

      <View style={styles.options}>
        {themes.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.row,
              {
                borderColor: themeColors.border,
                backgroundColor: themeColors.surface,
              },
            ]}
            onPress={() => changeTheme(option)}
          >
            <Text style={commonStyles.text}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>

            <View
              style={[
                styles.radio,
                {
                  borderColor: themeColors.border,
                },
                themePreference === option && {
                  backgroundColor: themeColors.primary,
                  borderColor: themeColors.primary,
                },
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 12,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
});