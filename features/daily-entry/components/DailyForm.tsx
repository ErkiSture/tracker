import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { useDailyEntry } from "../hooks/useDailyEntry";
import { useEntries } from "../hooks/useEntries";
import { resetDatabase } from "../storage/entryRepository";
import CommentInput from "./CommentInput";
import RatingInput from "./RatingInput";

export default function DailyForm() {
  const { theme } = useTheme();
  const styles = createCommonStyles(theme);

  const [mood, setMood] = useState<number>(5);
  const [energy, setEnergy] = useState<number>(5);
  const [productivity, setProductivity] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const { saveDailyEntry } = useDailyEntry();

  const { getAllEntries } = useEntries();

  function handleSubmit() {
    saveDailyEntry({ mood, energy, productivity, comment });
  }

  return (
    <>
      <Text style={styles.title}>How was your day?</Text>
      <RatingInput label="Mood" value={mood} onChange={setMood} />
      <RatingInput label="Energy" value={energy} onChange={setEnergy} />
      <RatingInput label="Productivity" value={productivity} onChange={setProductivity} />
      <CommentInput comment={comment} setComment={setComment} />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={getAllEntries}>
        <Text style={styles.buttonText}>log all</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={resetDatabase}>
        <Text style={styles.buttonText}>reset db</Text>
      </Pressable>
    </>
  );
}