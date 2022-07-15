import * as React from 'react';
import { useState, useEffect } from "react";
import FoodManagerDataService from "../../services/FoodManagerDataService";
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import ModalContainer from '../components/ModalContainer.js';
import AddToMealPlanButton from '../components/AddToMealPlanButton.js';
import styles from '../../Styles';

const MyPantry = ({ navigation }) => {

    const [foodItems, setFoodItems] = useState([]);

    const compareItems = (a, b) => {
        const itemA = a.name.toUpperCase();
        const itemB = b.name.toUpperCase();

        let compare = 0;
        if (itemA > itemB) {
            compare = 1;
        } else if (itemA < itemB) {
            compare = -1;
        }

        return compare;
    };

    const retrieveFoodItems = () => {
        FoodManagerDataService.getAll()
            .then(response => {
                let newFoodItems = response.data;
                if (newFoodItems.length > 0) newFoodItems.sort(compareItems);
                setFoodItems(newFoodItems);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const calcDate = (expDateStr) => {
        const expDate = new Date(expDateStr);
        const expDateTime = expDate.getTime();

        const today = new Date();

        return (Math.floor((expDateTime - today) / (24 * 3600 * 1000)) + 1);
    };

    const changeUseThisWeekValue = (index) => {
        const changeID = foodItems[index].id;
        const newValue = !(foodItems[index].useThisWeek);
        let newArray = foodItems.map(element => element.id == changeID ? { ...element, useThisWeek: newValue } : element);
        setFoodItems(newArray);

        FoodManagerDataService.updateUseThisWeek(changeID, newValue)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveFoodItems();
    }, []);
    
    return (
        <View style={styles.container}>
            <Text>My Pantry</Text>
            <Text>Select ✓ to add to weekly meal plan.</Text>
            <ModalContainer />
            {foodItems &&
                foodItems.map((foodItem, index) => (
                        <View key={index} style={{ flexDirection: "row", alignItems: "center", width: 350 }}>
                            <View>
                                <Text>{foodItem.name}</Text>
                                <Text>{foodItem.type} | Days to Exp: {calcDate(foodItem.expDate)}</Text>
                            </View>
                            <AddToMealPlanButton 
                                index={index}
                                value={foodItem.useThisWeek}
                                changeUseThisWeekValue={changeUseThisWeekValue}
                            />
                            <Button style={{ backgroundColor: "gray" }} raised onPress={() => console.log('Pressed')}>
                                Update
                            </Button>
                        </View>
                ))}
        </View>
    )
}

export default MyPantry; 