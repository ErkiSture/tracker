import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  initialName: string;
  onSave: (name: string) => void;
  onCancel: () => void;
};

export default function RenameMetricModal({
  visible,
  initialName,
  onSave,
  onCancel,
}: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={commonStyles.modalBackdrop}>
        <Pressable
          style={{ position: "absolute", inset: 0 }}
          onPress={onCancel}
        />

        <View
          style={[
            commonStyles.sectionCard,
            {
              width: "85%",
              gap: 20,
              zIndex: 1,
            },
          ]}
        >
          <Text style={commonStyles.sectionTitle}>
            Rename metric
          </Text>

          <TextInput
            style={commonStyles.textInput}
            value={name}
            onChangeText={setName}
            autoFocus
          />

          <View style={[commonStyles.row, { gap: 12 }]}>
            <Pressable
              style={[commonStyles.button, { flex: 1 }]}
              onPress={onCancel}
            >
              <Text style={commonStyles.buttonText}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={[commonStyles.button, { flex: 1 }]}
              onPress={() => onSave(name.trim())}
            >
              <Text style={commonStyles.buttonText}>
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}