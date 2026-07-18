import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function RatingInput({
  label,
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Text>{label}: {value}/10</Text>
      <View style={styles.row}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
          <Pressable
            key={number}
            onPress={() => onChange(number)}
            style={[
              styles.number,
              value === number && styles.selected,
            ]}
          >
            <Text>{number}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },

  number: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
  },

  selected: {
    backgroundColor: "black",
  },
});