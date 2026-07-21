import CalendarView from "@/features/statistics/components/calendar/CalendarView";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Statistics() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [calendarProps, setCalendarProps] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    metric: "mood",
  });

  return (
    <>
      <View style= {commonStyles.screenContainer}>
        <Text style= {commonStyles.title}>Stats</Text>
        <CalendarView></CalendarView>
      </View>
    </>
  );
}