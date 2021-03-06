import * as React from 'react';
import { useState, useEffect } from "react";
import { TouchableHighlight, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../Styles';
import ModalContainer from '../components/ModalContainer.js';
import FoodManagerDataService from "../../services/FoodManagerDataService";
import GroceryManagerDataService from "../../services/GroceryManagerDataService";

const Grocery = () => {

    const [foodItems, setFoodItems] = useState([]);
    const [groceryItems, setGroceryItems] = useState([]);
    const [checkedPantryIDs, setCheckedPantryIDs] = useState([]);
    const [checkedGroceryIDs, setCheckedGroceryIDs] = useState([]);

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
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveGroceryItems = () => {
        GroceryManagerDataService.getAll()
            .then(response => {
                let newGroceryItems = response.data;
                if (newGroceryItems.length > 0) newGroceryItems.sort(compareItems);
                setGroceryItems(newGroceryItems);
            })
            .catch(e => {
                console.log(e);
            });

        setCheckedGroceryIDs([]);
    };

    const updateSelectedPantryIDs = (id) => {
        const newCheckedList = [...checkedPantryIDs];
        const index = newCheckedList.findIndex(x => x === id);

        if (index >= 0) {
            newCheckedList.splice(index, 1);
        } else {
            newCheckedList.push(id);
        }

        setCheckedPantryIDs(newCheckedList);
    };

    const updateSelectedGroceryIDs = (id) => {
        const newCheckedList = [...checkedGroceryIDs];
        const index = newCheckedList.findIndex(x => x === id);

        if (index >= 0) {
            newCheckedList.splice(index, 1);
        } else {
            newCheckedList.push(id);
        }

        setCheckedGroceryIDs(newCheckedList);
    };

    const removeFromGroceryList = () => {
        checkedGroceryIDs.map(id => {
            GroceryManagerDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    retrieveGroceryItems();
                })
                .catch(e => {
                    console.log(e);
                });
        })

        setCheckedGroceryIDs([]);
    };

    const removeFromWeeklyPlan = () => {
        checkedPantryIDs.map(id => {
            FoodManagerDataService.updateUseThisWeek(id, false)
                .then(response => {
                    console.log(response.data);
                    retrieveFoodItems();
                })
                .catch(e => {
                    console.log(e);
                });
        })

        setCheckedPantryIDs([]);
    };

    const removeFromPantry = () => {
        checkedPantryIDs.map(id => {
            FoodManagerDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    retrieveFoodItems();
                })
                .catch(e => {
                    console.log(e);
                });
        })

        setCheckedPantryIDs([]);
    };

    const calcDate = (expDateStr) => {
        const expDate = new Date(expDateStr);
        const expDateTime = expDate.getTime();

        const today = new Date();

        return (Math.floor((expDateTime - today) / (24 * 3600 * 1000)) + 1);
    };

    useEffect(() => {
        retrieveGroceryItems();
        retrieveFoodItems();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Food To Use This Week</Text>
            <Text>Manage your grocery and weekly food lists:</Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <ModalContainer
                    triggerText="Add Grocery"
                    retrieveItems={retrieveGroceryItems}
                />
                <View style={{ marginLeft: 5 }}>
                    <ModalContainer
                        triggerText="Add Pantry"
                        retrieveItems={retrieveFoodItems}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.subTitle}>Grocery</Text>
                {groceryItems.length > 0 && groceryItems.map((groceryItem, index) => (
                    <View key={index} style={styles.foodItemContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableHighlight
                                onPress={() => updateSelectedGroceryIDs(groceryItem.id)}
                                style={{
                                    backgroundColor: checkedGroceryIDs.includes(groceryItem.id) ? "lightgray" : "white",
                                    width: 30,
                                    height: 30,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: 10,
                                }}
                            >
                                {checkedGroceryIDs.includes(groceryItem.id)
                                    ? <Text>???</Text>
                                    : <Text> </Text>
                                }
                            </TouchableHighlight>
                            <View>
                                <Text>{groceryItem.name}</Text>
                                <Text style={styles.subtext}>{groceryItem.type}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <ModalContainer
                                id={groceryItem.id}
                                triggerText="Edit"
                                retrieveItems={retrieveGroceryItems}
                            />
                        </View>
                    </View>
                ))}
                {checkedGroceryIDs.length > 0
                    ? <View style={{ justifyContent: "space-evenly", marginTop: 10 }}>
                        <ModalContainer
                            id={checkedGroceryIDs}
                            triggerText="Add to Pantry"
                            retrieveItems={() => {
                                retrieveGroceryItems();
                                retrieveFoodItems();
                            }}
                        />
                        <Button style={{ borderWidth: 1, borderColor: "gray", marginTop: 5 }} onPress={removeFromGroceryList}>
                            <Text>Remove From Grocery List</Text>
                        </Button>
                    </View>
                    : null}
            </View>
            <View>
                <Text style={styles.subTitle}>Pantry</Text>
                {foodItems.length > 0 &&
                    foodItems.map((foodItem, index) => (
                        foodItem.useThisWeek ?
                            <View key={index} style={styles.foodItemContainer}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableHighlight
                                        onPress={() => updateSelectedPantryIDs(foodItem.id)}
                                        style={{
                                            backgroundColor: checkedPantryIDs.includes(foodItem.id) ? "lightgray" : "white",
                                            width: 30,
                                            height: 30,
                                            borderWidth: 1,
                                            borderColor: "black",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginRight: 10,
                                        }}
                                    >
                                        {checkedPantryIDs.includes(foodItem.id)
                                            ? <Text>???</Text>
                                            : <Text> </Text>
                                        }
                                    </TouchableHighlight>
                                    <View>
                                        <Text>{foodItem.name}</Text>
                                        <Text style={styles.subtext}>
                                            {foodItem.type} | Days to Exp: {calcDate(foodItem.expDate)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            : null
                    ))}
                {checkedPantryIDs.length > 0
                    ? <View>
                        <Button style={{ borderWidth: 1, borderColor: "gray", marginTop: 10 }} onPress={removeFromWeeklyPlan}>
                            <Text>Remove From Weekly Plan</Text>
                        </Button>
                        <Button style={{ borderWidth: 1, borderColor: "gray", marginTop: 5 }} onPress={removeFromPantry}>
                            <Text>Remove From Pantry</Text>
                        </Button>
                    </View>
                    : null}
            </View>
        </View>
    )
}

export default Grocery; 