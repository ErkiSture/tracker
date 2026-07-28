import * as entryService from "@/shared/services/entryService";
import { createContext, useContext, useEffect, useState } from "react";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";


type EntryContextType = {
  entries: Entry[]
  saveEntry: (entry: CreateEntry, date: string) => Promise<void>
  removeEntry: (id: number) => Promise<void>
}

const entryContext = createContext<EntryContextType>({
  entries: [],
  saveEntry: async () => {},
  removeEntry: async () => {},
})

export default function EntryProvider({ children }: { children: React.ReactNode}) {

  const [ entries, setEntries ] = useState<Entry[]>([])

  async function loadEntries() {
    const entries = await entryService.getRecentEntries(1000);
    setEntries(entries);
  }

  useEffect(() => {
    loadEntries();
  }, [])

  async function removeEntry(id: number) {
    await entryService.removeEntry(id)
  }

  async function saveEntry(entry: CreateEntry, date: string) {
    await entryService.saveEntry(entry, date);
    loadEntries();
  }

  // async function updateEntry(entry: CreateEntry) {
  //   await entryService.updateEntry();
  // }

  return (
    <entryContext.Provider value={{ entries, saveEntry, removeEntry, loadEntries }}>
      {children}
    </entryContext.Provider>
  )
}

export const useEntries = () => useContext(entryContext);