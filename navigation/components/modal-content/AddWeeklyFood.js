import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../../../services/FoodManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../../Styles';

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
            ? <View style={{ alignItems: "center" }}>
                <Text style={styles.modalText}>You submitted successfully!</Text>
                <Text style={styles.subtext}>Click below to add more items.</Text>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "green", width: 200, marginTop: 20 }}
                    raised
                    onPress={newFood}
                >
                    Add Another
                </Button>
            </View>
            : <View>
                <Text style={styles.pageTitle}>Add To Weekly Food List</Text>
                <Text style={{ textAlign: "center", color: "gray", marginTop: 10, marginBottom: 10 }}>Add food items from your pantry that you want to use this week.</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.modalCategory}>Name:</Text>
                    <DropdownComponent
                        updateFunction={setFood}
                        dropdownData={dropdownData}
                        placeholder=""
                        width={240}
                    />
                </View>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "green", width: 100, alignSelf: "center", marginTop: 15 }}
                    raised
                    onPress={changeUseThisWeekValue}
                >
                    Submit
                </Button>
            </View>
    );
};

export default AddWeeklyFood;