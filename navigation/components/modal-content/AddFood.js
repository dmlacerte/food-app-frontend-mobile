import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../../../services/FoodManagerDataService";
import GroceryManagerDataService from "../../../services/GroceryManagerDataService";
import DropdownComponent from '../../components/DropdownComponent.js';
import { View, Text } from 'react-native';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'

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
    const [date, setDate] = useState(new Date())
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
        // let { name, value } = ev.target;
        if (name === "useThisWeek") value = !food.useThisWeek;
        console.log(name, value)

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
                    console.log(newcheckedGroceryIDs)
                    newcheckedGroceryIDs.shift();
                    console.log(newcheckedGroceryIDs)
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
        <View>
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
                // onDateChange={setDate}
                onDateChange={date => {
                    setDate(date);
                    handleInputChange('expDate', date);
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
        // <div className="submit-form">
        //     {submitted && (!checkedGroceryIDs || checkedGroceryIDs.length === 0) ? (
        //         <div className="text-center">
        //             <h4>You submitted successfully!</h4>
        //             <p>Click below to add another item.</p>
        //             <div className="text-center mt-3">
        //                 <button className="btn btn-success" onClick={newFood}>
        //                     Add Another
        //                 </button>
        //             </div>
        //         </div>
        //     ) : (
        //         <div>
        //             <h4 className="text-center">Add To Pantry</h4>
        //             <div className="form-group">
        //                 <label htmlFor="name">Name:</label>
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     id="name"
        //                     required
        //                     value={food.name}
        //                     onChange={handleInputChange}
        //                     name="name"
        //                 />
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor="type" className="mt-2">Type:</label>
        //                 <select className="form-control" id="type" name="type" required onChange={handleInputChange}>
        //                     {typeOptions.map((option, index) => {
        //                         return (
        //                             <option
        //                                 value={option}
        //                                 selected={option === food.type ? true : false}
        //                                 key={index}
        //                             >
        //                                 {option}
        //                             </option>
        //                         )
        //                     })}
        //                 </select>
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor="expDate" className="mt-2">Expiration Date:</label>
        //                 <input
        //                     type="date"
        //                     step="1"
        //                     className="form-control"
        //                     id="expDate"
        //                     required
        //                     value={food.expDate}
        //                     onChange={handleInputChange}
        //                     name="expDate"
        //                 />
        //             </div>
        //             <div className="form-check mt-2">
        //                 <input
        //                     className="form-check-input"
        //                     type="checkbox"
        //                     name="useThisWeek"
        //                     value={food.useThisWeek}
        //                     id="useThisWeek"
        //                     onChange={handleInputChange}
        //                     checked={food.useThisWeek ? true : false}
        //                 />
        //                 <label className="form-check-label" htmlFor="useThisWeek">
        //                     Add to Weekly Meal Plan?
        //                 </label>
        //             </div>
        //             <div className="text-center mt-3">
        //                 <button onClick={saveFood} className="btn btn-success">
        //                     Submit
        //                 </button>
        //             </div>
        //         </div>
        //     )}
        // </div>
    );
};

export default AddFood;