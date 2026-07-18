import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      // Configures current screen navigation settings(set title)
      <Stack.Screen options={{ title: "Oops! Not Found"}}/>

      // A normal React Native container
      <View style={styles.container}>
        <Link href="/" style={styles.button}>Go back to Home screen!</Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});