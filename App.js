import React from 'react';
import { FlatList ,StyleSheet, Text, View, Button, AsyncStorage, TextInput ,  Image, ScrollView, TouchableOpacity } from 'react-native';
import j from './d.json';
import { q } from './api';

import diamond from './diamond';
import ben from './ben';
import jom from './jom';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { ChonseSelect } from 'react-native-chonse-select';



const Stack = createStackNavigator();


export default class App extends React.Component {

  
  constructor() {
    super()
    // AsyncStorage.clear();
    // AsyncStorage.setItem("a", '[]');
    this.state = {
      Name: "",
      weight: 0,
      high: 0,
      age: 1,
      BMR: "",
      BMI: "",
      Sex: "Male",
      
      lists:[],
      compare: "",
      water: ""
    }
    this.loaddata = this.loaddata.bind(this)
    this.analysis_body = this.analysis_body.bind(this)
    this.DetailsScreen = this.DetailsScreen.bind(this)
    this.HomeScreen = this.HomeScreen.bind(this)
    this.Profile = this.Profile.bind(this)
    this.Alltime = this.Alltime.bind(this)
    this.load_list= this.load_list.bind(this)
    this.compare = this.compare.bind(this)
    
  }

  
  analysis_body() {
    
    // คำนวณ bmi bmr water
    var ans_bmr = jom.jom.cal_bmr(this.state.weight ,this.state.high ,this.state.age ,this.state.Sex);
    this.setState({BMR: ans_bmr});
    var ans_water = jom.jom.cal_water(this.state.weight)
    this.setState({water: ans_water});
    var ans_bmi = jom.jom.cal_bmi(this.state.weight ,this.state.high);
    this.setState({BMI: ans_bmi});

    // เก็บเวลา
    var time_now = new Date();
    let lists = this.state.lists;
    lists.push(time_now);
   
    this.setState({
         lists: lists
    })
    
    var obj = { weight: this.state.weight+"", high: this.state.high+""
              , age: this.state.age+"" ,Sex: this.state.age+""
              , BMR: ans_bmr ,BMI: ans_bmi ,water: ans_water};
    
    var profile = { Name: this.state.Name, high: this.state.high
              ,weight: this.state.weight,age: this.state.age
              ,bmr: ans_bmr ,bmi: ans_bmi ,lists: JSON.stringify(lists)
              ,Sex:  this.state.Sex ,water:ans_water };
  
    var myJSON = JSON.stringify(obj);
    AsyncStorage.setItem(time_now+"",  myJSON);
    AsyncStorage.getItem(time_now+"").then(val => console.log(JSON.parse(val).weight));

    AsyncStorage.setItem("profile", JSON.stringify(profile));

    AsyncStorage.setItem("a", JSON.stringify(lists));
    alert("Save")
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
  loaddata({ navigation }) {
    var a ;
    
      AsyncStorage.getItem("profile").then(val => {
        if(val != null){

         
        a = JSON.parse(val)
        
        this.setState({Name: a.Name});
        this.setState({weight: a.weight});
        this.setState({age: a.age});
        this.setState({high: a.high});
        this.setState({Sex: a.Sex});
        this.setState({BMI: a.bmi});
        this.setState({BMR: a.bmr});
        this.setState({water: a.water});

        if(a.lists != null){
          this.setState({lists: JSON.parse(a.lists)});
        }else{
          this.setState({lists: []});
        }
         
        navigation.replace('Home')
        
        }else{
          navigation.replace('Home')
        }
        
      });
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
      );
  }
  HomeScreen({ navigation }) {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
       
        <Button
          title="Filling health"
          onPress={() => navigation.navigate('Details')}
        />
        <Button title="Alltime" onPress={() => navigation.push('loadlist')} />
        <Button title="ben" onPress={() => navigation.push('ben')} />
      </View>
    );
  }
  load_list({ navigation }){
    
    AsyncStorage.getItem("a").then(val => {
      
      this.setState({lists: JSON.parse(val)});
      navigation.replace('Alltime')
    });
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Load lists</Text>
      </View>
      );
  }
  Alltime({ navigation }) {
   
    return (
      <View style={styles.container}>
        <Button title="clear" onPress={() => navigation.navigate("clear")} />
        <FlatList
          data={this.state.lists}
          renderItem={({item}) => <Button title={new Date(item)+""} onPress={() => navigation.navigate('compare', { key: new Date(item)+"" })} />}
        />
      </View>
    );
  }
  Profile({ navigation }) {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Your health</Text>
        <Text>Name {this.state.Name}</Text>
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
  compare({ navigation ,route}) {
    
    var temp = route.params?.key
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Current     Old</Text>
        <Text> High  {this.state.high}  {temp.high}  </Text>
        <Text> Weight  {this.state.weight}  {temp.weight}  </Text>
        <Text> Age  {this.state.age}  {temp.age}  </Text>
        <Text> BMR  {this.state.BMR}  {temp.BMR}  </Text>
        <Text> BMI  {this.state.BMI}  {temp.BMI}  </Text>
        <Text> water  {this.state.water}  {temp.water}  </Text>
        
      </View>
      );
  }
  
  DetailsScreen({ navigation }) {
    return (
      <View style={styles.container}>

      <View style={awe.container}>
        <Text>Name :</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={text =>  this.setState({Name: text})}
        />
      </View>

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
  // ben({ navigation}) {
  //   ben.ben.HomeScreen(this.state.weight ,this.state.high)
  // }
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="load">
        
        <Stack.Screen name="loadlist" component={this.load_list} />
        <Stack.Screen name="load" component={this.loaddata} />
        <Stack.Screen name="Home" component={this.HomeScreen} />
        <Stack.Screen name="Details" component={this.DetailsScreen} />
        <Stack.Screen name="Profile" component={this.Profile} />
        <Stack.Screen name="Alltime" component={this.Alltime} />
        <Stack.Screen name="compare2" component={this.compare} />

        {/* diamond */}
        <Stack.Screen name="compare" component={diamond.diamond.compare} />
        <Stack.Screen name="clear" component={diamond.diamond.clear} />

        {/* ben */}
        <Stack.Screen name="ben" component={ben.ben.HomeScreen} />
        
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

