jest.mock("@/features/metrics/repositories/metricRepository", () => ({
  getMetrics: jest.fn(),
  addMetric: jest.fn(),
  metricExists: jest.fn(),
  removeMetric: jest.fn(),
  getMetricCount: jest.fn(),
  toggleMetricStatus: jest.fn(),
  renameMetric: jest.fn(),
}));

import * as metricRepository from "@/features/metrics/repositories/metricRepository";
import { addMetric, renameMetric } from "@/features/metrics/services/metricService";

const mockedRepository = metricRepository as jest.Mocked<typeof metricRepository>

describe("metricService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // CREATE METRIC

  it("rejects adding a metric that already exists", async () => {
    mockedRepository.metricExists.mockResolvedValue(true);
    await expect(addMetric("Test Metric")).rejects.toThrow();
  });

  it("rejects adding a metric when the maximum number of metrics is reached", async () => {
    mockedRepository.metricExists.mockResolvedValue(false);
    mockedRepository.getMetricCount.mockResolvedValue(20);
    await expect(addMetric("Test Metric")).rejects.toThrow();
  });

  it("rejects adding a metric with an empty name", async () => {
    await expect(addMetric("   ")).rejects.toThrow();
  });

  it("successfully adds a metric with a valid name", async () => {
    mockedRepository.metricExists.mockResolvedValue(false);
    mockedRepository.getMetricCount.mockResolvedValue(10);
    await expect(addMetric("Valid Metric")).resolves.not.toThrow();
    expect(mockedRepository.addMetric).toHaveBeenCalledWith("Valid Metric");
  });

  it("trims whitespace from the metric name before adding", async () => {
    mockedRepository.metricExists.mockResolvedValue(false);
    mockedRepository.getMetricCount.mockResolvedValue(10);
    await expect(addMetric("   Trimmed Metric   ")).resolves.not.toThrow();
    expect(mockedRepository.addMetric).toHaveBeenCalledWith("Trimmed Metric");
  });

  it("rejects adding a metric with a name that is too long", async () => {
    const longName = "a".repeat(51);
    await expect(addMetric(longName)).rejects.toThrow();
  });

  // RENAME METRIC

  it("can rename a metric successfully", async () => {
    await expect(renameMetric(1, "New Name")).resolves.not.toThrow();
    expect(mockedRepository.renameMetric).toHaveBeenCalledWith(1, "New Name");
  });

  it("can't rename a metric to an empty name", async () => {
    await expect(renameMetric(1, "   ")).rejects.toThrow();
  });

  it("can't rename a metric to a name that is too long", async () => {
    await expect(renameMetric(1, "a".repeat(51))).rejects.toThrow();
  });

  it("can't rename a metric to an existing name", async () => {
    mockedRepository.metricExists.mockResolvedValue(true);
    await expect(renameMetric(1, "Existing Name")).rejects.toThrow();
  });

  // REMOVE METRIC

  it("can remove a metric successfully", async () => {
    mockedRepository.removeMetric.mockResolvedValue(true);
    await expect(metricRepository.removeMetric(1)).resolves.not.toThrow();
  });
});