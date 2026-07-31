import { StyleSheet, View } from "react-native";
import { Metric } from "../types/metric";
import MetricItem from "./MetricItem";

type Props = {
  metrics: Metric[];
};

export default function MetricList({ metrics }: Props) {
  return (
    <View style={styles.container}>
      {metrics.map((metric) => (
        <MetricItem
          key={metric.id}
          id={metric.id}
          metric={metric}
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