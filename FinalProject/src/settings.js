import { StyleSheet } from 'react-native';

// Define the styles for the components
export const styles = StyleSheet.create({
    // Main Screen
    mainScreen: {
        flex: 1,
        backgroundColor: '#2b7792',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainScreenButtonView: {
        margin: 2,
        height: 40,
        width: '90%',
        flexDirection: 'column',
    },

    // Weather Widget
    weatherView: {
        margin: 2,
        backgroundColor: '#5461d4',
        height: 160,
        width: '90%',
        alignItems: 'center',
        borderRadius: 20,
    },
    weatherTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        margin: 5,
    },
    weatherText: {
        padding: 1,
        margin: 1,
        fontSize: 14,
        color: 'white',
    },
    // Quote Widget
    quoteView: {
        backgroundColor: '#a13d3d',
        margin: 2,
        height: 100,
        width: '90%',
        alignItems: 'center',
        padding: 5,
        borderRadius: 20,
    },
    quoteTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        margin: 5,
    },
    quoteText: {
        padding: 1,
        margin: 1,
        fontSize: 12,
        color: 'white',
    },
    // Calories Setter Widget
    caloriesSetterView: {
        backgroundColor: '#349b9e',
        margin: 2,
        height: 125,
        width: '90%',
        alignItems: 'center',
        borderRadius: 20,
    },
    caloriesSetterTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        margin: 5,
    },
    caloriesSetterInputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    caloriesSetterInput: {
        height: 38,
        width: 80,
        borderWidth: 1,
        borderColor: 'white',
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        margin: 3,
    },

    // Session Photo Widget
    sessionPhotoView: {
        backgroundColor: '#41414162',
        margin: 2,
        height: 180,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Subsession Widget
    subsessionWidget: {
        margin: 2,
        height: '70%',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    subsessionWidgetLeft: {
        margin: 1,
        height: '90%',
        width: '49%',
        alignItems: 'center',
    },
    subsessionWidgetRight: {
        margin: 1,
        height: '90%',
        width: '49%',
        alignItems: 'center',
    },
    subsessionTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        margin: 5,
    },
    subsessionList: {
        backgroundColor: '#41414138',
        width: '100%',
        borderRadius: 20,
    },
    subsessionItem: {
        backgroundColor: '#dbcc9dff',
        margin: 2,
        padding: 8,
        width: '100%',
        borderRadius: 20,
    },
    subsessionItemText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
    },
    subsessionTypeView: {
        width: 150,
        height: 100,
    },
    subsessionSessionInfoView: {
        alignItems: 'center',
        width: '100%',
    },
    subsessionSessionInfo: {
        height: 312,
        width: '100%',
    },
    subsessionWidgetButton: {
        margin: 2,
        height: '10%',
        width: '100%',
        flexDirection: 'column'
    },
    // Session Widget
    sessionInfoWidget: {
        backgroundColor: '#349b9e',
        margin: 2,
        height: 160,
        padding: 5,
        width: '90%',
        alignItems: 'center',
        borderRadius: 20,
    },
    sessionInfoTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    sessionInfoText: {
        color: 'white',
        fontSize: 16,
    },
    sessionInfoWidget2: {
        backgroundColor: '#349b9e',
        margin: 2,
        width: '100%',
        height: '100%',
        paddingTop: 20,
        alignItems: 'center',
        borderRadius: 20,
    },
    sessionInfoTitle2: {
        margin: 2,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    sessionInfoText2: {
        margin: 2,
        color: 'white',
        fontSize: 11,
    },
    // Session History Widget
    sessionHistoryWidget: {
        margin: 2,
        height: '90%',
        width: '100%',
        alignItems: 'center',
    },
    sessionHistoryWidgetTitle: {
        margin: 2,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    sessionHistoryList: {
        backgroundColor: '#41414196',
        width: '100%',
    },
    sessionHistoryItem: {
        backgroundColor: '#5b68b196',
        margin: 2,
        width: '100%',
        height: 100,
        flexDirection: 'row',
    },
    sessionHistoryImageArea: {
        backgroundColor: '#8a8a8a96',
        height: '100%',
        width: 120,
    },
    sessionHistoryTextArea: {
        paddingLeft: 5,
    },
    sessionHistoryTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    sessionHistoryText: {
        color: 'white',
        fontSize: 11,
    },
    sessionHistoryGoalView: {
        position: 'absolute',
        right: 10,
        top: 0
    },
    sessionHistoryGoalText: {
        color: 'gold',
        fontSize: 10,
        fontWeight: 'bold'
    },

    // Storage Widget
    storageWidgetView: {
        height: '100%',
        width: '90%',
    },
    storageWidgetButtonView: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    storageWidgetButton: {
        backgroundColor: '#417ef0',
        width: '32%',
        height: '100%',
        justifyContent: 'center',
    },
    storageWidgetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

// Define the screen options for the navigation
export const screenOptions = {
    default: {
        headerShown: true,
        headerStyle: {
            backgroundColor: '#2596be',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
        },
        headerTitleAlign: 'center',
    }
}