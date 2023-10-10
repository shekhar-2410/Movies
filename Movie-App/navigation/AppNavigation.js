import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        options={{ title: "Movie", headerShown: false }}
      />
      <Stack.Screen
        name="Person"
        component={PersonScreen}
        options={{ title: "Person Info..", headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search", headerShown: false }}
      />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigation;
