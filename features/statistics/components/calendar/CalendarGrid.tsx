import { createCommonStyles } from "@/shared/styles/common";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";


type Props = {
  month: number;
  year: number;
  metric: string;
}

export default function CalendarGrid({ month, year, metric }: Props) {
  const theme = useTheme();
  const commonStyles = createCommonStyles(theme);

  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = 0; i < daysInMonth; i++) {
    cells.push(
      <View key={i} style={styles.cell}>
        <Text style={commonStyles.text}>{i + 1}</Text>
      </View>
    );
  }

  return (
    <View style={styles.grid}>
      {cells}
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: "lightgray",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  }
});