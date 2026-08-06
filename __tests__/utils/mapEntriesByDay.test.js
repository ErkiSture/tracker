import { mapEntriesByDay } from "@/features/statistics/utils/mapEntriesByDay";

describe("mapEntriesByDay", () => {
  it("should map entries to their respective days", () => {
    const entries = [
      { id: 1, comment: "test", created_at: "2023-10-01", metrics: {} },
      { id: 2, comment: "test", created_at: "2023-10-02", metrics: {} }
    ];
    const result = mapEntriesByDay(entries);

    expect(result).toEqual(
      new Map([
        [1, entries[0]],
        [2, entries[1]]
      ])
    );
  });

  it("should be able to handle zero entries", () => {
    const entries = [];
    const result = mapEntriesByDay(entries);

    expect(result).toEqual(new Map());
  });
});