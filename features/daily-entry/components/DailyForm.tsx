import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useEntries } from "@/shared/contexts/entryContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import getCurrentDateFormatted from "@/shared/util/getCurrentDateFormatted";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import CommentInput from "./CommentInput";
import RatingInput from "./RatingInput";

export default function DailyForm() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  const [comment, setComment] = useState<string>("");
  const [values, setValues] = useState<Record<number, number>>({})

  const { saveEntry } = useEntries()
  const { metrics } = useMetrics()
  
  function handleSubmit() {
    const date = getCurrentDateFormatted()
    saveEntry({values, comment}, date);
  }
  
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

  // Create rating row for each metric
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
    <View style={{
      gap: 20
    }}>
      <Text style={commonStyles.title}>How was your day?</Text>
      {ratingInputs}
      <CommentInput comment={comment} setComment={setComment} />
      <Pressable style={commonStyles.button} onPress={handleSubmit}>
        <Text style={commonStyles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}