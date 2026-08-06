import { act, renderHook } from "@testing-library/react-native";
import React from "react";

import EntryProvider, {
  useEntries,
} from "@/features/entries/contexts/entryContext";

import * as entryService from "@/features/entries/services/entryService";
import { CreateEntry } from "@/features/entries/types/createEntry";
import { Entry } from "@/features/entries/types/entry";

jest.mock("@/features/entries/services/entryService", () => ({
  saveEntry: jest.fn(),
  getMonthEntries: jest.fn(),
  getEntries: jest.fn(),
  getRecentEntries: jest.fn(),
  createEntry: jest.fn(),
  removeEntry: jest.fn(),
  updateEntry: jest.fn(),
  checkEntryExistsByDate: jest.fn(),
}));

const mockedService = entryService as jest.Mocked<typeof entryService>;

const wrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => <EntryProvider>{children}</EntryProvider>;

const createEntry: CreateEntry = {
  comment: "Test entry",
  date: "2024-06-01",
  values: {
    1: 8,
  },
};

const entry: Entry = {
  id: 1,
  comment: "Test entry",
  created_at: "2024-06-01",
  metrics: {
    1: {
      value: 8,
      name: "Mood",
    },
  },
};

const updatedEntry: Entry = {
  ...entry,
  comment: "Updated",
  metrics: {
    1: {
      value: 10,
      name: "Mood",
    },
  },
};

describe("EntryContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds a saved entry to state", async () => {
    mockedService.saveEntry.mockResolvedValue(entry);

    const { result } = await renderHook(() => useEntries(), {
      wrapper,
    });

    await act(async () => {
      await result.current.saveEntry(createEntry);
    });

    expect(mockedService.saveEntry)
      .toHaveBeenCalledWith(createEntry);

    expect(result.current.entries["2024-06-01"])
      .toEqual(entry);
  });

  it("removes an entry from state", async () => {
    mockedService.saveEntry.mockResolvedValue(entry);
    mockedService.removeEntry.mockResolvedValue();

    const { result } = await renderHook(() => useEntries(), {
      wrapper,
    });

    await act(async () => {
      await result.current.saveEntry(createEntry);
    });

    await act(async () => {
      await result.current.removeEntry(entry);
    });

    expect(mockedService.removeEntry)
      .toHaveBeenCalledWith(entry.id);

    expect(result.current.entries)
      .toEqual({});
  });

  it("updates an existing entry", async () => {
    mockedService.saveEntry.mockResolvedValue(entry);
    mockedService.updateEntry.mockResolvedValue(updatedEntry);

    const { result } = await renderHook(() => useEntries(), {
      wrapper,
    });

    await act(async () => {
      await result.current.saveEntry(createEntry);
    });

    await act(async () => {
      await result.current.updateEntry(
        entry.id,
        createEntry
      );
    });

    expect(mockedService.updateEntry)
      .toHaveBeenCalledWith(
        entry.id,
        createEntry
      );

    expect(result.current.entries["2024-06-01"])
      .toEqual(updatedEntry);
  });

  it("loads a month only once", async () => {
    mockedService.getMonthEntries.mockResolvedValue([
      entry,
    ]);

    const { result } = await renderHook(() => useEntries(), {
      wrapper,
    });

    await act(async () => {
      await result.current.ensureMonthLoaded(
        2024,
        6
      );
    });

    await act(async () => {
      await result.current.ensureMonthLoaded(
        2024,
        6
      );
    });

    expect(mockedService.getMonthEntries)
      .toHaveBeenCalledTimes(1);
  });

  it("loads different months separately", async () => {
    mockedService.getMonthEntries.mockResolvedValue([
      entry,
    ]);

    const { result } = await renderHook(() => useEntries(), {
      wrapper,
    });

    await act(async () => {
      await result.current.ensureMonthLoaded(
        2024,
        6
      );
    });

    await act(async () => {
      await result.current.ensureMonthLoaded(
        2024,
        7
      );
    });

    expect(mockedService.getMonthEntries)
      .toHaveBeenCalledTimes(2);
  });

  it("loads recent entries only once", async () => {
    mockedService.getEntries.mockResolvedValue([
      entry,
    ]);

    const { result } = await renderHook(() => useEntries(), {
      wrapper,
    });

    await act(async () => {
      await result.current.ensureRecentLoaded(10);
    });

    await act(async () => {
      await result.current.ensureRecentLoaded(10);
    });

    expect(mockedService.getEntries)
      .toHaveBeenCalledTimes(1);

    expect(mockedService.getEntries)
      .toHaveBeenCalledWith(0, 10);
  });

  it("resets cached entries", async () => {
    mockedService.saveEntry.mockResolvedValue(entry);

    const { result } = await renderHook(() => useEntries(), {
      wrapper,
    });

    await act(async () => {
      await result.current.saveEntry(createEntry);
    });

    await act(async () => {
      result.current.resetEntries();
    });

    expect(result.current.entries)
      .toEqual({});
  });

  it("keeps entries ordered by newest first", async () => {
    const newer: Entry = {
      ...entry,
      id: 2,
      created_at: "2024-06-02",
    };

    mockedService.saveEntry
      .mockResolvedValueOnce(entry)
      .mockResolvedValueOnce(newer);

    const { result } = await renderHook(() => useEntries(), {
      wrapper,
    });

    await act(async () => {
      await result.current.saveEntry(createEntry);
    });

    await act(async () => {
      await result.current.saveEntry({
        ...createEntry,
        date: "2024-06-02",
      });
    });

    expect(result.current.entriesOrdered[0])
      .toEqual(newer);

    expect(result.current.entriesOrdered[1])
      .toEqual(entry);
  });

  it("forwards checkEntryExistsByDate to the service", async () => {
    mockedService.checkEntryExistsByDate.mockResolvedValue(
      true
    );

    const { result } = await renderHook(async () => useEntries(), {
      wrapper,
    });

    const exists = await (await result.current).checkEntryExistsByDate(
      "2024-06-01"
    );

    expect(exists).toBe(true);

    expect(mockedService.checkEntryExistsByDate)
      .toHaveBeenCalledWith("2024-06-01");
  });
});