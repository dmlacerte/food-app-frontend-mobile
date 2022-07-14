import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MyGrocery = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Grocery Page</Text>
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

export default MyGrocery; 