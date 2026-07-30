import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import DailyForm from "./DailyForm";
import DevButtons from "./DevButtons";

export default function DailyEntryScreen() {
  const { themeColors, changeTheme } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { metrics } = useMetrics();
  
  return (
    <>
      {metrics.length > 0 ? (
        <>
          <DailyForm></DailyForm>
          <DevButtons></DevButtons>
        </>
      ) : (
        <>
        <DailyForm></DailyForm>
        <DevButtons></DevButtons>

        {/* <View style={commonStyles.center}>
          <Text style={commonStyles.text}>Please add a metric</Text>
        </View> */}
        </>
      )
    }
    </>
  )
}