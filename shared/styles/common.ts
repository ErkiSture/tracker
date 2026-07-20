import { StyleSheet } from "react-native";

export const createCommonStyles = (theme) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.text,
      fontSize: 16,
      lineHeight: 22,
    },

    title: {
      color: theme.colors.text,
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 20,
    },

    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
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
      color: theme.colors.background,
      fontSize: 16,
      fontWeight: "600",
    },

    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      paddingVertical: 24,
    },

    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },

    card: {
      backgroundColor: theme.colors.surface ?? theme.colors.background,
      borderRadius: 16,
      padding: 20,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },

    textInput: {
      height: 48,
      width: "100%",
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 14,
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
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
  });
};