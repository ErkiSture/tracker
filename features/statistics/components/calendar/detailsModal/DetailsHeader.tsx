import { Entry } from "@/features/entries/types/entry";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, Text, View } from "react-native";

type Props = {
  entry: Entry
  toggleEdit: () => void
  setShowConfirm: (value: boolean) => void
}

export default function DetailsHeader({ entry, toggleEdit, setShowConfirm }: Props) {
  const { themeColors } = useTheme()
  const commonStyles = createCommonStyles(themeColors);

  return (
    <View style={[commonStyles.row, { justifyContent: "space-between", alignItems: "center"}]}>
      <Text style={commonStyles.sectionTitle}>
        {entry.created_at}
      </Text>

      <View style={[commonStyles.row,{ gap: 14 }]}>
        <Pressable onPress={toggleEdit}>
          <Text
            style={[
              commonStyles.text,
              commonStyles.textButtonText,
            ]}
          >
            Edit
          </Text>
        </Pressable>

        <Pressable onPress={() => setShowConfirm(true)}>
          <Text
            style={[
              commonStyles.text,
              commonStyles.textButtonText,
            ]}
          >
            Remove
          </Text>
        </Pressable>
      </View>
    </View>
  )
}