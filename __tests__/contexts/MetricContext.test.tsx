import { act, renderHook } from "@testing-library/react-native";
import React from "react";

import { useEntries } from "@/features/entries/contexts/entryContext";
import { MetricProvider, useMetrics } from "@/features/metrics/contexts/metricContext";
import * as metricService from "@/features/metrics/services/metricService";
import { Metric } from "@/features/metrics/types/metric";

jest.mock("@/features/metrics/services/metricService", () => ({
  getMetrics: jest.fn(),
  addMetric: jest.fn(),
  removeMetric: jest.fn(),
  renameMetric: jest.fn(),
  toggleMetricStatus: jest.fn(),
}));

jest.mock("@/features/entries/contexts/entryContext", () => ({
  useEntries: jest.fn(),
}));

const mockedService = metricService as jest.Mocked<typeof metricService>;
const mockedUseEntries = useEntries as jest.Mock;

const wrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <MetricProvider>
    {children}
  </MetricProvider>
);

const metrics: Metric[] = [
  {
    id: 1,
    name: "Mood",
    status: "active",
  },
  {
    id: 2,
    name: "Sleep",
    status: "inactive",
  },
];

describe("MetricContext", () => {

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseEntries.mockReturnValue({
      resetEntries: jest.fn(),
    });

    mockedService.getMetrics.mockResolvedValue(metrics);
  });

  it("loads metrics on mount", async () => {
    const { result } = await renderHook(() => useMetrics(), {
      wrapper,
    });

    await act(async () => {});

    expect(mockedService.getMetrics)
      .toHaveBeenCalled();

    expect(result.current.metrics)
      .toEqual(metrics);
  });


  it("separates active and inactive metrics", async () => {
    const { result } = await renderHook(() => useMetrics(), {
      wrapper,
    });

    await act(async () => {});

    expect(result.current.activeMetrics)
      .toEqual([
        {
          id: 1,
          name: "Mood",
          status: "active",
        },
      ]);

    expect(result.current.inactiveMetrics)
      .toEqual([
        {
          id: 2,
          name: "Sleep",
          status: "inactive",
        },
      ]);
  });

  it("adds a metric and refreshes metrics", async () => {
    mockedService.addMetric.mockResolvedValue();

    const { result } = await renderHook(() => useMetrics(), {
      wrapper,
    });

    await act(async () => {
      await result.current.addMetric("Exercise");
    });

    expect(mockedService.addMetric)
      .toHaveBeenCalledWith("Exercise");

    expect(mockedService.getMetrics)
      .toHaveBeenCalledTimes(2);
  });


  it("removes a metric and resets entries", async () => {
    const resetEntries = jest.fn();

    mockedUseEntries.mockReturnValue({
      resetEntries,
    });

    mockedService.removeMetric.mockResolvedValue();

    const { result } = await renderHook(() => useMetrics(), {
      wrapper,
    });

    await act(async () => {
      await result.current.removeMetric(1);
    });

    expect(mockedService.removeMetric)
      .toHaveBeenCalledWith(1);

    expect(resetEntries)
      .toHaveBeenCalled();

    expect(mockedService.getMetrics)
      .toHaveBeenCalledTimes(2);
  });


  it("renames a metric and refreshes metrics", async () => {
    mockedService.renameMetric.mockResolvedValue();

    const { result } = await renderHook(() => useMetrics(), {
      wrapper,
    });

    await act(async () => {
      await result.current.renameMetric(
        1,
        "New name"
      );
    });

    expect(mockedService.renameMetric)
      .toHaveBeenCalledWith(
        1,
        "New name"
      );

    expect(mockedService.getMetrics)
      .toHaveBeenCalledTimes(2);
  });


  it("toggles metric status and resets entries", async () => {
    const resetEntries = jest.fn();

    mockedUseEntries.mockReturnValue({
      resetEntries,
    });

    mockedService.toggleMetricStatus.mockResolvedValue();

    const { result } = await renderHook(() => useMetrics(), {
      wrapper,
    });

    await act(async () => {
      await result.current.toggleMetricStatus(1);
    });

    expect(mockedService.toggleMetricStatus)
      .toHaveBeenCalledWith(1);

    expect(resetEntries)
      .toHaveBeenCalled();

    expect(mockedService.getMetrics)
      .toHaveBeenCalledTimes(2);
  });

});