import axios from 'axios';
import * as React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RNShake from 'react-native-shake';
// import the stylesheets and options
import { styles } from './settings.js';
// import the modules
import { SessionInfoWidget2, setSessionToStorage } from './session.js';
import { FadeInView, getData, get_delta_minutes, get_time, storeData } from './utilities.js';

// Calories Burned API Settings and Activity Options
import { ApiNinjaApiKey } from './creds.js';
const caloriesBurnedApiEndpoint = 'https://api.api-ninjas.com/v1/caloriesburned'
const ACTIVITY_OPTIONS = [
    { 'label': "Cycling", 'value': "Cycling" },
    { 'label': "Lifting", 'value': "Lifting" },
    { 'label': "Running", 'value': "Run" },
    { 'label': "Basketball", 'value': "Basketball" },
    { 'label': "Baseball", 'value': "Baseball" },
    { 'label': "Football", 'value': "Football" },
    { 'label': "Golf", 'value': "Golf" },
    { 'label': "Soccer", 'value': "Soccer" },
    { 'label': "Ping Pong", 'value': "Ping Pong" },
    { 'label': "Volleyball", 'value': "Volleyball" },
    { 'label': "Skiing", 'value': "Skiing" },
]


// The widget in Subsession screen
export const SubsessionWidget = (props) => {
    // Declare the variables
    const [caloriesBurnedPerMinute, setCaloriesBurnedPerMinute] = React.useState(0);
    const [startTime, setStartTime] = React.useState(null);
    const [subsessions, setSubsessions] = React.useState([]);
    // variables for DropDownPicker
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState(ACTIVITY_OPTIONS);

    // Query the external API to get the calories burned per minute on the selected activity
    const queryCaloriesBurnedPerMinute = async () => {
        if (value === null)
            return
        try {
            const response = await axios.get(caloriesBurnedApiEndpoint, {
                params: { activity: value }, // query the selected activity
                headers: { 'X-Api-Key': ApiNinjaApiKey }
            })
            // Set the calories burned per minute state
            setCaloriesBurnedPerMinute(response.data[0].calories_per_hour / 60)
        } catch (error) { // If something goes wrong or the API returns not 2XX response, show the error message 
            console.log(error.response)
            props.showToast('error', 'Calories Burned API Error', 'Unknown error. Please try again later.')
        }
    }

    // Save the subsession to the storage
    const logSubsession = async (startTime, endTime, delta, type, caloriesBurnedPerMins) => {
        // Create the subsession entry
        const entry = {
            'start_time': startTime,
            'end_time': endTime,
            'duration': delta,
            'type': type,
            'calories_burned': (delta * caloriesBurnedPerMins).toFixed(2)
        }
        // Save the subsession entry to the storage and reload the subsessions
        await setSubsessionToStorage(props.date, entry)
        await loadSubsessions()
        // Update the session info in the storage
        await setSessionToStorage(props.date)
    }

    // Load the subsessions from the storage
    const loadSubsessions = async () => {
        const subsessions = await getSubsessionsFromStorage(props.date)
        setSubsessions(subsessions)
    }

    // Start or end the subsession
    const buttonAction = () => {
        // If the start time is null, start the subsession
        if (startTime === null) {
            // If the activity is not selected, show the error message
            if (value === null) {
                props.showToast('error', 'Calories Burned', 'Please select an activity!')
                return
            }
            // Start the subsession and show the message
            props.showToast('info', 'Calories Burned', `Session started at ${get_time()}`)
            setStartTime(get_time())
            // setStartTime(get_time_one_hour_ago())
        }
        else {
            // Get the end time and calculate the delta
            const endTime = get_time()
            const delta = get_delta_minutes(startTime, endTime)
            // If the delta is less than 1 minute or the activity is not selected, show the error message
            if (delta < 1 || value === null) {
                props.showToast('error', 'Calories Burned', 'Please select an activity and work out for at least 1 minute!')
                return
            }
            // End and save the subsession and show the message, clear the start time
            logSubsession(startTime, endTime, delta, value, caloriesBurnedPerMinute)
            props.showToast('info', 'Calories Burned', `You have burned ${delta * caloriesBurnedPerMinute} calories!`)
            setStartTime(null)
        }
    }

    // Get the button text based on the start time, it will show the start time to the user if started
    const getButtonText = () => {
        return `${startTime === null ? 'Start Session' : 'End Session'} ( Shake the Phone! ) \n  ${startTime === null ? '' : `[ Session started at ${startTime} ]`}`
    }

    // Load the subsessions when the component is mounted
    React.useEffect(() => {
        loadSubsessions()
    }, [])

    // Query the calories burned per minute when activity is changed
    React.useEffect(() => {
        queryCaloriesBurnedPerMinute()
    }, [value])

    // Add the shake listener when the component is mounted
    React.useEffect(() => {
        const subscription = RNShake.addListener(
            buttonAction // Call the button action when the phone is shaken i.e. help the user press the button
        )
        return () => { subscription.remove() }
    }, [value, startTime])


    // The widget contains the activity selection, start/end button, session info widget, and the subsession list
    return (
        <View style={styles.subsessionWidget}>
            <View style={styles.subsessionWidgetLeft}>
                <Text style={styles.subsessionTitle}>Subsessions</Text>
                <FlatList
                    style={styles.subsessionList}
                    data={subsessions} renderItem={({ item }) => (
                        <FadeInView style={styles.subsessionItem}>
                            <Text style={styles.subsessionItemText}>Start Time: {item.start_time}</Text>
                            <Text style={styles.subsessionItemText}>End Time: {item.end_time}</Text>
                            <Text style={styles.subsessionItemText}>Duration: {item.duration} mins</Text>
                            <Text style={styles.subsessionItemText}>Calories Burned: {item.calories_burned} kcals</Text>
                            <Text style={styles.subsessionItemText}>Activity: {item.type}</Text>
                        </ FadeInView>
                    )}
                />
            </View >
            <View style={styles.subsessionWidgetRight}>
                <View style={styles.subsessionTypeView}>
                    <Text style={styles.subsessionTitle}>Subsession Type</Text>
                    <DropDownPicker
                        open={open} value={value} items={items}
                        setOpen={setOpen} setValue={setValue} setItems={setItems}
                        listMode="MODAL" labelProps={{ numberOfLines: 2, }}
                    />
                </View>
                <View style={styles.subsessionSessionInfoView}>
                    <Text style={styles.subsessionTitle}>Session Info</Text>
                    <View style={styles.subsessionSessionInfo}>
                        <SessionInfoWidget2 showToast={props.showToast} date={props.date} trigger={startTime} />
                    </View>
                </View>
            </View>
            <View style={styles.subsessionWidgetButton}>
                <Button title={getButtonText()} onPress={buttonAction} />
            </View>
        </View >
    );
}

// Set the subsession to the storage
export const setSubsessionToStorage = async (date, subsession) => {
    // First get the data from the storage
    let data = await getData('subsessions')
    // If the data is null or the date is not in the data, set the data to the default value
    if (data === null)
        data = {}
    if (!(date in data))
        data[date] = []
    // Set the data and store it back to the storage
    data[date].push(subsession)
    await storeData('subsessions', data)
}

// Get the subsessions from the storage
export const getSubsessionsFromStorage = async (date) => {
    // First get the data from the storage
    let data = await getData('subsessions')
    // If the data is null or the date is not in the data, set the data to the default value
    if (data === null)
        data = {}
    if (!(date in data))
        data[date] = []
    // Store the data back to the storage
    return data[date]
}