import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import useRecentEntries from "../../hooks/useRecentEntries";
import EntryHistoryItem from "./EntryHistoryItem";

export default function EntryHistory() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [ entriesAmount, setEntriesAmount ] = useState<number>(1);

  const recentEntries = useRecentEntries(entriesAmount);

  if (recentEntries.length === 0) return null;

  function loadMore(){
    setEntriesAmount(entriesAmount + 100);
  }
 
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
      <Pressable style={commonStyles.button} onPress={loadMore}>
        <Text style={commonStyles.buttonText}>Load more</Text>
      </Pressable>
    </View>
  );
}