import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { FlatList, Text, View } from "react-native";
import useRecentEntries from "../hooks/useRecentEntries";

export default function EntryHistory() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { entries } = useRecentEntries()

  return (
    <View style={commonStyles.sectionCard}>
      <Text style={commonStyles.sectionTitle}>
        Entry History
      </Text>

      <FlatList
        data={entries}
        scrollEnabled={false}
        keyExtractor={(entry) => entry.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.entry,
              {
                backgroundColor: themeColors.surface,
                borderColor: themeColors.border,
              },
            ]}
          >
            <Text style={commonStyles.text}>
              {item.created_at}
            </Text>

            <Text style={commonStyles.text}>
              {item.comment || "No comment"}
            </Text>

            <View>
              {Object.entries(item.metrics).map(([id, metric]) => (
                <Text
                  key={id}
                  style={commonStyles.text}
                >
                  {metric.name}: {metric.value}/10
                </Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = {
  entry: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
};