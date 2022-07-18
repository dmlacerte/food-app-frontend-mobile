import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    foodItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: 350,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        padding: 5,
        justifyContent: "space-between",
    },
    pageTitle: {
        fontSize: 30,
        marginBottom: 10,
    },
    subtext: {
        color: "gray",
    },
    pantrySubtext: {
        color: "gray",
        marginBottom: 5,
    }
});

export default styles; 