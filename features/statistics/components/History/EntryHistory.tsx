import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { FlatList, Text, View } from "react-native";
import useRecentEntries from "../../hooks/useRecentEntries";
import EntryHistoryItem from "./EntryHistoryItem";

export default function EntryHistory() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const recentEntries = useRecentEntries(10);

  return (
    <View style={commonStyles.sectionCard}>
      <Text style={commonStyles.sectionTitle}>Entry History</Text>
      <FlatList
        data={recentEntries}
        scrollEnabled={false}
        keyExtractor={(entry) => entry.id.toString()}
        renderItem={({ item }) => (
          <EntryHistoryItem entry={item} />
        )}
      />
    </View>
  );
}