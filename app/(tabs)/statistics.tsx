import StatisticsScreen from "@/features/statistics/components/StatisticsScreen";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { ScrollView } from "react-native";

export default function Statistics() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      };
    }, [])
  );

  return (
    <>
      <ScrollView ref={scrollRef} style= {commonStyles.screenContainer}>
        <StatisticsScreen></StatisticsScreen>
      </ScrollView>
    </>
  );
}