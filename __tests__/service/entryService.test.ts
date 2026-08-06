jest.mock("@/features/entries/repositories/entryRepository", () => ({
  checkEntryExistsByDate: jest.fn(),
  saveEntry: jest.fn(),
  removeEntry: jest.fn(),
  updateEntry: jest.fn(),
  getMonthEntries: jest.fn(),
  getRecentEntries: jest.fn(),
  getEntriesByDateRange: jest.fn(),
  getEntries: jest.fn(),
}));

import * as entryRepository from "@/features/entries/repositories/entryRepository";
import { checkEntryExistsByDate, getEntries, getEntriesByDateRange, getMonthEntries, getRecentEntries, removeEntry, saveEntry, updateEntry } from "@/features/entries/services/entryService";

const mockedRepository = entryRepository as jest.Mocked<typeof entryRepository>;

describe("entryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // CREATE ENTRY

  it("rejects invalid metric values", async () => {
    await expect(
      saveEntry({
        values: {
          1: 11,
          2: 5,
        },
        comment: "test comment",
        date: "2024-06-01",
      })
    ).rejects.toThrow();

    expect(mockedRepository.saveEntry).not.toHaveBeenCalled();
  });

  it("accepts valid metric values", async () => {
    await expect(
      saveEntry({
        values: {
          1: 10,
          2: 5,
          3: 7,
        },
        comment: "test comment",
        date: "2024-06-01",
      })
    ).resolves.not.toThrow();

    expect(mockedRepository.saveEntry).toHaveBeenCalledWith({
      values: {
        1: 10,
        2: 5,
        3: 7,
      },
      comment: "test comment",
      date: "2024-06-01",
    });
  });

  it("rejects comments that are too long", async () => {
    await expect(
      saveEntry({
        values: {
          1: 5,
        },
        comment: "a".repeat(501),
        date: "2024-06-01",
      })
    ).rejects.toThrow();
  });

  it("rejects duplicate dates", async () => {
    mockedRepository.checkEntryExistsByDate.mockResolvedValue(true);

    await expect(
      saveEntry({
        values: {
          1: 5,
        },
        comment: "test",
        date: "2024-06-01",
      })
    ).rejects.toThrow();

    expect(mockedRepository.saveEntry).not.toHaveBeenCalled();
  });

  // REMOVE ENTRY

  it("removes an existing entry", async () => {
    mockedRepository.removeEntry.mockResolvedValue(true);

    await expect(removeEntry(1))
      .resolves
      .not
      .toThrow();

    expect(mockedRepository.removeEntry)
      .toHaveBeenCalledWith(1);
  });

  it("rejects removing a non-existing entry", async () => {
    mockedRepository.removeEntry.mockResolvedValue(false);

    await expect(removeEntry(1))
      .rejects
      .toThrow();

    expect(mockedRepository.removeEntry)
      .toHaveBeenCalledWith(1);
  });


  // UPDATE ENTRY

  it("updates an entry", async () => {
    const entry = {
      values: {
        1: 8,
      },
      comment: "updated",
      date: "2024-06-01",
    };

    await updateEntry(1, entry);

    expect(mockedRepository.updateEntry)
      .toHaveBeenCalledWith(1, entry);
  });

  it("rejects invalid metric values on update", async () => {
    const entry = {
      values: {
        1: 11,
      },
      comment: "updated",
      date: "2024-06-01",
    };
    
    await expect(updateEntry(1, entry)).rejects.toThrow();
  });

  it("rejects comments that are too long on update", async () => {
    const entry = {
      values: {
        1: 5,
      },
      comment: "a".repeat(501),
      date: "2024-06-01",
    };
    await expect(updateEntry(1, entry)).rejects.toThrow();
  });

  // GET MONTH ENTRIES

  it("rejects invalid months", async () => {
    await expect(getMonthEntries(2024, 0))
      .rejects
      .toThrow();

    await expect(getMonthEntries(2024, 13))
      .rejects
      .toThrow();

    expect(mockedRepository.getMonthEntries)
      .not
      .toHaveBeenCalled();
  });

  it("gets entries for a valid month", async () => {
    mockedRepository.getMonthEntries.mockResolvedValue([]);

    await expect(getMonthEntries(2024, 6))
      .resolves
      .toEqual([]);

    expect(mockedRepository.getMonthEntries)
      .toHaveBeenCalledWith(2024, 6);
  });


  // GET RECENT ENTRIES

  it("rejects invalid recent entry amount", async () => {
    await expect(getRecentEntries(0))
      .rejects
      .toThrow();

    await expect(getRecentEntries(-1))
      .rejects
      .toThrow();

    expect(mockedRepository.getRecentEntries)
      .not
      .toHaveBeenCalled();
  });

  it("gets recent entries", async () => {
    mockedRepository.getRecentEntries.mockResolvedValue([]);

    await expect(getRecentEntries(10))
      .resolves
      .toEqual([]);

    expect(mockedRepository.getRecentEntries)
      .toHaveBeenCalledWith(10);
  });

  // GET DATE RANGE

  it("gets entries by date range", async () => {
    mockedRepository.getEntriesByDateRange.mockResolvedValue([]);

    await expect(
      getEntriesByDateRange(
        "2024-06-01",
        "2024-07-01"
      )
    )
      .resolves
      .toEqual([]);

    expect(mockedRepository.getEntriesByDateRange)
      .toHaveBeenCalledWith(
        "2024-06-01",
        "2024-07-01"
      );
  });

  // GET PAGINATED ENTRIES

  it("gets entries with pagination", async () => {
    mockedRepository.getEntries.mockResolvedValue([]);

    await expect(getEntries(0, 20))
      .resolves
      .toEqual([]);

    expect(mockedRepository.getEntries)
      .toHaveBeenCalledWith(0, 20);
  });

  // CHECK DATE EXISTS

  it("checks if entry exists by date", async () => {
    mockedRepository.checkEntryExistsByDate.mockResolvedValue(true);

    await expect(
      checkEntryExistsByDate("2024-06-01")
    )
      .resolves
      .toBe(true);

    expect(mockedRepository.checkEntryExistsByDate)
      .toHaveBeenCalledWith("2024-06-01");
  });
});