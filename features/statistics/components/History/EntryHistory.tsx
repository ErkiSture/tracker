import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import useRecentEntries from "../../hooks/useRecentEntries";
import EntryHistoryItem from "./EntryHistoryItem";

export default function EntryHistory() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [ entriesAmount, setEntriesAmount ] = useState<number>(1);

  const recentEntries = useRecentEntries(entriesAmount);

  if (recentEntries.length === 0) return null;

  function loadMore(){
    setEntriesAmount(entriesAmount + 3);
  }  
  
  useFocusEffect(
    useCallback(() => {
      return () => {
        setEntriesAmount(1);
      };
    }, [])
  );

  return (
    <View style={commonStyles.sectionCard}>
      <Text style={commonStyles.sectionTitle}>Entry History</Text>
      <View>
        {recentEntries.map(entry => (
          <EntryHistoryItem
            key={entry.id}
            entry={entry}
          />
        ))}
      </View>
      <Pressable style={commonStyles.button} onPress={loadMore}>
        <Text style={commonStyles.buttonText}>Load more</Text>
      </Pressable>
    </View>
  );
}