import { StyleSheet } from "react-native";
import { ThemeColors } from "../types/themeColors";

export const createCommonStyles = (themeColors: ThemeColors) => {
  return StyleSheet.create({
    text: {
      color: themeColors.text,
      fontSize: 16,
      lineHeight: 22,
    },

    title: {
      color: themeColors.text,
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 20,
    },

    button: {
      backgroundColor: themeColors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 0,
      borderWidth: 1,
      borderColor: themeColors.border,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },

    buttonText: {
      color: themeColors.background,
      fontSize: 16,
      fontWeight: "600",
    },

    screenContainer: {
      flex: 1,
      backgroundColor: themeColors.background,
      paddingHorizontal: 20,
      paddingVertical: 24,
    },

    textInput: {
      height: 48,
      borderColor: themeColors.border,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 14,
      fontSize: 16,
      color: themeColors.text,
      backgroundColor: themeColors.background,
    },

    spacingSmall: {
      marginBottom: 10,
    },

    spacingMedium: {
      marginBottom: 20,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
    },

    center: {
      alignItems: "center",
      justifyContent: "center",
    },

    section: {
      marginBottom: 40,
      gap: 16
    },

    sectionTitle: {
      color: themeColors.text,
      fontSize: 20,
      fontWeight: "600",
    },

    sectionCard: {
      backgroundColor: themeColors.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: themeColors.border,
      marginBottom: 20,
      gap: 16
    },

    textButton: {

    },

    textButtonText: {
      textDecorationLine: "underline",
    },

    modalBackdrop: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.4)",
    }
    
  });
};