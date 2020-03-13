import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput } from 'react-native';
import j from './d.json';
import { q } from './api';


export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      weight: "",
      height: "",
      age: "",
      BMR: "",
      BMI: "",
      water: ""
    }
    this.add = this.add.bind(this)
    this.get = this.get.bind(this)
    this.cal_bmi = this.cal_bmi.bind(this)
  }

  add() {
    AsyncStorage.setItem('a', '0');
  }

  get() {
    console.log(this.state.weight)
    this.setState({BMR: 66 + (13.7 * this.state.weight) + (5 * this.state.height) - (6.8 * this.state.age)});
    this.setState({water: this.state.weight * 33});
    
    // AsyncStorage.getItem('a').then(val => console.log(val));
    
  }
  cal_bmi() {
    console.log("bmi")
    console.log(this.state.weight)
    this.setState({BMI: this.state.weight / ( (this.state.height/100) * (this.state.height/100) ) });
    
    // AsyncStorage.getItem('a').then(val => console.log(val));
    
  }

  onChangeheight(text) {
    this.setState({height: +text});
  }
  onChangeweight(text) {
    // this.setState({weight: text.replace(/\D/g,'')});
    this.setState({weight: +text});
  }
  onChangeage(text) {
    // this.setState({weight: text.replace(/\D/g,'')});
    this.setState({age: +text});
  }


  render() {
    return (
      <View style={styles.container}>
        
        <Text>BMR is {+this.state.BMR}</Text>
        <Text>BMI is {+this.state.BMI}</Text>
        <Text>Water is {+this.state.water} ml.</Text>
        <View style={awe.container}>
          <Text>Hight is</Text>
          <TextInput
            name={"Hight: "}
            style={styles.textinput}
            onChangeText={text => this.onChangeheight(text)}
            value={""+this.state.height}
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
            value={""+this.state.weight}
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
            value={""+this.state.age}
            keyboardType={'numeric'}
          />
          <Text>Year</Text>
        </View>

        <Button title="Caculate BMR" onPress={this.get}/>
        <Button title="Caculate BMI" onPress={this.cal_bmi}/>
      </View>
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

