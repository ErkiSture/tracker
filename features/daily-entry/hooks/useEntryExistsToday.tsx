import { useEntries } from "@/shared/contexts/entryContext";
import { useEffect, useState } from "react";

export default function useEntryExistsDate(date: string): boolean {
  const { entries, checkEntryExistsByDate } = useEntries();
  const [ entryExists, setEntryExists ] = useState<boolean>(false);

  useEffect(() => {
    async function check() {
      const exists = await checkEntryExistsByDate(date);
      setEntryExists(exists);
    }
    check();
  }, [entries])

  return entryExists
}