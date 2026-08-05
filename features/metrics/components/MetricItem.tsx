import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { StyleSheet, Text, View } from "react-native";
import { Metric } from "../types/metric";
import MetricOptionsMenu from "./MetricOptionsMenu";

type Props = {
  metric: Metric;
};

export default function MetricItem({ metric }: Props) {
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

      <MetricOptionsMenu
        metric={metric}
        id={metric.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});