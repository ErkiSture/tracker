import * as entryService from "@/shared/services/entryService";
import { Entry } from "@/shared/types/entry";
import { useEffect, useState } from "react";

export default function useRecentEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    async function load() {
      const result = await entryService.getRecentEntries(10);
      setEntries(result);
    }

    load();
  }, []);

  return { entries };
}