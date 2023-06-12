import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
const App = () => {
  const [joke, setJoke] = useState('');
  useEffect(() => {
    fetchJoke();
  }, []);
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: {'Accept': 'application/json'},
      });
      setJoke(response.data.joke);
    } catch (error) {
      console.error('Error fetching dad joke:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.jokeText}>{joke}</Text>
      <TouchableOpacity style={styles.button} onPress={fetchJoke}>
        <Text style={styles.buttonText}>Get another dad joke</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  jokeText: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: '#000'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
});
export default App;