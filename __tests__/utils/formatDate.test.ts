import formatDate from "@/shared/utils/formatDate";

describe("formatDate", () => {
  it("should handle single-digit months and days", () => {
    const formattedDate = formatDate(2023, 3, 7);
    expect(formattedDate).toBe("2023-03-07");
  });

  it("should handle double-digit months and days", () => {
    const formattedDate = formatDate(2023, 11, 15);
    expect(formattedDate).toBe("2023-11-15");
  });
});