import { Metric } from "@/features/metrics/types/metric";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  selectedMetric: Metric
  setSelectedMetric: (metric: Metric) => void;
}

export default function CalendarMetricSelector({ selectedMetric, setSelectedMetric }: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [open, setOpen] = useState(false);

  const options: Metric[] = [
    "mood",
    "energy",
    "productivity",
  ];

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.selected}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={commonStyles.text}>
          {selectedMetric}
        </Text>
      </Pressable>

      {open && (
        <View
          style={[
            styles.menu,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            },
          ]}
        >
          {options.map((metric) => (
            <Pressable
              key={metric}
              style={styles.option}
              onPress={() => {
                setSelectedMetric(metric);
                setOpen(false);
              }}
            >
              <Text style={commonStyles.text}>
                {metric}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 10,
  },

  selected: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },

  menu: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 20,
    elevation: 5, // Android shadow/layering
  },

  option: {
    padding: 12,
  },
});