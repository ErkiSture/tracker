import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMetrics } from "../contexts/metricContext";
import useMetricActions from "../hooks/useMetricActions";
import AddMetricForm from "./AddMetricForm";
import MetricList from "./MetricList";

export default function MetricManager() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { activeMetrics, inactiveMetrics } = useMetrics();
  const { createMetric, error } = useMetricActions();

  const [newMetric, setNewMetric] = useState("");

  async function handleAddMetric() {
    const name = newMetric.trim();

    if (!name) return;

    await createMetric(name);
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
      {error?.message && (
        <Text style={commonStyles.errorText}>
          {error.message}
        </Text>
      )}

      <Text style={commonStyles.sectionTitle}>Active metrics</Text>
      <MetricList
        metrics={activeMetrics}
      />
      
      <Text style={commonStyles.sectionTitle}>Inactive metrics</Text>
      <MetricList
        metrics={inactiveMetrics}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});