import ConfirmModal from "@/shared/components/confirmModal";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMetrics } from "../contexts/metricContext";
import { Metric } from "../types/metric";

type Props = {
  metric: Metric;
  id: number
};

export default function MetricItem({ metric, id }: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [ showConfirm, setShowConfirm ] = useState<boolean>(false);

  const { removeMetric, toggleMetricStatus } = useMetrics()

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
      
      <View style={{flexDirection: "row", gap: 22}}>
        <Pressable onPress={() => setShowConfirm(true)}>
          <Text style={styles.remove}>Remove</Text>
        </Pressable>

        <Pressable onPress={() => {toggleMetricStatus(id)}}>
          <Text style={commonStyles.text}>
            {metric.status === 'active' ? 'Deactivate' : 'Activate'}
          </Text>
        </Pressable>
      </View>

      <ConfirmModal
        visible={showConfirm}
        title="Remove metric?"
        message="This action cannot be undone."
        confirmText="Remove"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          removeMetric(id);
          setShowConfirm(false);
        }}
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
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 10,
  },

  remove: {
    color: "#d32f2f",
    fontWeight: "600",
  },
});