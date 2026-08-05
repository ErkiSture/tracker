import EntryForm from "@/features/entries/components/EntryForm";
import useEntryActions from "@/features/entries/hooks/useEntryActions";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { Text } from "react-native";

type Props = {
  date: string;
  onSaved: () => void;
  toggleCreate: () => void;
};

export default function CreateEntryForm({
 date,
 onSaved,
 toggleCreate
}: Props){
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { saveEntry, error }= useEntryActions();

  const [comment,setComment]=useState("");
  const {metrics}=useMetrics();

  const [values,setValues]=useState(
    Object.fromEntries(
      metrics.map(m=>[m.id,5])
    )
  );

  async function submit(){
    await saveEntry({
      values,
      comment,
      date
    });

    onSaved();
  }

  return (
    <>
    <EntryForm
      title="New entry"
      values={values}
      comment={comment}
      onChangeComment={setComment}
      onChangeValue={(id,value)=>
        setValues(v=>({...v,[id]:value}))
      }
      onSubmit={submit}
      onCancel={toggleCreate}
    />
    <Text style={commonStyles.errorText}>{error?.message}</Text>
    </>
  )
  }