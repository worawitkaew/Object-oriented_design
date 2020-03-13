import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput } from 'react-native';
import j from './d.json';
import { q } from './api';
import diamond from './diamond';
export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      weight: "",
      hight: "",
      age: "",
      BMR: "",
      BMI: "",
      water: ""
    }
    this.add = this.add.bind(this)
    this.get = this.get.bind(this)
    this.analysis_body = this.analysis_body.bind(this)
  }

  add() {
    AsyncStorage.setItem('a', '0');
  }

  get() {
    console.log(this.state.weight);
    // AsyncStorage.getItem('a').then(val => console.log(val));
    
  }
  analysis_body() {
    this.setState({BMR: diamond.cal_bmr_diamond(this.state.weight ,this.state.hight ,this.state.age)});
    this.setState({water: diamond.cal_water(this.state.weight)});
    var ans = diamond.cal_bmi_diamond(this.state.weight ,this.state.hight);
    this.setState({BMI: ans});
  }

  onChangehight(text) {
    this.setState({hight: text.replace(/[^.\d]/g,'')});
  }
  onChangeweight(text) {
    this.setState({weight: text.replace(/[^.\d]/g,'')});
    // this.setState({weight: +text});
  }
  onChangeage(text) {
    this.setState({age: text.replace(/[^.\d]/g,'')});
    // this.setState({age: +text});
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
            onChangeText={text => this.onChangehight(text)}
            value={""+this.state.hight}
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

        
        <Button title="Analysis Body" onPress={this.analysis_body}/>
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

