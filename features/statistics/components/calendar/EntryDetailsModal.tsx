import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Entry } from "@/shared/types/entry";
import {
  Modal,
  Pressable,
  ScrollView,
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

  const metricRows = [];

  if (entry) {
    for (const [metricId, metric] of Object.entries(entry.metrics)) {
      metricRows.push(
        <View key={metricId} style={styles.row}>
          <Text style={commonStyles.text}>{metric.name}</Text>
          <Text style={commonStyles.text}>{metric.value}/10</Text>
        </View>
      );
    }
  }

  return (
    <Modal
      visible={entry !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
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
          {entry && (
            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator
            >
              <Text style={[commonStyles.text, styles.title]}>
                {entry.created_at}
              </Text>

              {metricRows}

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
            </ScrollView>
          )}
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
    width: "85%",
    maxHeight: "70%",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  content: {
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