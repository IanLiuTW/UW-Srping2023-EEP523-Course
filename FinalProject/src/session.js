import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
// import the stylesheets and options
import { styles } from './settings.js';
// import the modules
import { getCaloriesFromStorage } from './calories.js';
import { getSessionPhotoFromStorage } from './sessionPhoto.js';
import { getSubsessionsFromStorage } from './subsession.js';
import { FadeInView, getData, minutes_to_time, storeData } from './utilities.js';


// The widget in main screen
export const SessionInfoWidget = (props) => {
    // Declare the variables
    const [session, setSession] = React.useState({})

    // Get the data from the storage and set the session
    const setSessionFromStorage = async () => {
        const data = await getSessionsFromStorage(props.date)
        setSession(data)
    }

    // Refresh the session data when the screen is focused 
    // useFocusEffect is needed because the screen is not re-rendered when the user navigates back to it
    useFocusEffect(
        React.useCallback(() => {
            setSessionFromStorage()
        }, [])
    )

    // The widget includes the session information
    return (
        <View style={styles.sessionInfoWidget}>
            <Text style={styles.sessionInfoTitle}>Date: {session.date}</Text>
            <Text style={styles.sessionInfoTitle}>Total Time: {session.total_time} mins</Text>
            <Text style={styles.sessionInfoText}>Calories Goal: {session.calories} kcals</Text>
            <Text style={styles.sessionInfoText}>Calories Burned: {session.calories_burned} kcals</Text>
            <Text style={styles.sessionInfoText}>Calories Left: {session.calories_left} kcals</Text>
            <Text style={styles.sessionInfoText}>Est. Time Left: {session.est_time_left} mins</Text>
        </View>
    )
}

// The widget in Subsession screen
export const SessionInfoWidget2 = (props) => {
    // Declare the variables
    const [session, setSession] = React.useState({})

    // Get the data from the storage and set the session
    const setSessionFromStorage = async () => {
        const data = await getSessionsFromStorage(props.date)
        setSession(data)
    }

    // Refresh the session data when the startTime is changed
    React.useEffect(
        React.useCallback(() => {
            setSessionFromStorage()
        }, [props.startTime])
    )

    // The widget includes the session information
    return (
        <View style={styles.sessionInfoWidget2}>
            <Text style={styles.sessionInfoTitle2}>Date: {session.date}</Text>
            <Text style={styles.sessionInfoTitle2}>Total Time: {session.total_time} mins</Text>
            <Text style={styles.sessionInfoText2}></Text>
            <Text style={styles.sessionInfoText2}>Calories Goal:</Text>
            <Text style={styles.sessionInfoText2}>{session.calories} kcals</Text>
            <Text style={styles.sessionInfoText2}>Calories Burned:</Text>
            <Text style={styles.sessionInfoText2}>{session.calories_burned} kcals</Text>
            <Text style={styles.sessionInfoText2}>Calories Left:</Text>
            <Text style={styles.sessionInfoText2}>{session.calories_left} kcals</Text>
            <Text style={styles.sessionInfoText2}>Est. Time Left:</Text>
            <Text style={styles.sessionInfoText2}>{session.est_time_left} mins</Text>
        </View>
    )
}

// The widget in History screen
export const SessionHistoryWidget = (props) => {
    // Define the variables
    const [sessions, setSessions] = React.useState([])
    const [sessionPhotos, setSessionPhotos] = React.useState({})

    // Get the data from the storage and set the sessions and session photos
    const setSessionFromStorage = async () => {
        // Recalculate the session data before getting the data from the storage
        await setSessionToStorage(props.date)
        const data = await checkSessionStorage(props.date)
        // Sort the keys by date and put the data into the sessions and session photos based on the date
        let dates = Object.keys(data).sort().reverse(), temp_sessions = [], temp_photos = {}
        for (let i = 0; i < dates.length; i++) {
            temp_sessions.push(data[dates[i]])
            temp_photos[dates[i]] = await getSessionPhotoFromStorage(dates[i])
        }
        setSessions(temp_sessions)
        setSessionPhotos(temp_photos)
    }

    // Refresh the session data when the last operation is changed
    React.useEffect(() => {
        setSessionFromStorage()
    }, [props.lastOperation])

    // The widget includes the session history that is sorted by date
    return (
        <View style={styles.sessionHistoryWidget}>
            <Text style={styles.sessionHistoryWidgetTitle}>Session History</Text>
            <FlatList
                style={styles.sessionHistoryList}
                data={sessions} renderItem={({ item }) => (
                    <FadeInView style={styles.sessionHistoryItem}>
                        <View style={styles.sessionHistoryImageArea}>
                            {sessionPhotos[item.date] != '' ? <Image style={{ width: 120, height: 100, flex: 1, resizeMode: 'contain' }} source={{ uri: `data:image/jpeg;base64,${sessionPhotos[item.date]}` }} /> : null}
                        </View>
                        <View style={styles.sessionHistoryTextArea}>
                            <Text style={styles.sessionHistoryTitle}>Date: {item.date}</Text>
                            <Text style={styles.sessionHistoryTitle}>Total Time: {item.total_time} mins</Text>
                            <Text style={styles.sessionHistoryText}>Calories Goal: {item.calories} kcals</Text>
                            <Text style={styles.sessionHistoryText}>Calories Burned: {item.calories_burned} kcals</Text>
                            <Text style={styles.sessionHistoryText}>Calories Left: {item.calories_left} kcals</Text>
                            <Text style={styles.sessionHistoryText}>Est. Time Left: {item.est_time_left} mins</Text>
                        </View>
                        {item.calories_left <= 0 && item.calories != 0 ? (
                            <View style={styles.sessionHistoryGoalView}>
                                <Text style={styles.sessionHistoryGoalText}> Goal Reached 🚀</Text>
                            </View>
                        ) : null}
                    </FadeInView>
                )}
            />
        </View>
    )
}


// Get the sessions from the storage
export const getSessionsFromStorage = async (date) => {
    let data = await checkSessionStorage(date)
    if (!(date in data[date])) {
        await setSessionToStorage(date)
        data = await checkSessionStorage(date)
    }
    return data[date]
}

// Check the sessions in the storage and set the default value
const checkSessionStorage = async (date) => {
    let data = await getData('sessions')
    // If the data is null or the date is not in the data, set the data to the default value
    if (data === null) data = {}
    if (!(date in data)) data[date] = {}
    return data
}

// Set the session to the storage
export const setSessionToStorage = async (date) => {
    // Get the subsessions and calories from the storage
    const subsessions = await getSubsessionsFromStorage(date)
    const calories = await getCaloriesFromStorage(date)

    // Calculate the total time and calories burned
    let activityMinutes = 0, caloriesBurned = 0.0
    for (let i = 0; i < subsessions.length; i++) {
        activityMinutes += parseInt(subsessions[i].duration)
        caloriesBurned += parseFloat(subsessions[i].calories_burned)
    }

    // Calculate the estimated time left based on the average calories burned
    const get_est_time_left = (calories, caloriesBurned, activityMinutes) => {
        if (activityMinutes == 0) return 'N/A'
        const time_left = Math.max(0, (calories - caloriesBurned) / (caloriesBurned / activityMinutes))
        return minutes_to_time(time_left)
    }

    // Create the session information
    const sessionInfo = {
        date: date,
        total_time: minutes_to_time(activityMinutes),
        calories: calories,
        calories_burned: caloriesBurned.toFixed(2),
        calories_left: (Math.max(0, calories - caloriesBurned)).toFixed(2),
        est_time_left: get_est_time_left(calories, caloriesBurned, activityMinutes)
    }

    // Update the session information in the storage
    const data = await checkSessionStorage(date)
    data[date] = sessionInfo
    await storeData('sessions', data)
}