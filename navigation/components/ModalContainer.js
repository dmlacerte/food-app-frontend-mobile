import React, { useState } from "react";
import { TouchableHighlight, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button } from 'react-native-paper';
import AddFood from "./modal-content/AddFood";
import MyFood from "./modal-content/MyFood";
import MyGrocery from "./modal-content/MyGrocery";
import AddGrocery from "./modal-content/AddGrocery";
import AddWeeklyFood from "./modal-content/AddWeeklyFood";

function ModalContainer({ triggerText, retrieveItems, id }) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        if (isModalVisible) retrieveItems();
        setModalVisible(!isModalVisible);
    };

    let determineModal = null;
    const foodId = id ? id : null;

    if (triggerText === 'Add' || triggerText === 'Add to Pantry') {
        determineModal = <AddFood id={foodId} />;
    } else if (triggerText === 'Update') {
        determineModal = <MyFood id={id} closeModal={toggleModal} />;
    } else if (triggerText === 'Edit') {
        determineModal = <MyGrocery id={id} closeModal={toggleModal} />;
    } else if (triggerText === 'Add Grocery') {
        determineModal = <AddGrocery />;
    } else if (triggerText === 'Add Pantry') {
        determineModal = <AddWeeklyFood />;
    } 
    // else if (category === 'Meal Plan' && (triggerText || triggerText === "")) {
    //     determineModal = <MyPlan day={day} time={time} closeModal={closeModal} />;
    // } else if (category === 'Meal Plan') {
    //     determineModal = <AddMealPlan day={day} time={time} closeModal={closeModal} />;
    // } 

    return (
        <View>
            <Button style={{ borderWidth: 1, borderColor: "green" }} raised onPress={toggleModal}>
                {triggerText}
            </Button>

            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, backgroundColor: "white", padding: 30 }}>
                    {determineModal}
                    <TouchableHighlight style={{ backgroundColor: "lightgray", top: 0, right: 0, position: "absolute", width: 20, height: 20, alignItems: 'center' }} onPress={toggleModal}>
                        <Text>X</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
}

export default ModalContainer;