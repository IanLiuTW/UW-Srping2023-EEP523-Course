// Import React and useState hook from 'react' package
import React, { useState } from 'react';

// Import various UI components and primitives from 'react-native' package
import {
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Define the App component as a functional component
const App = () => {
  // Declare the 'name' and 'setName' state variables with an initial empty string
  const [name, setName] = useState('');
  // Declare the 'email' and 'setEmail' state variables with an initial empty string
  const [email, setEmail] = useState('');

  // Define the handleSubmit function that will be called when the form is submitted
  const handleSubmit = () => {
    // Display an alert with the values of the 'name' and 'email' state variables
    alert(`Name: ${name}\nEmail: ${email}`);
  };

  // Render the component
  return (
    // Use a ScrollView as the main container for the component, allowing the user to scroll if the content overflows
    <ScrollView>
      // Create a View container to hold the form elements
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        // Render a Text component to display the form title
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Simple Form</Text>
        // Render an Image component with the source set to a remote image URL
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={{ width: 80, height: 80, marginBottom: 20 }}
        />
        // Render a TextInput component for the user to enter their name
        <TextInput
          style={{
            width: '80%',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
          }}
          onChangeText={setName} // Update the 'name' state variable when the text changes
          value={name} // Set the value of the input field to the current value of the 'name' state variable
          placeholder="Name" // Set a placeholder text for the input field
        />
        // Render a TextInput component for the user to enter their email
        <TextInput
          style={{
            width: '80%',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
          }}
          onChangeText={setEmail} // Update the 'email' state variable when the text changes
          value={email} // Set the value of the input field to the current value of the 'email' state variable
          placeholder="Email" // Set a placeholder text for the input field
          keyboardType="email-address" // Set the keyboard type to display an email-specific keyboard
        />
        // Render a Button component with a title and an onPress handler that calls the handleSubmit function
        <Button title="Submit" onPress={handleSubmit} />
        // Render a TouchableOpacity component with an onPress handler that clears the 'name' and 'email' state variables
        <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: 'blue',
            borderRadius: 5,
          }}
          onPress={() => {
            setName('');
            setEmail('');
          }}
        >
         // Render a Text component inside the TouchableOpacity to display the reset button label
          <Text style={{ color: 'white', textAlign: 'center' }}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Export the App component as the default export
export default App;
