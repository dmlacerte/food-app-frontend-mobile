import React from 'react';
import { Button } from 'react-native-paper';

const AddToMealPlanButton = ({ index, value, changeUseThisWeekValue }) => {

    return (
        <>
            <Button
                style={{ backgroundColor: value ? "green" : "gray" }}
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