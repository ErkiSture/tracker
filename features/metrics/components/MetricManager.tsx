import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMetrics } from "../contexts/metricContext";
import AddMetricForm from "./AddMetricForm";
import MetricList from "./MetricList";

export default function MetricManager() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { metrics, addMetric, removeMetric } = useMetrics();

  const [newMetric, setNewMetric] = useState("");

  async function handleAddMetric() {
    const name = newMetric.trim();

    if (!name) return;

    await addMetric(name);
    setNewMetric("");
  }

  return (
    <View style={commonStyles.sectionCard}>
      <Text style={commonStyles.sectionTitle}>Custom metrics</Text>

      <AddMetricForm
        value={newMetric}
        onChange={setNewMetric}
        onSubmit={handleAddMetric}
      />

      <MetricList
        metrics={metrics}
        onRemove={removeMetric}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});