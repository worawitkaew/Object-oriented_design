import axios from 'axios';
import React from 'react';
import {StyleSheet,View,ActivityIndicator,Text, ScrollView} from 'react-native';
// import React from 'react';
// import 'react-native-gesture-handler';
// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
class apicall extends React.Component {
    
   
    
     boss({navagation,route}){
      
      let food =route.params?.key.map((val,key)=>{
        return <View key={key} style={styles.list}><Text>{val.name} = {val.description}</Text></View>
      })
      return(
        <ScrollView>
          <View style={styles.container}>
            {food}
          </View>
        </ScrollView>
      )
       
        
    }
}
const boss = new apicall(); 
export default { boss};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 44,
        paddingLeft: 40,
    },
    list:{
    paddingVertical: 10,
    margin: 10,
    backgroundColor: "#fff",
    fontSize: 18,
    
   }
});