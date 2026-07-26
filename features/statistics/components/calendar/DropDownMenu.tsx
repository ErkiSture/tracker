import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props<T extends string> = {
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
};

export default function DropDownMenu<T extends string>({
  options,
  selected,
  onSelect,
}: Props<T>) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.selected}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={commonStyles.text}>
          {selected}
        </Text>
      </Pressable>

      {open && (
        <View
          style={[
            styles.menu,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            },
          ]}
        >
          {options.map((option, index) => (
            <Pressable
              key={index}
              style={styles.option}
              onPress={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              <Text style={commonStyles.text}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 10,
  },

  selected: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },

  menu: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 20,
    elevation: 5,
  },

  option: {
    padding: 12,
  },
});