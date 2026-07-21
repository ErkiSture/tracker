import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Metric } from "@/shared/types/metric";
import { StyleSheet, Text, View } from "react-native";
import getColor from "../../utils/getColor";

type Props = {
  key: number,
  rating: number | null,
  metric: Metric
}

export default function CalendarGridCell({key, rating, metric}: Props) {
  const { theme, preference } = useTheme();
  const commonStyles = createCommonStyles(theme);

  const color: string = getColor(rating, theme, metric);
  console.log(color)

  return(
    <View style={[
      styles.cell,
      { backgroundColor: color }
    ]}>
      <Text style={commonStyles.text}>{rating}</Text>
    </View>
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