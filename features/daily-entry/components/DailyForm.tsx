import { useMetrics } from "@/shared/contexts/metricContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { seedEntries } from "@/shared/database/seedEntries";
import { createCommonStyles } from "@/shared/styles/common";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { resetDatabase } from "../../../shared/repositories/entryRepository";
import { useDailyEntry } from "../hooks/useDailyEntry";
import { useEntries } from "../hooks/useEntries";
import CommentInput from "./CommentInput";
import RatingInput from "./RatingInput";

export default function DailyForm() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  const [comment, setComment] = useState<string>("");

  const { saveDailyEntry } = useDailyEntry();

  const { getAllEntries } = useEntries();
  
  function handleSubmit() {
    saveDailyEntry({values, comment});
  }
  
  const { metrics } = useMetrics()
  
  const [values, setValues] = useState<Record<number, number>>({})

  // Default ratings to 5 
  useEffect(() => {
    if (metrics.length === 0) return;

    setValues(
      Object.fromEntries(
        metrics.map(metric => [metric.id, 5])
      )
    )
  }, [metrics])

  function updateValue(metricId: number, value: number) {
    setValues(prev => ({
      ...prev,
      [metricId]: value
    }));
  }

  const ratingInputs = []
  for (let i = 0; i < metrics.length; i++) {

    const metricId = metrics[i].id
    const metricName = metrics[i].name
    const value = values[metricId]

    ratingInputs.push(
      <RatingInput
        key={metricId}
        label={metricName}
        value={value}
        onChange={(newValue) => updateValue(metricId, newValue)}
      />
    )
  }

  return (
    <>
      <Text style={commonStyles.title}>How was your day?</Text>
      {ratingInputs}
      <CommentInput comment={comment} setComment={setComment} />
      <Pressable style={commonStyles.button} onPress={handleSubmit}>
        <Text style={commonStyles.buttonText}>Save</Text>
      </Pressable>
      <Pressable style={commonStyles.button} onPress={getAllEntries}>
        <Text style={commonStyles.buttonText}>log all</Text>
      </Pressable>
      <Pressable style={commonStyles.button} onPress={resetDatabase}>
        <Text style={commonStyles.buttonText}>reset db</Text>
      </Pressable>
      <Pressable style={commonStyles.button} onPress={seedEntries}>
        <Text style={commonStyles.buttonText}>Seed database</Text>
      </Pressable>
      {/* <Pressable style={commonStyles.button} onPress={() => getMonthEntries(2026, 7)}>
        <Text style={commonStyles.buttonText}>test</Text>
      </Pressable> */}
    </>
  );
}