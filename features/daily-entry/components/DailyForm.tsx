import useEntryActions from "@/features/entries/hooks/useEntryActions";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import getCurrentDateFormatted from "@/shared/utils/getTodayDate";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import useEntryExistsDate from "../hooks/useEntryExistsToday";
import CommentInput from "./CommentInput";
import DailyCompleted from "./DailyCompleted";
import RatingInput from "./RatingInput";

export default function DailyForm() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  const [ comment, setComment ] = useState<string>("");
  const [ values, setValues ] = useState<Record<number, number>>({})
  
  const date = getCurrentDateFormatted();

  const { saveEntry, error } = useEntryActions();
  const entryAlreadyExistsForToday = useEntryExistsDate(date)
  const { activeMetrics } = useMetrics();
  
  function handleSubmit() {
    saveEntry({values, comment, date});
  }
  
  // Default ratings to 5 
  useEffect(() => {
    if (activeMetrics.length === 0) return;

    setValues(
      Object.fromEntries(
        activeMetrics.map(metric => [metric.id, 5])
      )
    );
  }, [activeMetrics])

  function updateValue(metricId: number, value: number) {
    setValues(prev => ({
      ...prev,
      [metricId]: value
    }));
  }

  // Create rating row for each metric
  const ratingInputs = []
  for (let i = 0; i < activeMetrics.length; i++) {

    const metricId = activeMetrics[i].id
    const metricName = activeMetrics[i].name
    const value = values[metricId]

    ratingInputs.push(
      <RatingInput
        key={metricId}
        label={metricName}
        value={value}
        onChange={(newValue) => updateValue(metricId, newValue)}
        size={30}
      />
    )
  }

  return (
    <>
      { entryAlreadyExistsForToday ? (
        <DailyCompleted/>
      ) : (
        <View style={{
          gap: 20
        }}>
          <Text style={commonStyles.title}>How was your day?</Text>
            {ratingInputs}
          <CommentInput comment={comment} setComment={setComment} />
          <Pressable style={commonStyles.button} onPress={handleSubmit}>
            <Text style={commonStyles.buttonText}>Save</Text>
          </Pressable>
          {error !== null && (<Text style={commonStyles.errorText}>{error.message}</Text>)}
        </View>
      )}
    </>
  );
}