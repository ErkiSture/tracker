import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useDailyEntry } from "../hooks/useDailyEntry";
import { useEntries } from "../hooks/useEntries";
import RatingInput from "./RatingInput";

export default function DailyForm() {
  const [mood, setMood] = useState<number>(5);
  const [energy, setEnergy] = useState<number>(5);
  const [productivity, setProductivity] = useState<number>(5);

  const { saveDailyEntry } = useDailyEntry();

  const { getAllEntries } = useEntries();

  function handleSubmit() {
    saveDailyEntry({ mood, energy, productivity });
  }

  return (
    <>
      <Text style={styles.text}>How was your day?</Text>
      <RatingInput label="Mood" value={mood} onChange={setMood} />
      <RatingInput label="Energy" value={energy} onChange={setEnergy} />
      <RatingInput label="Productivity" value={productivity} onChange={setProductivity} />
      <Pressable style={styles.saveButton} onPress={handleSubmit}>
        <Text>Save</Text>
      </Pressable>
      <Pressable style={styles.saveButton} onPress={getAllEntries}>
        <Text>log all</Text>
      </Pressable>

    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#ffd33d',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  }
})
