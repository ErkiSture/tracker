import { View } from "react-native";
import CalendarGrid from "./CalendarGrid";

export default function CalendarView() {
  return (
    <View>
      <CalendarGrid month={7} year={2026} metric={"mood"}></CalendarGrid>
    </View>
  )
}