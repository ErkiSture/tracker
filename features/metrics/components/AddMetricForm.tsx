import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => Promise<void>;
};

export default function AddMetricForm({
  value,
  onChange,
  onSubmit,
}: Props) {
const { themeColors } = useTheme();
const commonStyles = createCommonStyles(themeColors);

return (
  <View style={styles.container}>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Metric name"
      placeholderTextColor={themeColors.border}
      style={[commonStyles.textInput, styles.input]}
    />

    <Pressable
      onPress={onSubmit}
      style={[commonStyles.button, styles.button]}
    >
      <Text style={commonStyles.buttonText}>Add</Text>
    </Pressable>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  input: {
    flex: 1,
    marginBottom: 0,
  },

  button: {
    marginTop: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});