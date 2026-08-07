import { useEntries } from "@/features/entries/contexts/entryContext";
import useEntryActions from "@/features/entries/hooks/useEntryActions";
import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/features/entries/contexts/entryContext", () => ({
  useEntries: jest.fn()
}));

const mockedUseEntries = useEntries as jest.Mock;

describe("useEntryActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("calls saveEntry from context", async () => {

    const saveEntry = jest.fn().mockResolvedValue(undefined);

    mockedUseEntries.mockReturnValue({
      saveEntry,
      removeEntry: jest.fn(),
      updateEntry: jest.fn(),
    });

    const { result } = await renderHook(() => useEntryActions());

    await act(async () => {
      await result.current.saveEntry({
        values: {},
        date: "2023-03-04",
        comment: "test comment"
      })
    });

    expect(saveEntry).toHaveBeenCalled();
  });

  it("sets error when saving fails", async () => {
    const error = new Error("Failed");

    mockedUseEntries.mockReturnValue({
      saveEntry: jest.fn().mockRejectedValue(error),
      removeEntry: jest.fn(),
      updateEntry: jest.fn(),
    });

    const { result } = await renderHook(() => useEntryActions());

    await act(async () => {
      await expect(
        result.current.saveEntry({} as any)
      ).rejects.toThrow("Failed");
    });

    expect(result.current.error).toBe(error);
  });
});