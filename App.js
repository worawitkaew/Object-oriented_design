import React from 'react';
import {Platform, FlatList ,ActivityIndicator,StyleSheet, Text, View, Button, AsyncStorage, TextInput ,  Image, ScrollView, TouchableOpacity,TouchableWithoutFeedback,TouchableHighlight } from 'react-native';
import j from './d.json';
import { q } from './api';


import diamond from './diamond';
import ben from './ben';
import boss from './boss';
import jom from './jom';
//import palm from './palm';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { ChonseSelect } from 'react-native-chonse-select';



const Stack = createStackNavigator();

//BUTTON CODE//*************************************************
export class Touchables extends React.Component {
  _onPressButton() {
    alert('You tapped the button!')
  }

  _onLongPressButton() {
    alert('You long-pressed the button!')
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
            onPress={this._onPressButton}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableNativeFeedback {Platform.OS !== 'android' ? '(Android only)' : ''}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
            onPress={this._onPressButton}
            >
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Touchable with Long Press</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

//MAIN CODE//**************************************************************************************************

export default class App extends React.Component {
    

  
  constructor(props) {
    super(props)
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
      water: "",

      // Boss
      loading:false,
      dataSource:null
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
  
  // API-Boss
  componentDidMount() {
    // return fetch('https://facebook.github.io/react-native/movies.json')
    return fetch('https://wger.de/api/v2/exerciseinfo/?format=json&?language=1')
    .then( (response) => response.json() )
    .then( (responseJson) => {
        this.setState({
            loading: false,
            // dataSource: responseJson.movies,
            dataSource: responseJson.results
            // dataSource: responseJson
        })
    })
    .catch((error) => {
        console.log(error)
    });
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text >Loading</Text>
      </View>
      );
  }
  HomeScreen({ navigation }) {
    
    return (
    
        //<Text>Your health</Text>
    
      <View style={{flex: 1,backgroundColor: '#044882',alignItems: 'center',justifyContent: 'center',margin: 10,}}>
      <Text style={{color:'white',fontSize:30}}>Main Menu</Text>
      <Button style={theme} title="GET STARTED" onPress={() => navigation.navigate('Details')}/>
      <Text></Text>
      <Button title="Alltime" onPress={() => navigation.push('loadlist')} />
      <Text></Text>
      <Button title="BEN MENU" onPress={() => navigation.push('ben')} />
      <Text></Text>
      <Button title="boss" onPress={() => navigation.push('boss',{key:this.state.dataSource})} />
       </View>
      /* <Button title="Alltime" onPress={() => navigation.push('loadlist')} />
        <Button title="BEN MENU" onPress={() => navigation.push('ben')} />*/
      
       
     
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
        <Text>Height {+this.state.high} CM</Text>
        <Text>Weight {+this.state.weight} Kilogram</Text>
        <Text>Age {+this.state.age}</Text>
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
        <Text>Name: </Text>
        <TextInput
          style={styles.textinput}
          onChangeText={text =>  this.setState({Name: text})}
        />
      </View>

       <ChonseSelect
        height={35}
        style={{ marginLeft: 1, marginBottom: 1 }}
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
        <Text>Height: </Text>
        <TextInput
          name={"High: "}
          style={styles.textinput}
          onChangeText={text => this.onChangehigh(text)}
          // value={""+this.state.hight}
          keyboardType={'numeric'}
          
        />
        <Text> Centimetre</Text>
      </View>
      <View style={awe.container}>
        <Text >Weight: </Text>
        <TextInput
          name={"Weight: "}
      
          style={styles.textinput}
          onChangeText={text => this.onChangeweight(text)}
          // value={""+this.state.weight}
          keyboardType={'numeric'}
          
        />
        <Text> Kilogram</Text>
      </View>
      <View style={awe.container}>
        <Text>Age: </Text>
        <TextInput
          name={"Age: "}
          style={styles.textinput}
          onChangeText={text => this.onChangeage(text)}
          // value={""+this.state.age}
          keyboardType={'numeric'}
          
        />
        <Text> Years</Text>
      </View>
      <View style={styles.button_Go}>
      
      <Button title="Go" onPress={this.analysis_body}/>
      </View>
      <View style={styles.button_Go}>
      <Button title="See your health" onPress={() => navigation.push('Profile')} />
         </View>
    </View>
    );
  }
 
  render() {
    // LOAD API just wait
    if(this.state.loading){
      return(
        <View>
            <ActivityIndicator />
        </View>
      )
    }else{

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

        {/* boss */}
        
        <Stack.Screen name="boss" component={boss.boss.boss} />
       
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
    );
    }
  }
  
}

//**************************************************************************************************
//CSS COLOR STYLE
const styles = StyleSheet.create({
     button_Go: {
    width: '40%',
    
    padding: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#044882',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  text: {
    fontStyle: 'italic',
    color: 'white'
    // lineHeight: 200
  },
  textinput: { color:'white',height: 30, borderColor: 'white', borderWidth: 2,width: 100}
});
const awe = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 0,
    backgroundColor: '#044882',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
 
  },
  
  text: {
    fontStyle: 'italic',
    color:'white'
    // lineHeight: 200
  }
});

const theme = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'black'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  }
});
