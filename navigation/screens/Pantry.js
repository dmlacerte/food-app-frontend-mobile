import * as React from 'react';
import { useState, useEffect } from "react";
import FoodManagerDataService from "../../services/FoodManagerDataService";
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import ModalContainer from '../components/ModalContainer.js';
import DropdownComponent from '../components/DropdownComponent.js';
import AddToMealPlanButton from '../components/AddToMealPlanButton.js';
import styles from '../../Styles';

const Pantry = () => {

    const [foodItems, setFoodItems] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const dropdownData = [
        { label: 'All', value: 'All' },
        { label: 'Vegetable', value: 'Vegetable' },
        { label: 'Fruit', value: 'Fruit' },
        { label: 'Meat', value: 'Meat' },
        { label: 'Dairy', value: 'Dairy' },
        { label: 'Frozen', value: 'Frozen' },
        { label: 'Packaged', value: 'Packaged' },
        { label: 'Misc', value: 'Misc' },
    ];

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

    const removeAllFoodItems = () => {
        FoodManagerDataService.removeAll()
            .then(response => {
                console.log(response.data);
                retrieveFoodItems();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const calcDate = (expDateStr) => {
        const expDate = new Date(expDateStr.replace(/-/g, '\/'));
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
            <Text style={styles.pageTitle}>My Pantry</Text>
            <Text>Select to filter food by category:</Text>
            <View style={{ flexDirection: "row" }}>
                <DropdownComponent
                    updateFunction={setSelectedType}
                    dropdownData={dropdownData}
                    placeholder='Select type'
                    width={150}
                />
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <ModalContainer
                    triggerText="Add"
                    retrieveItems={retrieveFoodItems}
                />
                <Button style={{ borderWidth: 1, borderColor: "red", marginLeft: 5 }} raised onPress={() => removeAllFoodItems()}>
                    Remove All
                </Button>
            </View>
            <Text style={styles.pantrySubtext}>Select ✓ to add to weekly meal plan.</Text>
            {foodItems.length > 0 &&
                foodItems.map((foodItem, index) => (
                    !selectedType || selectedType === 'All' || selectedType === foodItem.type ?
                        <View key={index} style={styles.foodItemContainer}>
                            <View>
                                <Text>{foodItem.name}</Text>
                                <Text style={styles.subtext}>{foodItem.type} </Text>
                                <Text style={styles.subtext}>Days to Exp: {calcDate(foodItem.expDate)}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <AddToMealPlanButton
                                    index={index}
                                    value={foodItem.useThisWeek}
                                    changeUseThisWeekValue={changeUseThisWeekValue}
                                />
                                <View style={{ marginLeft: 5 }}>
                                    <ModalContainer
                                        id={foodItem.id}
                                        triggerText="Update"
                                        retrieveItems={retrieveFoodItems}
                                    />
                                </View>
                            </View>
                        </View>
                        : null
                ))}
        </View>
    )
}

export default Pantry; 