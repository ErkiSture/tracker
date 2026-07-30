import * as entryRepository from "@/shared/repositories/entryRepository";
import { saveEntry } from "@/shared/services/entryService";

const mockedRepository = entryRepository as jest.Mocked<typeof entryRepository>

describe("entryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects invalid metric values", async () => {
    await expect(
      saveEntry({
        values: {
          1: 11,
          2: 5,
        },
        comment: null,
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
        comment: null,
      })
    ).resolves.not.toThrow();

    expect(mockedRepository.saveEntry).toHaveBeenCalledWith({
      values: {
        1: 10,
        2: 5,
        3: 7,
      },
      comment: null,
    });
  });

  it("rejects comments that are too long", async () => {
    await expect(
      saveEntry({
        values: {
          1: 5,
        },
        comment: "a".repeat(501),
      })
    ).rejects.toThrow();
  });

  it("rejects duplicate dates", async () => {
    mockedRepository.getEntryByDate.mockResolvedValue(true);

    await expect(
      saveEntry({
        values: {
          1: 5,
        },
        comment: "test",
      })
    ).rejects.toThrow();

    expect(mockedRepository.saveEntry).not.toHaveBeenCalled();
  });
});