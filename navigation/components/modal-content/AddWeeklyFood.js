import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../../../services/FoodManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const AddWeeklyFood = () => {

    const [food, setFood] = useState("");
    const [foodOptions, setFoodOptions] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [dropdownData, setDropdownData] = useState([]);

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
                let newFoodItems = response.data.filter(x => !x.useThisWeek);
                let newDropdownData = [];

                if (newFoodItems.length > 0) {
                    newFoodItems.sort(compareItems);
                    newFoodItems.map(foodItem => {
                        newDropdownData.push(
                            {
                            label: foodItem.name,
                            value: foodItem.name}
                        );
                    });
                } 

                setDropdownData(newDropdownData);
                setFoodOptions(newFoodItems);
                setFood(newFoodItems[0].name);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const changeUseThisWeekValue = () => {
        const index = foodOptions.findIndex(x => x.name === food);
        const changeID = foodOptions[index].id;

        FoodManagerDataService.updateUseThisWeek(changeID, true)
            .then(response => {
                console.log(response.data);
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newFood = () => {
        retrieveFoodItems();
        setSubmitted(false);
    };

    useEffect(() => {
        retrieveFoodItems();
    }, []);

    return (
        submitted
            ? <View>
                <Text>You submitted successfully!</Text>
                <Text>Click below to add another item.</Text>
                <Button
                    style={{ backgroundColor: "green" }}
                    raised
                    onPress={newFood}
                >
                    Add Another
                </Button>
            </View>
            : <View>
                <Text>Add To Weekly Food List</Text>
                <Text>Add food items from your pantry that you want to use this week.</Text>
                <DropdownComponent
                    updateFunction={setFood}
                    dropdownData={dropdownData}
                    // placeholder={grocery.type}
                    width={150}
                />
                <Button
                    style={{ backgroundColor: "green" }}
                    raised
                    onPress={changeUseThisWeekValue}
                >
                    Submit
                </Button>
            </View>
    );
};

export default AddWeeklyFood;