import StatisticsScreen from "@/features/statistics/components/StatisticsScreen";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { View } from "react-native";

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
        <StatisticsScreen></StatisticsScreen>
      </View>
    </>
  );
}