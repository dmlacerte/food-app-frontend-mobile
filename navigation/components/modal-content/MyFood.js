import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../../../services/FoodManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

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
    }, [id]);

    return (
        <View>
            <Text>Edit Pantry Item</Text>
            <TextInput
                label='Name'
                value={currentFood.name}
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
                style={{ backgroundColor: "green" }}
                raised
                onPress={updateFood}
            >
                Update
            </Button>
            <Button
                style={{ backgroundColor: "green" }}
                raised
                onPress={deleteFood}
            >
                Delete
            </Button>
        </View>
    );
};

export default MyFood;