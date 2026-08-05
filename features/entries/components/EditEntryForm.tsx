// features/entries/components/EditEntryForm.tsx

import EntryForm from "@/features/entries/components/EntryForm";
import useEntryActions from "@/features/entries/hooks/useEntryActions";
import { Entry } from "@/features/entries/types/entry";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useState } from "react";

type Props = {
  entry: Entry;
  onSaved: () => void;
  toggleEdit: () => void;
};

export default function EditEntryForm({
  entry,
  onSaved,
  toggleEdit,
}: Props) {
  const { updateEntry } = useEntryActions();
  const { activeMetrics } = useMetrics();

  const [comment, setComment] = useState(entry.comment);

  const [values, setValues] = useState<Record<number, number>>(() =>
    Object.fromEntries(
      activeMetrics.map(metric => [
        metric.id,
        entry.metrics[metric.id]?.value ?? 5,
      ])
    )
  );

  function updateValue(metricId: number, value: number) {
    setValues(prev => ({
      ...prev,
      [metricId]: value,
    }));
  }

  async function handleSubmit() {
    await updateEntry(entry.id, {
      values,
      comment,
      date: entry.created_at,
    });

    onSaved();
  }

  return (
    <EntryForm
      title="Edit entry"
      values={values}
      comment={comment}
      onChangeValue={updateValue}
      onChangeComment={setComment}
      onSubmit={handleSubmit}
      onCancel={toggleEdit}
    />
  );
}