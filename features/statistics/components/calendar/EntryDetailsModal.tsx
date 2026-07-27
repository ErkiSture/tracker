import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Entry } from "@/shared/types/entry";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  entry: Entry | null;
  onClose: () => void;
};

export default function EntryDetailsModal({
  entry,
  onClose,
}: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <Modal
      visible={entry !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
      >
        <Pressable
          style={[
            styles.card,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            },
          ]}
          onPress={() => {}}
        >
          {entry && (
            <>
              <Text style={[commonStyles.text, styles.title]}>
                {entry.created_at}
              </Text>

              <View style={styles.row}>
                <Text style={commonStyles.text}>Mood</Text>
                <Text style={commonStyles.text}>{entry.mood}/10</Text>
              </View>

              <View style={styles.row}>
                <Text style={commonStyles.text}>Energy</Text>
                <Text style={commonStyles.text}>{entry.energy}/10</Text>
              </View>

              <View style={styles.row}>
                <Text style={commonStyles.text}>Productivity</Text>
                <Text style={commonStyles.text}>{entry.productivity}/10</Text>
              </View>

              <Text style={[commonStyles.text, styles.commentTitle]}>
                Comment
              </Text>

              <Text style={commonStyles.text}>
                {entry.comment ?? "No comment"}
              </Text>

              <Pressable
                style={[
                  styles.closeButton,
                  { backgroundColor: themeColors.primary },
                ]}
                onPress={onClose}
              >
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </>
          )}
        </Pressable>
      </Pressable>
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
    width: "85%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  commentTitle: {
    marginTop: 12,
    fontWeight: "600",
  },

  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  closeText: {
    color: "white",
    fontWeight: "600",
  },
});