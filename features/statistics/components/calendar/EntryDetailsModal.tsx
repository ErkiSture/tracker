import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Entry } from "@/shared/types/entry";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EditEntryForm from "./EditEntryForm";

type Props = {
  entry: Entry | null;
  setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
};

export default function EntryDetailsModal({
  entry,
  setSelectedEntry,
}: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [ isEditing, setIsEditing ] = useState<boolean>(false);

  const metricRows = [];

  if (entry) {
    for (const [metricId, metric] of Object.entries(entry.metrics)) {
      metricRows.push(
        <View key={metricId} style={commonStyles.row}>
          <Text style={commonStyles.text}>{metric.name}</Text>
          <Text style={commonStyles.text}>{metric.value}/10</Text>
        </View>
      );
    }
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function onClose() {
    setIsEditing(false);
    setSelectedEntry(null);
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
              {isEditing ? (
                <EditEntryForm entry={entry} onSaved={onClose}/>
              ) : (
                <>
                  <View style={styles.header}>
                    <Text style={[commonStyles.text, styles.title]}>
                      {entry.created_at}
                    </Text>

                    <View style={[commonStyles.row, { gap: 14 }]}>
                      <Pressable onPress={toggleEdit}>
                        <Text style={[commonStyles.text, commonStyles.textButtonText]}>Edit</Text>
                      </Pressable>

                      <Pressable>
                        <Text style={[commonStyles.text, commonStyles.textButtonText]}>Remove</Text>
                      </Pressable>
                    </View>
                  </View>

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
                </>
                )
              }

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
    maxHeight: "65%",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between"
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