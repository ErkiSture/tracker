import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import DailyForm from "./DailyForm";

export default function DailyEntryScreen() {
  const { themeColors, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  return (
    <DailyForm></DailyForm>
  )
}