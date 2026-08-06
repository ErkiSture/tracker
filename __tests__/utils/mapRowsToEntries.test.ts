import { mapRowsToEntries } from "../../features/entries/utils/mapRowsToEntries";

describe("mapRowsToEntries", () => {
  test("maps a single row into an entry", () => {
    const rows = [
      {
        entryId: 1,
        comment: "Morning check",
        created_at: "2026-08-06",
        metricId: 10,
        name: "Weight",
        value: 80,
      },
    ];

    const result = mapRowsToEntries(rows);

    expect(result).toEqual([
      {
        id: 1,
        comment: "Morning check",
        created_at: "2026-08-06",
        metrics: {
          10: {
            name: "Weight",
            value: 80,
          },
        },
      },
    ]);
  });

  test("combines multiple metrics into the same entry", () => {
    const rows = [
      {
        entryId: 1,
        comment: "Daily stats",
        created_at: "2026-08-06",
        metricId: 10,
        name: "Weight",
        value: 80,
      },
      {
        entryId: 1,
        comment: "Daily stats",
        created_at: "2026-08-06",
        metricId: 20,
        name: "Height",
        value: 180,
      },
    ];

    const result = mapRowsToEntries(rows);

    expect(result).toEqual([
      {
        id: 1,
        comment: "Daily stats",
        created_at: "2026-08-06",
        metrics: {
          10: {
            name: "Weight",
            value: 80,
          },
          20: {
            name: "Height",
            value: 180,
          },
        },
      },
    ]);
  });

  test("creates separate entries for different entryIds", () => {
    const rows = [
      {
        entryId: 1,
        comment: "First",
        created_at: "2026-08-06",
        metricId: null,
        name: null,
        value: null,
      },
      {
        entryId: 2,
        comment: "Second",
        created_at: "2026-08-07",
        metricId: null,
        name: null,
        value: null,
      },
    ];

    const result = mapRowsToEntries(rows);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });

  test("ignores rows without a metric", () => {
    const rows = [
      {
        entryId: 1,
        comment: "No metric",
        created_at: "2026-08-06",
        metricId: null,
        name: null,
        value: null,
      },
    ];

    const result = mapRowsToEntries(rows);

    expect(result).toEqual([
      {
        id: 1,
        comment: "No metric",
        created_at: "2026-08-06",
        metrics: {},
      },
    ]);
  });

  test("returns an empty array when given no rows", () => {
    expect(mapRowsToEntries([])).toEqual([]);
  });
});