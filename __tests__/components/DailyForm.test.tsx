import DailyForm from "@/features/daily-entry/components/DailyForm";
import useEntryExistsDate from "@/features/daily-entry/hooks/useEntryExistsToday";
import useEntryActions from "@/features/entries/hooks/useEntryActions";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock("@/features/entries/hooks/useEntryActions", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/features/daily-entry/hooks/useEntryExistsToday", () => jest.fn());

jest.mock("@/features/metrics/contexts/metricContext", () => ({
  useMetrics: jest.fn(),
}));

jest.mock("@/features/daily-entry/components/RatingInput", () => {
  const { Pressable, Text } = require("react-native");

  return ({ label, value, onChange }: any) => (
    <Pressable onPress={() => onChange(8)}>
      <Text>
        {label}:{value}
      </Text>
    </Pressable>
  );
});

jest.mock("@/features/daily-entry/components/CommentInput", () => {
  const { TextInput } = require("react-native");

  return ({ value, onChange }: any) => (
    <TextInput
      placeholder="Comment"
      value={value}
      onChangeText={onChange}
    />
  );
});

jest.mock("@/features/daily-entry/components/DailyCompleted", () => {
  const { Text } = require("react-native");

  return () => <Text>Completed</Text>;
});

const mockedUseEntryActions = useEntryActions as jest.Mock;
const mockedUseEntryExistsDate = useEntryExistsDate as jest.Mock;
const mockedUseMetrics = useMetrics as jest.Mock;

describe("DailyForm", () => {

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseEntryActions.mockReturnValue({
      saveEntry: jest.fn(),
      error: null,
    });

    mockedUseEntryExistsDate.mockReturnValue(false);

    mockedUseMetrics.mockReturnValue({
      activeMetrics: [
        {
          id: 1,
          name: "Mood",
          status: "active",
        },
        {
          id: 2,
          name: "Sleep",
          status: "active",
        },
      ],
    });
  });

  it("defaults ratings to 5", async () => {
    await render(<DailyForm />);

    expect(screen.getByText("Mood:5"))
      .toBeTruthy();

    expect(screen.getByText("Sleep:5"))
      .toBeTruthy();
  });

  it("updates rating values", async () => {
    await render(<DailyForm />);

    await fireEvent.press(
      screen.getByText("Mood:5")
    );

    expect(screen.getByText("Mood:8"))
      .toBeTruthy();
  });

  it("saves entry with updated values", async () => {
    const saveEntry = jest.fn();

    mockedUseEntryActions.mockReturnValue({
      saveEntry,
      error: null,
    });

    await render(<DailyForm />);

    await fireEvent.press(
      screen.getByText("Mood:5")
    );

    await fireEvent.press(
      screen.getByText("Save")
    );

    expect(saveEntry)
      .toHaveBeenCalledWith(
        expect.objectContaining({
          values: {
            1: 8,
            2: 5,
          },
        })
      );
  });

  it("does not show form when entry already exists", async () => {
    mockedUseEntryExistsDate.mockReturnValue(true);

    await render(<DailyForm />);

    expect(screen.getByText("Completed"))
      .toBeTruthy();

    expect(() => 
      screen.getByText("Save")
    ).toThrow();
  });

  it("shows errors from hook", async () => {
    mockedUseEntryActions.mockReturnValue({
      saveEntry: jest.fn(),
      error: new Error("Failed saving"),
    });

    await render(<DailyForm />);

    expect(
      screen.getByText("Failed saving")
    ).toBeTruthy();
  });
});