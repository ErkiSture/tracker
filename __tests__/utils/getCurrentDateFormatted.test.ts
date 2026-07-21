import getCurrentDateFormatted from "@/shared/util/getCurrentDateFormatted";

describe("getCurrentDateFormatted", () => {
  it("returns today's date in YYYY-MM-DD format", () => {
    expect(getCurrentDateFormatted()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns the correct date", () => {
    const today = new Date();

    const expected = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    expect(getCurrentDateFormatted()).toBe(expected);
  });
})