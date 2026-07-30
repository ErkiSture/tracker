import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  size: number
};

export default function RatingInput({
  label,
  value,
  onChange,
  size
}: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <View>
      <Text style={commonStyles.text}>{label}: {value}/10</Text>
      <View style={styles.row}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
          <Pressable
            key={number}
            onPress={() => onChange(number)}
            style={[
              styles.number,
              { 
                borderColor: themeColors.border,
                width: size,
                height: size
              },
              value === number && { backgroundColor: themeColors.primary },
            ]}
          >
            <Text style={commonStyles.text}>{number}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },

  number: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
  },
  selected: {
    backgroundColor: "black",
  },
});