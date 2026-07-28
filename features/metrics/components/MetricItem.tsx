import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Metric } from "../types/metric";

type Props = {
  metric: Metric;
  onRemove: (id: number) => Promise<void>;
};

export default function MetricItem({ metric, onRemove }: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        },
      ]}
    >
      <Text style={commonStyles.text}>
        {metric.name}
      </Text>

      <Pressable onPress={() => onRemove(metric.id)}>
        <Text style={styles.remove}>Remove</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 10,
  },

  remove: {
    color: "#d32f2f",
    fontWeight: "600",
  },
});