// Import the necessary modules from React and React Native
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useAxios from 'axios-hooks';

const App = () => {
  // Declare the useAxios custom hook to fetch random facts
  const [{ data, loading, error }, refetch] = useAxios('https://uselessfacts.jsph.pl/random.json?language=en');

  // Function to handle refetching the random fact when the "Fetch another fact" button is pressed
  const handleRefetch = () => {
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Display loading message, error message, or fetched random fact */}
        {loading ? (
          <Text style={styles.loading}>Loading random fact...</Text>
        ) : error ? (
          <Text style={styles.error}>Error fetching data</Text>
        ) : (
          <Text style={styles.fact}>{data.text}</Text>
        )}
      </View>
      {/* Button for refetching a random fact */}
      <TouchableOpacity style={styles.button} onPress={handleRefetch}>
        <Text style={styles.buttonText}>Fetch another fact</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Define the styles for the app components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginBottom: 20,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
  fact: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default App;
