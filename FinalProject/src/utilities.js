import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as React from 'react';
import { Animated } from 'react-native';
import Toast from 'react-native-toast-message';

// Helper function to show the toast message
export const showToast = (type, title, msg) => { Toast.show({ type: type, text1: title, text2: msg, visibilityTime: 3000 }) }

// A helper function to store data in the local storage
export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log(e)
    }
}

// A helper function to get data from the local storage
export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}

// A helper function to remove data from the local storage
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log(e)
    }
}

// A helper function to get data from the local storage in string format
export const getDataString = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue
    } catch (e) {
        console.log(e)
    }
}

// A helper function to store data in the local storage in string format
export const storeDataString = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e)
    }
}

// A helper function to get all keys from the local storage
export const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
    } catch (e) {
        console.log(e)
    }
    return keys
}

// A helper function to get the current date in the format of YYYY-MM-DD
export const get_date = () => {
    return moment().format('YYYY-MM-DD')
}

// A helper function to get the current time in the format of HH:mm:ss
export const get_time = () => {
    return moment().format('HH:mm:ss')
}

// A helper function to get the time one hour ago in the format of HH:mm:ss
export const get_time_one_hour_ago = () => {
    return moment().subtract(1, 'hours').format('HH:mm:ss')
}

// A helper function to get the difference between two time in minutes
export const get_delta_minutes = (start_time, end_time) => {
    let start = moment(start_time, 'HH:mm:ss')
    let end = moment(end_time, 'HH:mm:ss')
    return end.diff(start, 'minutes')
}

// A helper function to format the minutes to HH:mm:ss
export const minutes_to_time = (minutes) => {
    return moment().startOf('day').add(minutes, 'minutes').format('HH:mm:ss')
}

export const FadeInView = props => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim, // Bind opacity to animated value
            }}>
            {props.children}
        </Animated.View>
    );
};