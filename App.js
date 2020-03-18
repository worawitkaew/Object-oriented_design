import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput } from 'react-native';
import j from './d.json';
import { q } from './api';
import diamond from './diamond';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ChonseSelect } from 'react-native-chonse-select';



const Stack = createStackNavigator();


export default class App extends React.Component {

  
  constructor() {
    super()
    this.state = {
      weight: "",
      high: "",
      age: "",
      BMR: "",
      BMI: "",
      Sex: "male",
      water: ""
    }
    this.add = this.add.bind(this)
    this.get = this.get.bind(this)
    this.analysis_body = this.analysis_body.bind(this)
    this.DetailsScreen = this.DetailsScreen.bind(this)
    this.HomeScreen = this.HomeScreen.bind(this)
    this.Profile = this.Profile.bind(this)
    // this.onChangehight = this.onChangehight.bind(this)
    // this.onChangeweigh = this.onChangeweigh.bind(this)
    // this.HomeScreen = this.onChangeage.bind(this)
  }

  
  add() {
    AsyncStorage.setItem('a', '0');
  }

  get() {
    console.log(this.state.weight);
    // AsyncStorage.getItem('a').then(val => console.log(val));
    
  }
  analysis_body() {
    this.setState({BMR: diamond.cal_bmr_diamond(this.state.weight ,this.state.high ,this.state.age)});
    this.setState({water: diamond.cal_water(this.state.weight)});
    var ans = diamond.cal_bmi_diamond(this.state.weight ,this.state.high);
    this.setState({BMI: ans});
    alert('Save')
    
  }

  onChangehigh(text) {
    var new_text = text.replace(/[^.\d]/g,'');
    if(text == new_text){
      this.setState({high: text});
    }else{
      alert("Please just take only number")
    }
    
    
  }
  onChangeweight(text) {
    var new_text = text.replace(/[^.\d]/g,'');
    if(text == new_text){
      this.setState({weight: text});
    }else{
      alert("Please just take only number")
    }
    // this.setState({weight: +text});
  }
 
  onChangeage(text) {
    var new_text = text.replace(/[^.\d]/g,'');
    if(text == new_text){
      this.setState({age: text});
    }else{
      alert("Please just take only number")
    }
    // this.setState({age: +text});
  }
 
  Setsex(text) {
    this.setState({Sex: text});
  }
  
  HomeScreen({ navigation }) {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
       
        <Button
          title="Filling health"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  Profile({ navigation }) {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Your health</Text>
        <Text>Sex {this.state.Sex}</Text>
        <Text>High {+this.state.high} CM</Text>
        <Text>Weight {+this.state.weight} Kilogram</Text>
        <Text>Age is {+this.state.age}</Text>
        <Text>BMR is {+this.state.BMR}</Text>
        <Text>BMI is {+this.state.BMI}</Text>
        <Text>Water is {+this.state.water} ml.</Text>
        
      </View>
    );
  }

  
  DetailsScreen({ navigation }) {
    return (
      <View style={styles.container}>
       <ChonseSelect
        height={35}
        style={{ marginLeft: 20, marginBottom: 10 }}
        data={[
          {
            value:'Male',
            label:'Male'
          },
          {
            value:'Female',
            label:'Female'
          }
        ]}
        initValue={'Male'}
        onPress={(item) => this.setState({ Sex: item.value })}
      />
      
      <View style={awe.container}>
        <Text>High is</Text>
        <TextInput
          name={"High: "}
          style={styles.textinput}
          onChangeText={text => this.onChangehigh(text)}
          // value={""+this.state.hight}
          keyboardType={'numeric'}
        />
        <Text>CM</Text>
      </View>
      <View style={awe.container}>
        <Text>Weight is</Text>
        <TextInput
          name={"Weight: "}
          style={styles.textinput}
          onChangeText={text => this.onChangeweight(text)}
          // value={""+this.state.weight}
          keyboardType={'numeric'}
        />
        <Text>Kilogram</Text>
      </View>
      <View style={awe.container}>
        <Text>Age is</Text>
        <TextInput
          name={"Age: "}
          style={styles.textinput}
          onChangeText={text => this.onChangeage(text)}
          // value={""+this.state.age}
          keyboardType={'numeric'}
        />
        <Text>Year</Text>
      </View>
  
      
      <Button title="Save" onPress={this.analysis_body}/>
      <Button title="See your health" onPress={() => navigation.push('Profile')} />
        
    </View>
    );
  }

  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={this.HomeScreen} />
        <Stack.Screen name="Details" component={this.DetailsScreen} />
        <Stack.Screen name="Profile" component={this.Profile} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontStyle: 'italic',
    // lineHeight: 200
  },
  textinput: { height: 30, borderColor: 'blue', borderWidth: 2,width: 100}
});
const awe = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  text: {
    fontStyle: 'italic',
    // lineHeight: 200
  }
});

