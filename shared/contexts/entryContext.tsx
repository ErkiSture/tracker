import * as entryService from "@/shared/services/entryService";
import { createContext, useContext, useState } from "react";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";

type EntryContextType = {
  entries: Record<string, Entry>
  saveEntry: (entry: CreateEntry) => Promise<void>
  removeEntry: (id: number) => Promise<void>
  resetEntries: () => void
  ensureMonthLoaded: (year: number, month: number) => Promise<void>
  ensureRecentLoaded: (amount: number) => Promise<void>
}

const entryContext = createContext<EntryContextType>({
  entries: {},
  saveEntry: async () => {},
  removeEntry: async () => {},
  resetEntries: () => {},
  ensureMonthLoaded: async () => {},
  ensureRecentLoaded: async () => {}
})

export default function EntryProvider({ children }: { children: React.ReactNode}) {

  const [ entries, setEntries ] = useState<Record<string, Entry>>({})
  const [ loadedMonths, setLoadedMonths ] = useState<Set<string>>(new Set());
  const [ recentLoaded, setRecentLoaded ] = useState(0);

  function getMonthKey(year: number, month: number) {
    return `${year}-${String(month).padStart(2, "0")}`;
  }

  const addEntriesToState = (newEntries: Entry[]) => {
    setEntries(prev => ({
      ...prev,
      ...Object.fromEntries(
        newEntries.map(entry => [
          entry.created_at,
          entry
        ])
      ),
    }));
  };

  function resetEntries() {
    setLoadedMonths(new Set());
    setRecentLoaded(0);
    setEntries({});
  }

  async function removeEntry(id: number) {
    await entryService.removeEntry(id)
  }

  async function saveEntry(entry: CreateEntry) {
    const savedEntry = await entryService.saveEntry(entry);

    // console.log(savedEntry);
    addEntriesToState([savedEntry]);
  }

  async function ensureMonthLoaded(year: number, month: number) {
    const start = performance.now();
    const monthKey = getMonthKey(year, month);

    // Already loaded, don't query again
    if (loadedMonths.has(monthKey)) {
      return;
    }

    const entries = await entryService.getMonthEntries(year, month);

    addEntriesToState(entries);

    setLoadedMonths(prev => {
      const updated = new Set(prev);
      updated.add(monthKey);
      return updated;
    });

    const end = performance.now();
    console.log(`ensureMonthLoaded took ${end - start} ms`);
  }

  async function ensureRecentLoaded(amount: number) {
    if (recentLoaded >= amount) {
      return;
    }

    const fetched = await entryService.getRecentEntries(amount);

    addEntriesToState(fetched);

    setRecentLoaded(fetched.length)
  }

  return (
    <entryContext.Provider value={{ entries, saveEntry, removeEntry, ensureMonthLoaded, ensureRecentLoaded, resetEntries }}>
      {children}
    </entryContext.Provider>
  )
}

export const useEntries = () => useContext(entryContext);