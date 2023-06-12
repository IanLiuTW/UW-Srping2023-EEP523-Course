import React, { useEffect } from 'react';
import { Alert, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const ApiKey = 'PfAjP6Wvqht3grHF3fIqayuhGYzR50NE'

export default function App() {
  // Define the variables for the app
  const [query, setQuery] = React.useState('');
  const [data, setData] = React.useState([]);
  // Define the type of API request url and response handling function that will be used
  type = {
    topstories: {
      request: `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${ApiKey}`,
      dataHandler: (result) => {
        let data = []
        for (item of result.results)
          data.push({ title: item.title, content: item.abstract })
        return data
      }
    },
    search: {
      request: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${ApiKey}`,
      dataHandler: (result) => {
        let data = []
        for (item of result.response.docs)
          data.push({ title: item.headline.main, content: item.abstract })
        return data
      }
    }
  }

  // Call the API and convert the response to JSON and update the state with the article data
  const search = async () => {
    // Determine the API request type for this search
    // If the search query is empty, use the topstories API request, otherwise use the search API request
    const action = query.length > 0 ? type.search : type.topstories
    try {
      // Call the API and convert the response to JSON
      const response = await fetch(action.request)
      const result = await response.json()
      // Check if the response is successful
      if (response.status !== 200) {
        Alert.alert('Error', result.fault.faultstring)
        return
      }
      // Update the state with the article data with corresponding data handler
      setData(action.dataHandler(result))
    } catch (error) {
      // Handle any errors that occur during the API call and conversion to JSON
      Alert.alert('Error', error.message)
    }
  }

  // Display the search results when the app is first loaded
  useEffect(() => {
    search()
  }, [])

  // The app's UI contains a text input for the search query, a button to trigger the search, and a FlatList to display the results
  // In the FlatList, each item is a Pressable that displays the article title and content
  return (
    <View style={styles.mainScreen}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.searchInput}
          placeholder='Enter text to search on NY Times'
          onChangeText={setQuery}
        />
        <Button
          color='#003b69'
          title="Search"
          onPress={search}
        />
      </View>
      <FlatList
        style={styles.resultArea}
        data={data}
        renderItem={({ item }) => (
          < Pressable
            style={styles.item}
            onPress={() => Alert.alert(item.title, item.content)}
          >
            <Text style={styles.itemTitle}>
              {item.title}
            </Text>
          </Pressable >
        )}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    margin: 3
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 20,
    margin: 3,
  },
  resultArea: {
    margin: 3
  },
  item: {
    backgroundColor: '#525252',
    padding: 10,
    margin: 3
  },
  itemTitle: {
    color: 'white',
    fontSize: 20
  }
})