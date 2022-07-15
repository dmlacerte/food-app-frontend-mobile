import * as React from 'react';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RenderHtml from 'react-native-render-html';
import { Dropdown } from 'react-native-material-dropdown';
import FoodManagerDataService from "../../services/FoodManagerDataService";
import DropdownComponent from '../components/DropdownComponent.js';
import AddToMealPlanButton from '../components/AddToMealPlanButton.js';
import styles from '../../Styles';
import ModalContainer from '../components/ModalContainer.js';
import { Button } from 'react-native-paper';
import CardComponent from '../components/CardComponent.js'
import {
    Card,
    CardActions,
    CardContent,
    CardCover,
    Title,
    Paragraph
} from 'react-native-paper';

const AboutToExpire = ({ navigation }) => {

    const [foodItems, setFoodItems] = useState([]);
    const [expDateRange, setExpDateRange] = useState(7);
    // const potentialDates = [1, 2, 3, 4, 5, 6, 7];

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
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const calcDate = (expDateStr) => {
        const expDate = new Date(expDateStr);
        const expDateTime = expDate.getTime();

        const today = new Date();

        return (Math.floor((expDateTime - today) / (24 * 3600 * 1000)) + 1);
    };

    const changeUseThisWeekValue = (index) => {
        const changeID = foodItems[index].id;
        const newValue = !(foodItems[index].useThisWeek);
        let newArray = foodItems.map(element => element.id == changeID ? { ...element, useThisWeek: newValue } : element);
        setFoodItems(newArray);

        FoodManagerDataService.updateUseThisWeek(changeID, newValue)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveFoodItems();
    }, []);

    // const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <Text>Use It or Lose It</Text>
            <Text>Select date range for expiring food:</Text>
            <DropdownComponent
                setExpDateRange={setExpDateRange}
            />
            <Text>Select ✓ to add to weekly meal plan.</Text>
            {foodItems &&
                foodItems.map((foodItem, index) => (
                    calcDate(foodItem.expDate) <= expDateRange ?
                        <View key={index} style={{ flexDirection: "row", alignItems: "center", width: 350 }}>
                            <View>
                                <Text>{foodItem.name}</Text>
                                <Text>{foodItem.type} | Days to Exp: {calcDate(foodItem.expDate)}</Text>
                            </View>
                            <AddToMealPlanButton 
                                index={index}
                                value={foodItem.useThisWeek}
                                changeUseThisWeekValue={changeUseThisWeekValue}
                            />
                        </View>
                        : null
                ))}
            {/* <Button style={{ backgroundColor: "green" }} raised onPress={() => console.log('Pressed')}>
                Add
            </Button> */}
        </View>
    )
}

export default AboutToExpire;