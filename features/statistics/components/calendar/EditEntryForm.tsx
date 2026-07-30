import CommentInput from "@/features/daily-entry/components/CommentInput";
import RatingInput from "@/features/daily-entry/components/RatingInput";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useEntries } from "@/shared/contexts/entryContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Entry } from "@/shared/types/entry";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  entry: Entry;
  onSaved: () => void;
};

export default function EditEntryForm({ entry, onSaved }: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { removeEntry, saveEntry } = useEntries();
  const { metrics } = useMetrics();

  const [comment, setComment] = useState(entry.comment ?? "");

  const [values, setValues] = useState<Record<number, number>>(() => {
    return Object.fromEntries(
      metrics.map(metric => [
        metric.id,
        entry.metrics[metric.id]?.value ?? 5
      ])
    );
  });  
  
  async function handleSubmit() {
    await removeEntry(entry.id);

    await saveEntry(
      {
        values,
        comment,
        date: entry.created_at
      },
    );

    onSaved();
  }

  function updateValue(metricId: number, value: number) {
    setValues(prev => ({
      ...prev,
      [metricId]: value,
    }));
  }

  const ratingInputs = metrics.map(metric => (
    <RatingInput
      key={metric.id}
      label={metric.name}
      value={values[metric.id] ?? 5}
      onChange={(newValue) =>
        updateValue(metric.id, newValue)
      }
      size={23}
    />
  ));

  return (
    <View style={[{ gap: 20 }]}>
      <Text style={commonStyles.title}>
        Edit entry
      </Text>

      {ratingInputs}

      <CommentInput
        comment={comment}
        setComment={setComment}
      />

      <Pressable
        style={commonStyles.button}
        onPress={handleSubmit}
      >
        <Text style={commonStyles.buttonText}>
          Save
        </Text>
      </Pressable>
    </View>
  );
}