import { createCommonStyles } from "@/shared/styles/common";
import { useTheme } from "@react-navigation/native";
import { Text, TextInput, View } from "react-native";

type Props = {
  comment: string;
  setComment: (comment: string) => void;
}

export default function CommentInput({ comment, setComment }: Props) { 
  const theme = useTheme();
  const commonStyles = createCommonStyles(theme);

  return (
    <View>
      <Text>Comment:</Text>
      <TextInput 
        style={commonStyles.textInput} 
        placeholder="Enter your comment..." 
        onChangeText={(text) => setComment(text)}
      />
    </View>
  )
}