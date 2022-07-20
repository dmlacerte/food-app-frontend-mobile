import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../../../services/FoodManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import styles from '../../../Styles';

const MyFood = ({ id, closeModal }) => {

    const initialFoodState = {
        id: null,
        name: "",
        type: ""
    };

    const [currentFood, setCurrentFood] = useState(initialFoodState);
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

    const getFood = foodID => {
        FoodManagerDataService.get(foodID)
            .then(response => {
                setCurrentFood(response.data);
                console.log(response.data);

                const expDate = new Date(response.data.expDate.replace(/-/g, '\/'));
                setDate(expDate);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = (name, value) => {
        if (name === "useThisWeek") value = !food.useThisWeek;

        setCurrentFood({ ...currentFood, [name]: value });
    };

    const updateFood = () => {
        FoodManagerDataService.update(currentFood.id, currentFood)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteFood = () => {
        FoodManagerDataService.remove(currentFood.id)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getFood(id);
    }, []);

    return (
        <View>
            <Text style={styles.pageTitle}>Edit Pantry Item</Text>
            <Text style={styles.modalCategory}>Name:</Text>
            <TextInput
                label='Name'
                value={currentFood.name}
                onChangeText={text => handleInputChange('name', text)}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.modalCategory}>Type:</Text>
                <DropdownComponent
                    updateForm={handleInputChange}
                    dropdownData={dropdownData}
                    placeholder={currentFood.type}
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
            <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "green", width: 100 }}
                    raised
                    onPress={updateFood}
                >
                    Update
                </Button>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "indianred", width: 100, marginLeft: 5 }}
                    raised
                    onPress={deleteFood}
                >
                    Delete
                </Button>
            </View>
        </View>
    );
};

export default MyFood;