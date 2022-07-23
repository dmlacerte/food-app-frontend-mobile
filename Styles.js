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
        backgroundColor: "green",
        alignSelf: "stretch",
        textAlign: "center",
        padding: 10,
        color: "white",
    },
    subTitle: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
        backgroundColor: "slategray",
        alignSelf: "stretch",
        textAlign: "center",
        padding: 10,
        color: "white",
        width: 350,
    },
    subtext: {
        color: "gray",
    },
    pantrySubtext: {
        color: "gray",
        marginBottom: 5,
    },
    modalCategory: {
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
    },
    modalText: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    mealPlanRow: {
        flexDirection: "row", 
        width: 350,
        minHeight: 75,
        borderWidth: 1, 
        borderColor: "lightgray",
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
    addButton: {
        borderWidth: 1, 
        borderColor: "green",
    },
    editButton: {
        borderWidth: 1, 
        borderColor: "gray",
    },
    mealPlanSpace: {
        width: 240,
        minHeight: 75,
        justifyContent: "center",
        alignItems: "center",
    },
    mealPlanCategory: {
        fontWeight: 'bold',
        paddingLeft: 5,
    }
});

export default styles; 