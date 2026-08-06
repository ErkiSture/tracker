import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import DailyForm from "./DailyForm";
import DevButtons from "./DevButtons";

export default function DailyEntryScreen() {
  const { themeColors, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { activeMetrics } = useMetrics();
  
  return (
    <>
      {activeMetrics.length > 0 ? (
        <>
          <DailyForm></DailyForm>
          <DevButtons></DevButtons>
        </>
      ) : (
        <>
        <DailyForm></DailyForm>
        <DevButtons></DevButtons>
        </>
      )
    }
    </>
  )
}