import { getMonthRange } from "@/shared/utils/getMonthRange"

describe("getMonthRange", () => {
  it("returns the start and end of a month", () => {
    expect(getMonthRange(2026, 5)).toEqual({
      start: "2026-05-01",
      end: "2026-06-01",
    })
  })

  it("handles December correctly", () => {
    expect(getMonthRange(2026, 12)).toEqual({
      start: "2026-12-01",
      end: "2027-01-01",
    })
  })
})