import MetricManager from "@/features/metrics/components/MetricManager";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import useMetricActions from "@/features/metrics/hooks/useMetricActions";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { MenuProvider } from "react-native-popup-menu";

jest.mock("@/features/metrics/contexts/metricContext", () => ({
  useMetrics: jest.fn()
}));

const mockedUseMetrics = useMetrics as jest.Mock;

jest.mock("@/features/metrics/hooks/useMetricActions", () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedUseMetricActions = useMetricActions as jest.Mock;

describe("MetricManager", () => {

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseMetricActions.mockReturnValue({
      createMetric: jest.fn(),
      error: null,
    });
  });

  it("renders correctly", async () => {
    mockedUseMetrics.mockReturnValue({activeMetrics: [], inactiveMetrics: []});

    // Render the MetricManager component
    const { getByText } = await render(<MetricManager/>, {
      wrapper: MenuProvider
    });

    // Check if the section titles are rendered
    expect(getByText("Custom metrics")).toBeTruthy();
    expect(getByText("Active metrics")).toBeTruthy();
    expect(getByText("Inactive metrics")).toBeTruthy();
  });

  it("renders active and inactive metrics", async () => {
    mockedUseMetrics.mockReturnValue({
      activeMetrics: [
        {
          id: 1,
          name: "Mood",
          status: "active",
        },
      ],

      inactiveMetrics: [
        {
          id: 2,
          name: "Sleep",
          status: "inactive",
        },
      ],
    });

    await render(<MetricManager/>, {
      wrapper: MenuProvider
    });

    expect(screen.getByText("Mood")).toBeTruthy();
    expect(screen.getByText("Sleep")).toBeTruthy();
    expect(() => screen.getByText("Energy")).toThrow();
  });

  it("can create metrics", async () => {
    mockedUseMetrics.mockReturnValue({activeMetrics: [], inactiveMetrics: []});

    let createMetric: jest.Mock = jest.fn();

    mockedUseMetricActions.mockReturnValue({
      createMetric,
      error: null,
    });

    await render(<MetricManager/>, { 
      wrapper: MenuProvider 
    });

    await fireEvent.changeText(
      screen.getByPlaceholderText("Metric name"),
      "Exercise"
    );

    await fireEvent.press(screen.getByText("Add"));

    expect(createMetric).toHaveBeenCalledWith("Exercise");
  })
});