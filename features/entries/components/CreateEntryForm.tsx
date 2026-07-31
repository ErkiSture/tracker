import EntryForm from "@/features/entries/components/EntryForm";
import useEntryActions from "@/features/entries/hooks/useEntryActions";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useState } from "react";

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

 const {saveEntry}=useEntryActions();

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
 )
}