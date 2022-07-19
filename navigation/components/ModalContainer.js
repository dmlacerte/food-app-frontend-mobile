// import * as React from 'react';
// import {
//   Animated,
//   Dimensions,
//   View,
//   StyleSheet,
//   TouchableHighlight,
// } from 'react-native';
// import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

// const deviceHeight = Dimensions.get('window').height
// const deviceWidth = Dimensions.get('window').width

// export default class MyComponent extends React.Component {
//   state = {
//     visible: false,
//   };

//   openModal() {
//     Animated.timing(this.state.modalY, {
//         duration: 300,
//         toValue: 0
//      }).start();
//   }

//   closeModal() {
//     Animated.timing(this.state.modalY, {
//         duration: 300,
//         toValue: - deviceHeight
//      }).start();
//   }

//   getInitialState(){
//     return {
//         modalY: new Animated.Value(-deviceHeight)
//     }
//   }
//   _showModal = () => this.setState({ visible: true });
//   _hideModal = () => this.setState({ visible: false });

//   render() {
//     const { visible } = this.state;
//     return (
//       <Provider>
//         <View style={styles.container}>
//           <Button
//              onPress={this._showModal}
//            >
//             Show
//           </Button>
//           <Portal>
//             <Modal visible={visible} onDismiss={this._hideModal}>
//               <Animated.View 
//                 style={[ 
//                   styles.modal, 
//                   { 
//                     transform: [
//                       {translateY: this.state.modalY}
//                     ] 
//                   }]}
//                 >
//                   <TouchableHighlight onPress={this._hideModal} underlayColor="green" style={styles.button}>
//                     <Text style={styles.buttonText}>Close Modal</Text>
//                   </TouchableHighlight>
//                 </Animated.View>
//             </Modal>
//           </Portal>
//          </View>
//       </Provider>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center'
//   },
//   button: {
//     backgroundColor: 'green',
//     alignItems: 'center',
//     height: 60,
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white'
//   },
//   modal: {
//     height: deviceHeight,
//     width: deviceWidth,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     backgroundColor: '#ededed',
//     justifyContent: 'center',
//   }
// });

import React, { useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import { Button } from 'react-native-paper';
import AddFood from "./modal-content/AddFood";

function ModalTester({ triggerText, id }) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    let determineModal = null;
    const foodId = id ? id : null;

    if (triggerText === 'Add' || triggerText === 'Add to Pantry') {
        determineModal = <AddFood id={foodId} />;
    } 
    // else if (triggerText === 'Update') {
    //     determineModal = <MyFood id={id} closeModal={closeModal} />;
    // } else if (triggerText === 'Edit') {
    //     determineModal = <MyGrocery id={id} closeModal={closeModal} />;
    // } else if (triggerText === 'Add Grocery') {
    //     determineModal = <AddGrocery />;
    // } else if (triggerText === 'Add Pantry') {
    //     determineModal = <AddWeeklyFood />;
    // } else if (category === 'Meal Plan' && (triggerText || triggerText === "")) {
    //     determineModal = <MyPlan day={day} time={time} closeModal={closeModal} />;
    // } else if (category === 'Meal Plan') {
    //     determineModal = <AddMealPlan day={day} time={time} closeModal={closeModal} />;
    // } 

    return (
        <View>
            {/* <Button title="Show modal" onPress={toggleModal} /> */}
            <Button style={{ backgroundColor: "green" }} raised onPress={toggleModal}>
                {triggerText}
            </Button>

            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    {determineModal}

                    {/* <Button title="Hide modal" onPress={toggleModal} /> */}
                    <Button style={{ backgroundColor: "gray" }} raised onPress={toggleModal}>
                        Close
                    </Button>
                </View>
            </Modal>
        </View>
    );
}

export default ModalTester;