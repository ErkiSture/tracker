import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook } from "@testing-library/react-native";
import { ThemeProvider, useTheme } from "../shared/contexts/themeContext";

describe("ThemeContext", () => {
  beforeEach(async () => {
    // Reset AsyncStorage between tests
    await AsyncStorage.clear();

    // Reset mock call history
    jest.clearAllMocks();
  });

  it("starts with systemthemePreference", async () => {
    const { result } = await renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.themePreference).toBe("system");
  });

  it("can change themethemePreference", async () => {
    const { result } = await renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    
    await act(async () => {
      result.current.changeTheme("dark");
    });
    
    expect(result.current.themePreference).toBe("dark");
  });

  it("saves themethemePreference to AsyncStorage", async () => {
    const { result } = await renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    await act(async () => {
      result.current.changeTheme("dark");
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  })

  it("loads themethemePreference from AsyncStorage", async () => {
    AsyncStorage.getItem = jest.fn().mockResolvedValue("dark")

    const { result } = await renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    });

    expect(result.current.themePreference).toBe("dark");
  })

  it("falls back to systemthemePreference if AsyncStorage is empty", async () => {
    AsyncStorage.getItem = jest.fn().mockResolvedValue(null)

    const { result } = await renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    });

    expect(result.current.themePreference).toBe("system");
  });
})

// Most tests follow:
// Arrange, Act, Assert

// describe: group related tests together
// it/test: individual test case
// expect: assertion library to check if the actual value matches the expected value

// Jest stuff:
// describe()
// it()
// expect()
// jest.fn()
// jest.spyOn()
// jest.mock()

// React Testing Library stuff:
// render()
// renderHook()
// fireEvent()
// fireEvent
// waitFor()
// act
// screen