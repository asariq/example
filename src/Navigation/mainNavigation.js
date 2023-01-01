import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthandMain from "../screens/AuthandMain";
import ContentPage from "../screens/ContentPage";
import RegistrationPage from "../screens/ResistrationPage"
import Mapp from "../screens/map";
import Splash from "../screens/splash";

const Stack = createNativeStackNavigator();

const MainNav = () => {
    return (

        <NavigationContainer initialroutename={AuthandMain} >
            <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="AuthandMain" component={AuthandMain} />
                <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
                <Stack.Screen name="Mapp" component={Mapp} />
                <Stack.Screen name="ContentPage" component={ContentPage} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default MainNav;
