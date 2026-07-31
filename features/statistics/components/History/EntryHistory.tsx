import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import useRecentEntries from "../../hooks/useRecentEntries";
import EntryHistoryItem from "./EntryHistoryItem";

const LOAD_AMOUNT = 5
const BASE_LOADED_AMOUNT = 5

export default function EntryHistory() {
  console.log("EntryHistory render");
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [ entriesAmount, setEntriesAmount ] = useState<number>(BASE_LOADED_AMOUNT);
  const { recentEntries, loading } = useRecentEntries(entriesAmount);

  function loadMore(){
    setEntriesAmount(entriesAmount + LOAD_AMOUNT);
  }  
  
  // Don't want to keep great numbers of entries rendered when leaving screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        setEntriesAmount(BASE_LOADED_AMOUNT);
        setLoadedAll(false);
      };
    }, [])
  );

  const [ loadedAll, setLoadedAll ] = useState<boolean>(false);

  useEffect(() => {
    if ((recentEntries.length !== 0) && (recentEntries.length < entriesAmount) && !loading) {
      setLoadedAll(true);
    }
  }, [loading])

  if (recentEntries.length === 0) return null;
  
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

      {!loadedAll && (
        <Pressable
          style={commonStyles.button}
          onPress={loadMore}
        >
          <Text style={commonStyles.buttonText}>
            Load more
          </Text>
        </Pressable>
      )}
    </View>
  );
}