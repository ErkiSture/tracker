import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import DailyForm from "./DailyForm";
import DevButtons from "./DevButtons";

export default function DailyEntryScreen() {
  const { themeColors, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  return (
    <>
      <DailyForm></DailyForm>
      <DevButtons></DevButtons>
    </>
  )
}