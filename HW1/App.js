import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

// Item component
// This is a component that renders a single item in the list
const Item = ({ title }) => (
  <View
    style={{
      backgroundColor: '#FFFAF0',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16
    }} >
    <Text
      style={{ fontSize: 20 }}>
      {title}
    </Text>
  </View >
);

// App component
// This is the main component that renders the whole app
const App = () => {
  // data is the list of items
  const [data, setData] = useState([{ title: "Item 1" }, { title: "Item 2" }, { title: "Item 3" }]);
  // new_title is the title of the new item
  const [new_title, setNewTitle] = useState("New Item");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      }}>

      {/* Display "Hello World! 🎉" */}
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          color: 'black',
          backgroundColor: 'lightblue',
          textAlign: 'center',
        }}>
        Hello World! 🎉
      </Text>

      {/* Display the list */}
      <FlatList
        style={{
          backgroundColor: 'azure',
        }}
        data={data}
        renderItem={({ item }) => <Item title={item.title} />}
      />
      {/* Display the total number of items */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'right',
        }}>
        Total items: {data.length}
      </Text>

      {/* Display the input box and buttons */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            padding: 8,
          }}>
          New Item Title:
        </Text>
        <TextInput
          style={{
            flex: 1,
            color: 'black',
            height: 50,
            fontSize: 24,
            margin: 12,
            borderWidth: 1,
          }}
          onChangeText={newText => setNewTitle(newText)}
          defaultValue={new_title}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 50,
          margin: 12,
        }}>
        <Button
          style={{
            flex: 1,
            marginHorizontal: 8,
            paddingHorizontal: 8,
          }}
          title="Add Item"
          onPress={() => { setData([...data].concat({ title: new_title })) }}
        />
        <Button
          style={{
            flex: 1,
            marginHorizontal: 8,
            paddingHorizontal: 8,
          }}
          title="Remove Item"
          onPress={() => { setData([...data].slice(0, -1)) }}
        />
      </View>
    </View>
  );
};

export default App;