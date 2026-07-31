import CommentInput from "@/features/daily-entry/components/CommentInput";
import RatingInput from "@/features/daily-entry/components/RatingInput";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  values: Record<number, number>;
  comment: string;
  buttonText?: string;
  onChangeValue: (id:number, value:number)=>void;
  onChangeComment: (value:string)=>void;
  onSubmit: ()=>void;
  onCancel?: ()=>void;
};

export default function EntryForm({
  title,
  values,
  comment,
  onChangeValue,
  onChangeComment,
  onSubmit,
  onCancel
}: Props) {

  const { metrics } = useMetrics();
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <View style={{gap:20}}>

      <View style={[
        commonStyles.row,
        {justifyContent:"space-between"}
      ]}>
        <Text style={commonStyles.sectionTitle}>
          {title}
        </Text>

        {onCancel && (
          <Pressable onPress={onCancel}>
            <Text style={[commonStyles.textButtonText, commonStyles.text]}>
              Cancel
            </Text>
          </Pressable>
        )}
      </View>


      {metrics.map(metric => (
        <RatingInput
          key={metric.id}
          label={metric.name}
          value={values[metric.id] ?? 5}
          onChange={(value)=>
            onChangeValue(metric.id,value)
          }
          size={23}
        />
      ))}


      <CommentInput
        comment={comment}
        setComment={onChangeComment}
      />


      <Pressable
        style={commonStyles.button}
        onPress={onSubmit}
      >
        <Text style={commonStyles.buttonText}>
          Save
        </Text>
      </Pressable>

    </View>
  );
}