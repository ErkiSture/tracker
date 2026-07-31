import { Entry } from "@/features/entries/types/entry";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  entry: Entry;
};

export default function EntryHistoryItem({ entry }: Props) {
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
        {entry.created_at}
      </Text>

      <Text style={commonStyles.text}>
        {entry.comment || "No comment"}
      </Text>

      <View style={styles.metrics}>
        {Object.entries(entry.metrics).map(([id, metric]) => (
          <Text
            key={id}
            style={commonStyles.text}
          >
            {metric.name}: {metric.value}/10
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },

  metrics: {
    marginTop: 8,
  },
});