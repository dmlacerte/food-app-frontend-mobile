import React, { useState, useEffect } from "react";
import MealPlanDataService from "../../../services/MealPlanDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../../../Styles';

const MyPlan = ({ day, time, closeModal }) => {

    const initialMealPlanState = {
        id: null,
        day: day,
        time: time,
        description: ""
    };

    const [selectedMealPlan, setSelectedMealPlan] = useState(initialMealPlanState);
    const dropdownDataDay = [
        { label: day, value: day },
    ];
    const dropdownDataTime = [
        { label: time, value: time },
    ];

    const retrieveMealPlan = () => {
        MealPlanDataService.get(day, time)
            .then(response => {
                response ? setSelectedMealPlan(response.data) : setSelectedMealPlan(null);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = (name, value) => {
        setSelectedMealPlan({ ...selectedMealPlan, [name]: value });
    };

    const updateMealPlan = () => {
        MealPlanDataService.update(selectedMealPlan.id, selectedMealPlan)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteMealPlan = () => {
        MealPlanDataService.remove(selectedMealPlan.id)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveMealPlan();
    }, []);

    return (
       <View>
           <Text style={styles.pageTitle}>Edit Meal Plan Item</Text>
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
                value={selectedMealPlan.description}
                onChangeText={text => handleInputChange('description', text)}
                multiline
                numberOfLines={7}
                style={{ height: 100 }}
            />
            <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "green", width: 100 }}
                    raised
                    onPress={updateMealPlan}
                >
                    Update
                </Button>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "indianred", width: 100, marginLeft: 5 }}
                    raised
                    onPress={deleteMealPlan}
                >
                    Delete
                </Button>
            </View>
       </View>
    );
};

export default MyPlan;