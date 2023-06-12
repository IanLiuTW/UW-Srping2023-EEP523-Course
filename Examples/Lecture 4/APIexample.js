import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

// Define the App component
const App = () => {
  // Define state variables for loading and storing the movie data
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Define an async function to fetch the movie data
  const getMovies = async () => {
    try {
      // Make an API call to fetch the movie data
      const response = await fetch('https://reactnative.dev/movies.json');
      // Convert the response to JSON format
      const json = await response.json();
      // Update the state with the movie data
      setData(json.movies);
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error(error);
    } finally {
      // Set the loading state to false to indicate that the data has been loaded
      setLoading(false);
    }
  };

  // Use the useEffect hook to call the getMovies function once when the component is mounted
  useEffect(() => {
    getMovies();
  }, []);

  // Render the component
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        // Show an activity indicator while the data is loading
        <ActivityIndicator />
      ) : (
        // Render a FlatList component to display the movie data
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            // Render each item in the FlatList as a Text component
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

// Export the App component as the default export
export default App;
