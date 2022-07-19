import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../../../services/FoodManagerDataService";
import GroceryManagerDataService from "../../../services/GroceryManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

const AddFood = ({ id }) => {
    const initialFoodState = {
        id: null,
        name: "",
        type: "Misc",
        expDate: "",
        useThisWeek: false
    };

    const [food, setFood] = useState(initialFoodState);
    const [submitted, setSubmitted] = useState(false);
    const [checkedGroceryIDs, setCheckedGroceryIDs] = useState(id);
    const [date, setDate] = useState(new Date());
    const dropdownData = [
        { label: 'Vegetable', value: 'Vegetable' },
        { label: 'Fruit', value: 'Fruit' },
        { label: 'Meat', value: 'Meat' },
        { label: 'Dairy', value: 'Dairy' },
        { label: 'Frozen', value: 'Frozen' },
        { label: 'Packaged', value: 'Packaged' },
        { label: 'Misc', value: 'Misc' },
    ];

    const handleInputChange = (name, value) => {
        if (name === "useThisWeek") value = !food.useThisWeek;

        setFood({ ...food, [name]: value });
    };

    const saveFood = () => {
        let data = {
            name: food.name,
            type: food.type,
            expDate: food.expDate,
            useThisWeek: food.useThisWeek
        };

        FoodManagerDataService.create(data)
            .then(response => {
                setFood({
                    id: response.data.id,
                    name: response.data.name,
                    type: response.data.type,
                    expDate: response.data.expDate,
                    useThisWeek: response.data.useThisWeek
                });
                setSubmitted(true);

                if (checkedGroceryIDs && checkedGroceryIDs.length > 0) {
                    deleteGroceryItem();

                    let newcheckedGroceryIDs = [...checkedGroceryIDs];
                    newcheckedGroceryIDs.shift();
                    setCheckedGroceryIDs(newcheckedGroceryIDs);
                }

                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newFood = () => {
        setFood(initialFoodState);
        setSubmitted(false);
    };

    const checkForGrocery = () => {
        let newFoodState = { ...initialFoodState };

        if (checkedGroceryIDs && checkedGroceryIDs.length > 0) {
            GroceryManagerDataService.get(checkedGroceryIDs[0])
                .then(response => {
                    newFoodState.name = response.data.name;
                    newFoodState.type = response.data.type;
                    setFood(newFoodState);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const deleteGroceryItem = () => {
        GroceryManagerDataService.remove(checkedGroceryIDs[0])
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        checkForGrocery();
    }, [submitted]);

    return (
        submitted && (!checkedGroceryIDs || checkedGroceryIDs.length === 0)
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
                <Text>Add To Pantry</Text>
                <TextInput
                    label='Name'
                    value={food.name}
                    onChangeText={text => handleInputChange('name', text)}
                />
                <DropdownComponent
                    updateForm={handleInputChange}
                    dropdownData={dropdownData}
                    placeholder='Select type'
                    width={150}
                />
                <DatePicker
                    mode="date"
                    date={date}
                    onDateChange={newDate => {
                        setDate(newDate);
                        handleInputChange('expDate', newDate);
                    }}
                />
                <Button
                    style={{ backgroundColor: "lightgray" }}
                    raised
                    onPress={() => handleInputChange('useThisWeek', !food.useThisWeek)}
                >
                    ✓
                </Button>
                <Button
                    style={{ backgroundColor: "green" }}
                    raised
                    onPress={saveFood}
                >
                    Submit
                </Button>
            </View>
    );
};

export default AddFood;