import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";


jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@/shared/repositories/entryRepository", () => ({
  getEntryByDate: jest.fn(),
  saveEntry: jest.fn(),
  getAllEntries: jest.fn(),
  getMonthEntries: jest.fn(),
}));