import * as React from 'react';
import { useState, useEffect } from "react";
import { TouchableHighlight, View, Text, Touchable } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../Styles';
import ModalContainer from '../components/ModalContainer.js';
import MealPlanDataService from "../../services/MealPlanDataService";
import DropdownComponent from '../components/DropdownComponent.js';

const MealPlan = () => {
    const [mealPlanItems, setMealPlanItems] = useState([]);
    const [selectedDay, setSelectedDay] = useState("Monday");
    const dropdownData = [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' },
    ];

    const retrieveMealPlanItems = () => {
        MealPlanDataService.getAll()
            .then(response => {
                let newMealPlanItems = response.data ? response.data.filter(item => item.day === selectedDay) : null;
                setMealPlanItems(newMealPlanItems);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeAllMealPlanItems = () => {
        MealPlanDataService.removeAll()
            .then(response => {
                console.log(response.data);
                retrieveMealPlanItems();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findDescription = (time) => {
        const filteredMealPlanItems = mealPlanItems 
        ? mealPlanItems.filter(item => item.time === time)
        : null;

        return filteredMealPlanItems && filteredMealPlanItems.length > 0 
        ? filteredMealPlanItems[0].description
        : null;
    };

    useEffect(() => {
        retrieveMealPlanItems();
    }, [selectedDay]);

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Weekly Meal Planner</Text>
            <Button style={{ borderWidth: 1, borderColor: "red", marginLeft: 5 }} raised onPress={() => removeAllMealPlanItems()}>
                Remove All
            </Button>
            <View style={{ flexDirection: "row" }}>
                <DropdownComponent
                    updateFunction={setSelectedDay}
                    dropdownData={dropdownData}
                    placeholder={selectedDay}
                    width={200}
                />
            </View>
            <View>
                <View style={styles.mealPlanRow}>
                    <Text>Breakfast</Text>
                    <ModalContainer 
                        triggerText={findDescription('Breakfast')}
                        category="Meal Plan"
                        day={selectedDay}
                        time="Breakfast"
                        retrieveItems={retrieveMealPlanItems}
                    />
                </View>
                <View style={styles.mealPlanRow}>
                    <Text>Lunch</Text>
                    <ModalContainer 
                        triggerText={findDescription('Lunch')}
                        category="Meal Plan"
                        day={selectedDay}
                        time="Lunch"
                        retrieveItems={retrieveMealPlanItems}
                    />
                </View>
                <View style={styles.mealPlanRow}>
                    <Text>Dinner</Text>
                    <ModalContainer 
                        triggerText={findDescription('Dinner')}
                        category="Meal Plan"
                        day={selectedDay}
                        time="Dinner"
                        retrieveItems={retrieveMealPlanItems}
                    />
                </View>
                <View style={styles.mealPlanRow}>
                    <Text>Snacks</Text>
                    <ModalContainer 
                        triggerText={findDescription('Snacks')}
                        category="Meal Plan"
                        day={selectedDay}
                        time="Snacks"
                        retrieveItems={retrieveMealPlanItems}
                    />
                </View>
            </View>
        </View>
    )
}

export default MealPlan; 