import CreateEntryForm from "@/features/entries/components/CreateEntryForm";
import EditEntryForm from "@/features/entries/components/EditEntryForm";
import useEntryActions from "@/features/entries/hooks/useEntryActions";
import { Entry } from "@/features/entries/types/entry";
import ConfirmModal from "@/shared/components/confirmModal";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DetailsHeader from "./DetailsHeader";

type Props = {
  entry: Entry | null;
  setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void
  date: string
};

export default function DetailsModal({
  entry,
  setSelectedEntry,
  showDetails,
  setShowDetails,
  date
}: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { removeEntry, error, setError } = useEntryActions();

  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ isCreating, setIsCreating ] = useState<boolean>(false)
  const [ showConfirm, setShowConfirm ] = useState<boolean>(false);

  function toggleEdit() {
    setIsEditing(prev => !prev);
  }
  
  function toggleCreate() {
    setIsCreating(prev => !prev);
  }
  
  function onClose() {
    setIsEditing(false);
    setIsCreating(false);
    setSelectedEntry(null);
    setShowDetails(false);
    setError(null);
  }
  
  async function handleRemove() {
    if (!entry) return;
    
    await removeEntry(entry);
    
    setShowConfirm(false);
    onClose();
  }

  const metricRows = [];

  if (entry) {
    for (const [metricId, metric] of Object.entries(entry.metrics)) {
      metricRows.push(
        <View key={metricId} style={commonStyles.row}>
          <Text style={commonStyles.text}>
            {metric.name}
          </Text>

          <Text style={commonStyles.text}>
            {metric.value}/10
          </Text>
        </View>
      );
    }
  }
  
  return (
    <>
      <Modal
        visible={showDetails}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={commonStyles.modalBackdrop}>
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
                  <EditEntryForm
                    entry={entry}
                    onSaved={onClose}
                    toggleEdit={toggleEdit}
                  />
                ) : (
                  <>
                    <DetailsHeader entry={entry} toggleEdit={toggleEdit} setShowConfirm={setShowConfirm}></DetailsHeader>
                    {metricRows}
                    <Text style={[commonStyles.text, styles.commentTitle]}>Comment</Text>
                    <Text style={commonStyles.text}>{entry.comment || "No comment"}</Text>
                    <Pressable
                      style={[
                        styles.closeButton,
                        {
                          backgroundColor:
                            themeColors.primary,
                        },
                      ]}
                      onPress={onClose}
                    >
                      <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                  </>
                )}
              </ScrollView>
            )}

            {!entry && (

              <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator
              >
                <>
                  {isCreating ? (
                    <CreateEntryForm date={date} onSaved={onClose} toggleCreate={toggleCreate}/>
                  ) : (
                    <>
                      <View style={[commonStyles.row, { justifyContent: "space-between", alignItems: "center"}]}>
                        <Text style={commonStyles.sectionTitle}>
                          {date}
                        </Text>
                      </View>
                      <Text>No entry has been saved this date</Text>
                      <Pressable onPress={toggleCreate}>
                        <Text
                          style={[
                            commonStyles.text,
                            commonStyles.textButtonText,
                          ]}
                        >
                          Create entry
                        </Text>
                      </Pressable>
                    </>
                  )}
                </>
              </ScrollView>

            )}

          </View>
        </View>
      </Modal>

      <ConfirmModal
        visible={showConfirm}
        title="Delete entry?"
        message="Are you sure you want to delete this entry? This cannot be undone."
        confirmText="Delete"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleRemove}
        error={error}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "85%",
    maxHeight: "65%",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  content: {
    padding: 20,
    gap: 12,
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