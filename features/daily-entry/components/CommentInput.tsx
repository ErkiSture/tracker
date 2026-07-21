import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Text, TextInput, View } from "react-native";

type Props = {
  comment: string;
  setComment: (comment: string) => void;
}

export default function CommentInput({ comment, setComment }: Props) { 
  const {themeColors} = useTheme();
  const commonStyles = createCommonStyles(themeColors);

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