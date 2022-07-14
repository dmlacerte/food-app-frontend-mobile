import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MyPantry = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Pantry Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MyPantry; 