import React, { useState } from "react";
import GroceryManagerDataService from "../../../services/GroceryManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../../../Styles';

const AddGrocery = () => {
    const initialGroceryState = {
        id: null,
        name: "",
        type: "Misc"
    };

    const [grocery, setGrocery] = useState(initialGroceryState);
    const [submitted, setSubmitted] = useState(false);
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
        setGrocery({ ...grocery, [name]: value });
    };

    const saveGrocery = () => {
        let data = {
            name: grocery.name,
            type: grocery.type
        };

        GroceryManagerDataService.create(data)
            .then(response => {
                setGrocery({
                    id: response.data.id,
                    name: response.data.name,
                    type: response.data.type
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newGrocery = () => {
        setGrocery(initialGroceryState);
        setSubmitted(false);
    };

    return (
        submitted
            ? <View style={{ alignItems: "center" }}>
                <Text style={styles.modalText}>You submitted successfully!</Text>
                <Text style={styles.subtext}>Click below to add more items.</Text>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "green", width: 200, marginTop: 20 }}
                    raised
                    onPress={newGrocery}
                >
                    Add Another
                </Button>
            </View>
            : <View>
                <Text style={styles.pageTitle}>Add to Grocery List</Text>
                <Text style={styles.modalCategory}>Name:</Text>
                <TextInput
                    label='Name'
                    value={grocery.name}
                    onChangeText={text => handleInputChange('name', text)}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.modalCategory}>Type:</Text>
                    <DropdownComponent
                        updateForm={handleInputChange}
                        dropdownData={dropdownData}
                        placeholder={grocery.type}
                        width={150}
                    />
                </View>
                <Button
                    style={{ borderWidth: 1, backgroundColor: "green", width: 100, alignSelf: "center", marginTop: 15 }}
                    raised
                    onPress={saveGrocery}
                >
                    Submit
                </Button>
            </View>
    );
};

export default AddGrocery;