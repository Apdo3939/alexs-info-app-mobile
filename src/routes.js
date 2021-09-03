import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';

const Stack = createStackNavigator();

export default function Routes() {
    const screenOptions = {
        headerStyle: {
            backgroundColor: '#005500'
        },
        headerTintColor: '#eeeeee'
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerTitle: 'Listar Orçamento' }} />
                <Stack.Screen name="Contact" component={Contact} />
                <Stack.Screen name="Services" component={Services} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
