import { useState } from "react";
import { useEntries } from "../contexts/entryContext";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";

export default function useEntryActions() {
  const {
    saveEntry: save,
    removeEntry: remove,
    updateEntry: update,
  } = useEntries();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function saveEntry(entry: CreateEntry) {
    try {
      setLoading(true);
      await save(entry);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function removeEntry(entry: Entry) {
    try {
      setLoading(true);
      await remove(entry);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateEntry(id: number, entry: CreateEntry) {
    try {
      setLoading(true);
      await update(id, entry);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    saveEntry,
    removeEntry,
    updateEntry,
    setError,
    loading,
    error,
  };
}