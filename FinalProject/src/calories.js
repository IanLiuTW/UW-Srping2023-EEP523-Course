import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
// import the stylesheets and options
import { styles } from './settings.js';
// import the modules
import { getData, storeData } from './utilities.js';

// The default value for the calories
DEFAULT_CALORIES = 800


// The widget in main screen
export const CaloriesSetterWidget = (props) => {
    // Declare the variables
    const [calories, setCalories] = React.useState('800')

    // Update the calories in the storage
    const updateCalories = async (value) => {
        // Check if the input is a valid number or a positive number
        let calories = Number(value)
        try {
            if (isNaN(calories)) {
                throw new Error('Please input a valid number')
            }
            if (calories < 0) {
                throw new Error('Please input a positive number')
            }
        } catch (e) {
            // If the input is not valid, show the error message and set the calories to 800
            props.showToast('error', 'Calories Setting Error', e.message)
            calories = DEFAULT_CALORIES
        }
        // Store the calories in the storage
        await setCaloriesToStorage(props.date, calories)
        // Update the calories state after the storage is updated
        await setCaloriesFromStorage()
    }

    // Set the calories from the storage value
    const setCaloriesFromStorage = async () => {
        const calories = await getCaloriesFromStorage(props.date)
        setCalories(calories.toString())
    }

    // Automatically set the calories when the app is focused
    useFocusEffect(
        React.useCallback(() => {
            setCaloriesFromStorage()
        }, [])
    )

    // The widget includes a title, an input box and a unit
    return (
        <View style={styles.caloriesSetterView}>
            <Text style={styles.caloriesSetterTitle}>Before You Start</Text>
            <Text style={styles.caloriesSetterTitle}>Input the Goal Calories for Today</Text>
            <View style={styles.caloriesSetterInputView}>
                <TextInput
                    style={styles.caloriesSetterInput}
                    onChangeText={updateCalories}
                    value={calories}
                />
                <Text style={styles.caloriesSetterTitle}>kcals</Text>
            </View>
        </View>
    )
}

// Set the calories to the storage
export const setCaloriesToStorage = async (date, calories) => {
    const data = {}
    data[date] = calories
    await storeData('calories', data)
}

// Get the calories from the storage
export const getCaloriesFromStorage = async (date) => {
    // First get the data from the storage
    let data = await getData('calories')
    // If the data is null or the date is not in the data, set the data to the default value
    if (data === null)
        data = {}
    if (!(date in data)) {
        data[date] = DEFAULT_CALORIES
        await storeData('calories', data) // Set to the default value
    }
    return data[date]
}