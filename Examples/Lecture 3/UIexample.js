import * as React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    /*When a user presses down on the TouchableOpacity, it will reduce its opacity,
    creating a visual feedback that the user has pressed on it.
    When the user releases their touch, the opacity will return to its original state.*/
    TouchableOpacity
} from 'react-native';

/*This is the main library for navigation in React Native applications. 
It provides a set of navigators that help with routing and screen transitions. 
The NavigationContainer component is a key component provided by this library 
and is used to manage the navigation state of the app.*/
import { NavigationContainer } from '@react-navigation/native';

/*This library provides a stack navigator that allows screens to be stacked 
on top of each other, with the ability to navigate back and forth through the stack. 
The createStackNavigator function is a key function provided by this library 
that allows for creating a new stack navigator*/
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome to the Complex UI App!</Text>
            <Text style={styles.subtitle}>Press the button to explore more:</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Details')}>
                <Text style={styles.buttonText}>Go to Details</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function DetailsScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Details Screen</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Go back to Home</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{ headerShown: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1a73e8',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});