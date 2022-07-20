import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AboutToExpire from './navigation/screens/AboutToExpire.js';
import MyGrocery from './navigation/screens/Grocery.js';
import MyMealPlan from './navigation/screens/MealPlan.js';
import MyPantry from './navigation/screens/Pantry.js';

const expireName = 'Expiring';
const groceryName = 'Grocery';
const mealPlanName = 'Meal Plan';
const pantryName = 'Pantry';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={pantryName}
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "white",
            tabBarLabelStyle: {
              paddingBottom: 10,
              fontSize: 10,
            },
            tabBarStyle: [
              {
                display: "flex",
                backgroundColor: "darkseagreen",
                height: 60,
                paddingTop: 10,
              },
              null
            ],
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let routeName = route.name;

              if (routeName === expireName) {
                iconName = focused ? 'pizza' : 'pizza-outline';
              } else if (routeName === groceryName) {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (routeName === mealPlanName) {
                iconName = focused ? 'list' : 'list-outline';
              } else if (routeName === pantryName) {
                iconName = focused ? 'home' : 'home-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />
            }
          })}
        >

          <Tab.Screen
            options={{
              unmountOnBlur: true,
            }}
            name={pantryName}
            component={MyPantry}
          />
          <Tab.Screen
            options={{
              unmountOnBlur: true,
            }}
            name={expireName}
            component={AboutToExpire}
          />
          <Tab.Screen
            options={{
              unmountOnBlur: true,
            }}
            name={groceryName}
            component={MyGrocery}
          />
          <Tab.Screen
            options={{
              unmountOnBlur: true,
            }}
            name={mealPlanName}
            component={MyMealPlan}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}