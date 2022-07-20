import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../../../services/FoodManagerDataService";
import GroceryManagerDataService from "../../../services/GroceryManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text, TouchableHighlight } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import styles from '../../../Styles';

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
                <Text style={styles.pageTitle}>Add To Pantry</Text>
                <Text style={styles.modalCategory}>Name:</Text>
                <TextInput
                    label='Name'
                    value={food.name}
                    onChangeText={text => handleInputChange('name', text)}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.modalCategory}>Type:</Text>
                    <DropdownComponent
                        updateForm={handleInputChange}
                        dropdownData={dropdownData}
                        placeholder=''
                        width={150}
                    />
                </View>
                <Text style={styles.modalCategory}>Expiration Date:</Text>
                <DatePicker
                    mode="date"
                    date={date}
                    onDateChange={newDate => {
                        setDate(newDate);
                        handleInputChange('expDate', newDate);
                    }}
                    style={{ alignSelf: "center" }}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableHighlight
                        onPress={() => handleInputChange('useThisWeek', !food.useThisWeek)}
                        style={{
                            backgroundColor: food.useThisWeek ? "lightgray" : "white",
                            width: 20,
                            height: 20,
                            borderWidth: 1,
                            borderColor: "black",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 5,
                        }}
                    >
                        <Text> {food.useThisWeek ? "✓" : null} </Text>
                    </TouchableHighlight>
                    <Text style={styles.modalCategory}>Use This Week?</Text>
                </View>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "green", width: 100, alignSelf: "center", marginTop: 15 }}
                    raised
                    onPress={saveFood}
                >
                    Submit
                </Button>
            </View>
    );
};

export default AddFood;