import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { monthNames } from "@/shared/types/month";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  month: number;
  year: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

export default function CalendarHeader({
  month,
  year,
  onPreviousMonth,
  onNextMonth,
}: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.arrow}
        onPress={onPreviousMonth}
      >
        <Text style={commonStyles.text}>‹</Text>
      </Pressable>

      <Text style={[commonStyles.text, styles.title]}>
        {monthNames[month - 1]} {year}
      </Text>

      <Pressable
        style={styles.arrow}
        onPress={onNextMonth}
      >
        <Text style={commonStyles.text}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
  },

  arrow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});