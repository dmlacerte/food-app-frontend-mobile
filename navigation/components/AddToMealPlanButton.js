import React from 'react';
import { Button } from 'react-native-paper';

const AddToMealPlanButton = ({ index, value, changeUseThisWeekValue }) => {

    return (
        <>
            <Button
                style={{ borderWidth: 1, borderColor: "black", backgroundColor: value ? "green" : "lightgray", }}
                raised
                onPress={() => {
                    changeUseThisWeekValue(index);
                }}>
                ✓
            </Button>
        </>
    )
}

export default AddToMealPlanButton;