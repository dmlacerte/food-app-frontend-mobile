import React, { useState } from "react";
import { TouchableHighlight, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button } from 'react-native-paper';
import AddFood from "./modal-content/AddFood";
import MyFood from "./modal-content/MyFood";
import MyGrocery from "./modal-content/MyGrocery";
import AddGrocery from "./modal-content/AddGrocery";
import AddWeeklyFood from "./modal-content/AddWeeklyFood";
import MyPlan from "./modal-content/MyPlan";
import AddMealPlan from "./modal-content/AddMealPlan";
import styles from '../../Styles';

function ModalContainer({ triggerText, retrieveItems, id, day, time, category }) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        if (isModalVisible) retrieveItems();
        setModalVisible(!isModalVisible);
    };

    let determineModal = null;
    let buttonStyle = null;
    const foodId = id ? id : null;

    if (triggerText === 'Add' || triggerText === 'Add to Pantry') {
        determineModal = <AddFood id={foodId} />;
        buttonStyle = styles.addButton;
    } else if (triggerText === 'Update') {
        determineModal = <MyFood id={id} closeModal={toggleModal} />;
        buttonStyle = styles.editButton;
    } else if (triggerText === 'Edit') {
        determineModal = <MyGrocery id={id} closeModal={toggleModal} />;
        buttonStyle = styles.editButton;
    } else if (triggerText === 'Add Grocery') {
        determineModal = <AddGrocery />;
        buttonStyle = styles.addButton;
    } else if (triggerText === 'Add Pantry') {
        determineModal = <AddWeeklyFood />;
        buttonStyle = styles.addButton;
    } else if (category === 'Meal Plan' && (triggerText || triggerText === "")) {
        determineModal = <MyPlan day={day} time={time} closeModal={toggleModal} />;
        buttonStyle = styles.mealPlanSpace;
    } else if (category === 'Meal Plan') {
        determineModal = <AddMealPlan day={day} time={time} closeModal={toggleModal} />;
        buttonStyle = styles.mealPlanSpace;
    }

    return (
        <View>
            {category === 'Meal Plan'
                ? <TouchableHighlight underlayColor="lightgray" style={buttonStyle} onPress={toggleModal}>
                    <Text style={{ textAlign: "center" }}>{triggerText}</Text>
                </TouchableHighlight>
                : <Button style={buttonStyle} raised onPress={toggleModal}>
                    {triggerText}
                </Button>
            }

            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, backgroundColor: "white", padding: 32 }}>
                    {determineModal}
                    <TouchableHighlight
                        style={{ backgroundColor: "lightgray", top: 0, right: 0, position: "absolute", width: 30, height: 30, flexDirection: "row", justifyContent: "center" }}
                        onPress={toggleModal}
                    >
                        <Text style={{ alignSelf: "center" }}>X</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
}

export default ModalContainer;