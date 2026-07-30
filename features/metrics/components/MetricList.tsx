import { StyleSheet, View } from "react-native";
import { Metric } from "../types/metric";
import MetricItem from "./MetricItem";

type Props = {
  metrics: Metric[];
  onRemove: (id: number) => Promise<void>;
};

export default function MetricList({ metrics, onRemove }: Props) {
  return (
    <View style={styles.container}>
      {metrics.map((metric) => (
        <MetricItem
          key={metric.id}
          metric={metric}
          onRemove={onRemove}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});