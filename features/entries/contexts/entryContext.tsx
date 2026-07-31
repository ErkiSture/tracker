import * as entryService from "@/features/entries/services/entryService";
import { createContext, useContext, useMemo, useState } from "react";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";

type EntryContextType = {
  entries: Record<string, Entry>
  saveEntry: (entry: CreateEntry) => Promise<void>
  removeEntry: (entry: Entry) => Promise<void>
  updateEntry: (id: number, entry: CreateEntry) => Promise<void>
  resetEntries: () => void
  ensureMonthLoaded: (year: number, month: number) => Promise<void>
  ensureRecentLoaded: (amount: number) => Promise<void>
  checkEntryExistsByDate: (date: string) => Promise<boolean>
  entriesOrdered: Entry[]
}

const entryContext = createContext<EntryContextType>({
  entries: {},
  saveEntry: async () => {},
  removeEntry: async () => {},
  updateEntry: async () => {},
  resetEntries: () => {},
  ensureMonthLoaded: async () => {},
  ensureRecentLoaded: async () => {},
  checkEntryExistsByDate: async () => false,
  entriesOrdered: []
})

export default function EntryProvider({ children }: { children: React.ReactNode}) {

  const [ entries, setEntries ] = useState<Record<string, Entry>>({})
  const [ loadedMonths, setLoadedMonths ] = useState<Set<string>>(new Set());
  const [ recentLoaded, setRecentLoaded ] = useState(0);

  const entriesOrdered = useMemo<Entry[]>(() => {
    return Object.values(entries).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [entries]);
  
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

  const removeEntriesFromState = (entries: Entry[]) => {
    setEntries(prev => {
      const updated = { ...prev };

      for (const entry of entries) {
        delete updated[entry.created_at];
      }

      return updated;
    });
  }

  function resetEntries() {
    setLoadedMonths(new Set());
    setRecentLoaded(0);
    setEntries({});
  }

  async function removeEntry(entry: Entry) {
    await entryService.removeEntry(entry.id);
    removeEntriesFromState([entry]);
  }

  async function saveEntry(entry: CreateEntry) {
    const savedEntry = await entryService.saveEntry(entry);
    addEntriesToState([savedEntry]);
  }
  
  async function updateEntry(id: number, entry: CreateEntry) {
    const updatedEntry = await entryService.updateEntry(id, entry);
    addEntriesToState([updatedEntry]);
  }

  async function ensureMonthLoaded(year: number, month: number) {
    const monthKey = getMonthKey(year, month);
    
    // Already loaded, don't query again
    if (loadedMonths.has(monthKey)) {
      return;
    }
    
    const start = performance.now();
    const entries = await entryService.getMonthEntries(year, month);
    const end = performance.now();
    console.log(`ensureMonthLoaded took ${end - start} ms`);

    addEntriesToState(entries);

    setLoadedMonths(prev => {
      const updated = new Set(prev);
      updated.add(monthKey);
      return updated;
    });
  }

  async function ensureRecentLoaded(amount: number) {
    if (recentLoaded >= amount) {
      return;
    }
    
    // console.log("context offset", recentLoaded, "context limit", amount - recentLoaded)
    const timerStart = performance.now();
    const fetched = await entryService.getEntries(
      recentLoaded,
      amount - recentLoaded
    );
    const timerEnd = performance.now();
    console.log(`ensureRecentLoaded took ${timerEnd - timerStart} ms`);

    addEntriesToState(fetched);
    setRecentLoaded(amount);
  }

  async function checkEntryExistsByDate(date: string): Promise<boolean> {
    return await entryService.checkEntryExistsByDate(date);
  }

  return (
    <entryContext.Provider value={{ entries, saveEntry, removeEntry, updateEntry, ensureMonthLoaded, ensureRecentLoaded, resetEntries, checkEntryExistsByDate, entriesOrdered }}>
      {children}
    </entryContext.Provider>
  )
}

export const useEntries = () => useContext(entryContext);