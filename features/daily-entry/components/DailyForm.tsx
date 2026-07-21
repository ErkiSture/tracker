import { useTheme } from "@/shared/contexts/themeContext";
import { seedEntries } from "@/shared/database/seedEntries";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { resetDatabase } from "../../../shared/storage/entryRepository";
import { useDailyEntry } from "../hooks/useDailyEntry";
import { useEntries } from "../hooks/useEntries";
import CommentInput from "./CommentInput";
import RatingInput from "./RatingInput";

export default function DailyForm() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

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
      <Text style={commonStyles.title}>How was your day?</Text>
      <RatingInput label="Mood" value={mood} onChange={setMood} />
      <RatingInput label="Energy" value={energy} onChange={setEnergy} />
      <RatingInput label="Productivity" value={productivity} onChange={setProductivity} />
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
    </>
  );
}