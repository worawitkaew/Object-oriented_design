import React from 'react';
import {  Text, View, AsyncStorage } from 'react-native';
class calculator extends React.Component {
 

  clear({ navigation }) {
    
    AsyncStorage.clear().then(err => {
      AsyncStorage.setItem("a",  JSON.stringify([])).then(err=> {

        navigation.replace('loadlist')
    })});
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
      );
        
  }
  compare({route}) {
    
    var temp = route.params?.key
    var now = route.params?.now
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Current     Old</Text>
        <Text> High  {now.high}  {temp.high}  </Text>
        <Text> Weight  {now.weight}  {temp.weight}  </Text>
        <Text> Age  {now.age}  {temp.age}  </Text>
        <Text> BMR  {now.BMR}  {temp.BMR}  </Text>
        <Text> BMI  {now.BMI}  {temp.BMI}  </Text>
        <Text> water  {now.water}  {temp.water}  </Text>
        
      </View>
      );
  }
  loadcompare({ navigation ,route}) {
   
    AsyncStorage.getItem(route.params?.key+"").then(val => {
      
       navigation.replace('compare' ,{key:JSON.parse(val) ,now:route.params?.now})
       
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