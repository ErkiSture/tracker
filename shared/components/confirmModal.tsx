import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onCancel}
        />

        <View
          style={[
            styles.card,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={commonStyles.title}>
            {title}
          </Text>

          <Text style={commonStyles.text}>
            {message}
          </Text>

          <View style={[commonStyles.row, styles.buttons]}>
            <Pressable
              style={[
                commonStyles.button,
                styles.button,
              ]}
              onPress={onCancel}
            >
              <Text style={commonStyles.buttonText}>
                {cancelText}
              </Text>
            </Pressable>

            <Pressable
              style={[
                commonStyles.button,
                styles.button,
                styles.danger,
              ]}
              onPress={onConfirm}
            >
              <Text style={commonStyles.buttonText}>
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  card: {
    width: "80%",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },

  buttons: {
    gap: 12,
    marginTop: 10,
  },

  button: {
    flex: 1,
  },

  danger: {
    backgroundColor: "#d32f2f",
  },
});