import React from 'react';
import {  Text, View, AsyncStorage } from 'react-native';
class calculator extends React.Component {
  clear({ navigation }) {
    
    AsyncStorage.clear()
    AsyncStorage.setItem("a",  JSON.stringify([])).then(err=> {

      navigation.replace('loadlist')
    });
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
      );
        
  }
  compare({ navigation ,route}) {
    // .getDay()
    // .getHours()
    // .getSeconds()
    // .getMinutes()
    
    AsyncStorage.getItem(route.params?.key+"").then(val => {
      
       navigation.replace('compare2' ,{key:JSON.parse(val)})
       
    });
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Wait please</Text>
      </View>
      );
  }
}

const diamond = new calculator(); 
export default { diamond};