// Import the necessary modules from React and React Native
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import useAxios from 'axios-hooks';

const App = () => {
  // Declare a state variable for the country name and a function to update it
  const [countryName, setCountryName] = useState('');

  // Declare the useAxios custom hook to fetch country data based on the country name
  // The 'manual' option is set to true, which means the request will only be made when fetchCountry() is called
  const [{ data, loading, error }, fetchCountry] = useAxios(
    {
      url: 'https://restcountries.com/v3.1/name/' + countryName,
      method: 'GET',
    },
    { manual: true }
  );

  // Function to handle fetching the country data when the "Enter" button is pressed
  const handleFetchCountry = () => {
    fetchCountry();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Text input for entering the country name */}
        <TextInput
          style={styles.input}
          onChangeText={setCountryName}
          value={countryName}
          placeholder="Enter country name"
        />
        {/* Button for fetching the country data */}
        <TouchableOpacity style={styles.button} onPress={handleFetchCountry}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
        {/* Display loading message, error message, or fetched country data */}
        {loading ? (
          <Text style={styles.loading}>Loading country data...</Text>
        ) : error ? (
          <Text style={styles.error}>Error fetching data</Text>
        ) : data ? (
          <View>
            <Text style={styles.countryName}>{data[0].name.common}</Text>
            <Text style={styles.countryInfo}>Population: {data[0].population}</Text>
            <Text style={styles.countryInfo}>Capital: {data[0].capital && data[0].capital[0]}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

// Define the styles for the app components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
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
  countryName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countryInfo: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default App;
