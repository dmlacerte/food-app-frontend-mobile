import React, { useState } from "react";
import MealPlanDataService from "../../../services/MealPlanDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import styles from '../../../Styles';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const AddMealPlan = ({ day, time, closeModal }) => {

    const initialMealPlanState = {
        id: null,
        day: day,
        time: time,
        description: ""
    };

    const [mealPlanToSubmit, setMealPlanToSubmit] = useState(initialMealPlanState);
    const dropdownDataDay = [
        { label: day, value: day },
    ];
    const dropdownDataTime = [
        { label: time, value: time },
    ];

    const handleInputChange = (name, value) => {
        setMealPlanToSubmit({ ...mealPlanToSubmit, [name]: value });
    };

    const saveMealPlan = () => {
        let data = {
            day: mealPlanToSubmit.day,
            time: mealPlanToSubmit.time,
            description: mealPlanToSubmit.description
        };

        MealPlanDataService.create(data)
            .then(response => {
                setMealPlanToSubmit({
                    id: response.data.id,
                    name: response.data.name,
                    type: response.data.type,
                    description: response.data.description
                });
                closeModal();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <View>
            <Text style={styles.pageTitle}>Add To Meal Plan</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.modalCategory}>Day:</Text>
                <DropdownComponent
                    dropdownData={dropdownDataDay}
                    placeholder={day}
                    width={150}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.modalCategory}>Time:</Text>
                <DropdownComponent
                    dropdownData={dropdownDataTime}
                    placeholder={time}
                    width={150}
                />
            </View>
            <Text style={styles.modalCategory}>Description:</Text>
            <TextInput
                label='Add meal plan notes:'
                value={mealPlanToSubmit.description}
                onChangeText={text => handleInputChange('description', text)}
                multiline
                numberOfLines={7}
                style={{ height: 100 }}
            />
            <Button
                style={{ borderWidth: 1, backgroundColor: "green", width: 100, alignSelf: "center", marginTop: 15 }}
                raised
                onPress={saveMealPlan}
            >
                Submit
            </Button>
        </View>
    );
};

export default AddMealPlan;