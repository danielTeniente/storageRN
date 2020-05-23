/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Navigator,
  Alert
} from 'react-native';
import {Header, Input} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  
} from 'react-native/Libraries/NewAppScreen';
import Add from './Add';
import ViewAll from './ViewAll';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        SQLiteProject
      </Text>
      <Button
        title="Añadir Tarea"
        onPress={() => navigation.navigate('Add')}
      /> 
      <Button
        title="Ver Tareas"
        onPress={() => navigation.navigate('ViewAll')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 30,
    color: 'darkblue',
    textAlign: 'center',
  },
});

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Inicio'}}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{title: 'Add'}}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAll}
          options={{title: 'Ver Todo'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;