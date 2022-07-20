import React, { useState, useEffect } from "react";
import GroceryManagerDataService from "../../../services/GroceryManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../../../Styles';

const MyGrocery = ({ id, closeModal }) => {

    const initialGroceryState = {
        id: null,
        name: "",
        type: ""
    };

    const [currentGrocery, setCurrentGrocery] = useState(initialGroceryState);
    const dropdownData = [
        { label: 'Vegetable', value: 'Vegetable' },
        { label: 'Fruit', value: 'Fruit' },
        { label: 'Meat', value: 'Meat' },
        { label: 'Dairy', value: 'Dairy' },
        { label: 'Frozen', value: 'Frozen' },
        { label: 'Packaged', value: 'Packaged' },
        { label: 'Misc', value: 'Misc' },
    ];

    const getGrocery = groceryID => {
        GroceryManagerDataService.get(groceryID)
            .then(response => {
                setCurrentGrocery(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = (name, value) => {
        setCurrentGrocery({ ...currentGrocery, [name]: value });
    };

    const updateGrocery = () => {
        GroceryManagerDataService.update(currentGrocery.id, currentGrocery)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteGrocery = () => {
        GroceryManagerDataService.remove(currentGrocery.id)
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
            getGrocery(id);
    }, [id]);

    return (
        <View>
            <Text style={styles.pageTitle}>Edit Grocery Item</Text>
            <Text style={styles.modalCategory}>Name:</Text>
            <TextInput
                label='Name'
                value={currentGrocery.name}
                onChangeText={text => handleInputChange('name', text)}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.modalCategory}>Type:</Text>
                <DropdownComponent
                    updateForm={handleInputChange}
                    dropdownData={dropdownData}
                    placeholder={currentGrocery.type}
                    width={150}
                />
            </View>
            <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "green", width: 100 }}
                    raised
                    onPress={updateGrocery}
                >
                    Update
                </Button>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "indianred", width: 100, marginLeft: 5 }}
                    raised
                    onPress={deleteGrocery}
                >
                    Delete
                </Button>
            </View>
        </View>
    );
};

export default MyGrocery;