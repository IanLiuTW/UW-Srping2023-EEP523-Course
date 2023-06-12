import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
// import the stylesheets and options
import { styles } from './settings.js';
// import the modules
import { getData, storeData } from './utilities.js';


// The widget in Subsession screen
export const SessionPhotoWidget = (props) => {
    // Define the variables
    const [photoBase64, setPhotoBase64] = React.useState('');

    // Using the react-native-image-picker library to take a photo
    const takePhoto = () => {
        // Define the options for the image picker
        ImagePicker.launchCamera({
            cameraType: 'rear',
            mediaType: 'photo',
            maxHeight: 240,
            maxWidth: 160,
            includeBase64: true,
        }, async (image) => {
            // If the image is null, the user cancelled the camera action
            if (!image || !image.assets || !image.assets[0]) return;
            // Get the uri of the image
            image_uri = image.assets[0].uri;
            // Check if the picture is in portrait mode by checking the height and width of the image
            Image.getSize(image_uri, async (width, height) => {
                // If the image is in landscape mode, show a toast to the user and don't proceed
                if (height >= width) {
                    props.showToast('error', 'Session Photo Error', 'Please rotate your device to landscape mode.');
                    return
                }
                // Set the photo to the storage
                await setSessionPhotoToStorage(props.date, image.assets[0].base64)
                // Set the photo to the state
                await setSessionPhotoFromStorage(props.date)
            });
        })
    }

    // Set the photo from the storage value
    const setSessionPhotoFromStorage = async () => {
        const photo = await getSessionPhotoFromStorage(props.date)
        setPhotoBase64(photo)
    }

    // Automatically load the photo
    React.useEffect(() => { setSessionPhotoFromStorage() }, [])

    // The widget includes a button to take a photo the photo 
    return (
        <View style={styles.sessionPhotoView}>
            {photoBase64 != '' ? <Image style={{ width: 240, height: 180 }} source={{ uri: `data:image/jpeg;base64,${photoBase64}` }} /> : null}
            {photoBase64 === '' ? <Button title='Take a Session Photo' onPress={takePhoto} /> : null}
            {/* <Button title='Remove the Session Photo' onPress={async () => { removeData('sessionPhoto'); setSessionPhotoFromStorage() }} /> */}
        </View>
    )
}

// Set the session photo to the storage
export const setSessionPhotoToStorage = async (date, photo) => {
    // First get the data from the storage
    let data = await getData('sessionPhotos')
    // Set the data and store it back to the storage
    data[date] = photo
    await storeData('sessionPhotos', data)
}

// Get the photo from the storage
export const getSessionPhotoFromStorage = async (date) => {
    // First get the data from the storage
    let data = await getData('sessionPhotos')
    // If the data is null or the date is not in the data, set the data to the default value
    if (data === null)
        data = {}
    if (!(date in data))
        data[date] = ''
    // Store the data back to the storage
    await storeData('sessionPhotos', data)
    return data[date]
}