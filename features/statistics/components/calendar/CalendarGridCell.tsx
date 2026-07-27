import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Metric } from "@/shared/types/metric";
import { Pressable, StyleSheet, Text, View } from "react-native";
import getCellColor from "../../utils/getCellColor";

type Props = {
  key: number,
  rating: number | null,
  metric: Metric
  onPress: () => void;
}

export default function CalendarGridCell({key, rating, metric, onPress}: Props) {
  const { themeColors, themePreference } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const color: string = getCellColor(rating, themeColors, metric);

  return(
    <Pressable onPress={onPress}>
      <View style={[
        styles.cell,
        { backgroundColor: color }
      ]}>
        <Text style={commonStyles.text}>{rating}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: "lightgray",
    width: 40,
    height: 40,
  }
});