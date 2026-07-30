import MetricManager from "@/features/metrics/components/MetricManager";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import ThemeManager from "./ThemeManager";

export default function SettingsSection() {
  const { themeColors, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  return (
    <>
      <ThemeManager></ThemeManager>
      <MetricManager/>
    </>
  )
}