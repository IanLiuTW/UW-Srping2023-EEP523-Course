import axios from 'axios';
import * as React from 'react';
import { Text, View } from 'react-native';
// import the stylesheets and options
import { styles } from './settings.js';

// OpenWeatherMap API Settings
const quotableEndpoint = 'https://api.quotable.io/random'


// The widget in main screen
export const QuoteWidget = (props) => {
    // Declare the variables
    const [quote, setQuote] = React.useState('')

    // Query the Quotable API to get the quote
    const queryQuotableApi = async () => {
        try {
            const response = await axios.get(quotableEndpoint, {
                params: { tags: 'Motivational' } // Only query the motivational quotes
            })
            // Set the quote state to include the quote and the author
            setQuote(response.data.content + ' - ' + response.data.author)
        } catch (error) { // If something goes wrong or the API returns not 2XX response, show the error message 
            console.log(error)
            props.showToast('error', 'Quote API Error', 'Unknown error. Please try again later.')
        }
    }

    // Automatically query a random quote when the app is loaded
    React.useEffect(() => { queryQuotableApi() }, [])

    // The widget includes the title and the quote
    return (
        <View style={styles.quoteView}>
            <Text style={styles.quoteTitle}>Quote of the Day</Text>
            <Text style={styles.quoteText}>{quote}</Text>
        </View>
    )
}