import useAxios from 'axios-hooks';
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  const [{ data, loading, error, response }, refetch] = useAxios(
    'https://reqres.in/api/users?delay=1'
  )

  if (loading)
    return (<Text>Loading...</Text>)
  if (error)
    return (<Text>Error!</Text>)

  return (
    <View>
      <Button title="Refetch" onClick={refetch} />
      <Text>{JSON.stringify(response, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

