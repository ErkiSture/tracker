import ConfirmModal from "@/shared/components/confirmModal";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useMetrics } from "../contexts/metricContext";
import { Metric } from "../types/metric";
import RenameMetricModal from "./RenameMetricModal";

type Props = {
  metric: Metric;
  id: number;
};

export default function MetricOptionsMenu({
  metric,
  id,
}: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { removeMetric, renameMetric, toggleMetricStatus } = useMetrics();

  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  return (
    <>
      <Menu>
        <MenuTrigger>
          <Text style={[commonStyles.text, { fontSize: 22, paddingHorizontal: 8, paddingVertical: 4 }]}>
            ⋮
          </Text>
        </MenuTrigger>

        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
              borderWidth: 1,
              borderRadius: 12,
              paddingVertical: 6,
              width: 160,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 5,
            },
          }}
        >
          <MenuOption
            customStyles={{
              optionWrapper: styles.option,
            }}
            onSelect={() => {
              setShowRenameModal(true);
            }}
          >
            <Text style={commonStyles.text}>
              Rename
            </Text>
          </MenuOption>

          <MenuOption
            customStyles={{
              optionWrapper: styles.option,
            }}
            onSelect={() => toggleMetricStatus(id)}
          >
            <Text style={commonStyles.text}>
              {metric.status === "active"
                ? "Deactivate"
                : "Activate"}
            </Text>
          </MenuOption>

          <MenuOption
            customStyles={{
              optionWrapper: styles.option,
            }}
            onSelect={() => setShowRemoveConfirmModal(true)}
          >
            <Text style={styles.remove}>
              Remove
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>

      <ConfirmModal
        visible={showRemoveConfirmModal}
        title="Remove metric?"
        message="This action cannot be undone."
        confirmText="Remove"
        onCancel={() => setShowRemoveConfirmModal(false)}
        onConfirm={() => {
          removeMetric(id);
          setShowRemoveConfirmModal(false);
        }}
      />

      <RenameMetricModal
        visible={showRenameModal}
        initialName={metric.name}
        onSave={(newName) => {
          renameMetric(id, newName);
          setShowRenameModal(false);
        }}
        onCancel={() => setShowRenameModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  remove: {
    color: "#d32f2f",
    fontWeight: "600",
  },
});