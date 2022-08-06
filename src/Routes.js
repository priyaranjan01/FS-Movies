import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Search from './Search';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{
            title: 'FS Movies',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#485199',
            },
          }}
        />
        <Stack.Screen
          name={'Search'}
          component={Search}
          options={{
            title: 'Search',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#485199',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
