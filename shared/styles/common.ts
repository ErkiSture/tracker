import { StyleSheet } from "react-native";

export const createCommonStyles = (theme) => {
  return StyleSheet.create({
    text: {
      color: theme.colors.text,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderStyle: "dotted",
    },
    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};