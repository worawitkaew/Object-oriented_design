import 'react-native-gesture-handler';
import Svg, { Path, Ellipse } from "react-native-svg";


import React from 'react';
import {  StyleSheet,Text, View, Image, ScrollView,  TouchableOpacity} from 'react-native';

class calculator extends React.Component {
    HomeScreen({ navigation }) {
        return (
        
          <>
          
            {/* <View style={{ flex: 1, flexDirection: 'column', justifyContent: "flex-start", alignItems: 'stretch', }}>
              <View style={{ height: 80, backgroundColor: '#d7d5d2' }} />
             
               
              
              <Text style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 25,
                backgroundColor: '#d7d5d2',
                position: 'absolute',textAlign: 'left',left:20,top:20}}>Health Me</Text>
              <View style={{ height: 450, backgroundColor: '#0f4c81' }} />
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                backgroundColor: '#0f4c81',
                alignSelf: 'center',
                position: 'absolute', top: 100, left: '44%'}}>Today</Text> */}

<View style={styles.container}>
<Text style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 25,
                backgroundColor: '#d7d5d2',
                position: 'absolute',textAlign: 'left',left:20,top:20}}>Health Me</Text>
                
      <View style={styles.rect}>
        <View style={styles.rect2}>
          <View style={styles.rect3Row}>
            <View style={styles.rect3}>
              <Text style={styles.under}>UNDER</Text>
            </View>
            <View style={styles.rect4}>
              <Text style={styles.good}>GOOD</Text>
            </View>
            <View style={styles.rect5}>
              <Text style={styles.over}>OVER</Text>
            </View>
          </View>
        </View>
        <View style={styles.pathStack}>
          <Svg viewBox="0 0 54 65" style={styles.path}>
            <Path
              strokeWidth={1}
              fill="rgba(48,159,24,1)"
              stroke="rgba(230, 230, 230,1)"
              d="M0.00 64.00 L54.00 65.00 L29.00 0.00 L0.00 64.00 Z"
            ></Path>
          </Svg>
          <Svg viewBox="0 0 94 94" style={styles.ellipse}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(48,159,24,1)"
              stroke="rgba(230, 230, 230,1)"
              cx={47}
              cy={47}
              rx={47}
              ry={47}
            ></Ellipse>
          </Svg>
          <Text style={styles.loremIpsum}>1200</Text>
          <Text style={styles.normal}>Normal</Text>
        </View>
      </View>
    </View>


              
            
      
        
          </>
        );
      }
      
    DetailsScreen() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
          </View>
        );
      }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(215,213,210,1)"
  },
  rect: {
    width: 360,
    height: 390,
    backgroundColor: "rgba(15,76,129,1)",
    marginTop: 95
  },
  rect2: {
    width: 265,
    height: 49,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 8,
    borderColor: "#000000",
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 70,
    marginLeft: 48
  },
  rect3: {
    width: 86,
    height: 49,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderColor: "#000000",
    borderWidth: 1
  },
  under: {
    color: "rgba(74,144,226,1)",
    fontSize: 15,
    marginTop: 17,
    marginLeft: 19
  },
  rect4: {
    width: 89,
    height: 49,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderColor: "#000000",
    borderWidth: 1
  },
  good: {
    color: "rgba(48,159,24,1)",
    fontSize: 15,
    marginTop: 17,
    marginLeft: 26
  },
  rect5: {
    width: 89,
    height: 49,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderColor: "#000000",
    borderWidth: 1
  },
  over: {
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    marginTop: 17,
    marginLeft: 26
  },
  rect3Row: {
    height: 49,
    flexDirection: "row",
    flex: 1,
    marginRight: 1
  },
  path: {
    top: 0,
    left: 20,
    width: 54,
    height: 65,
    position: "absolute"
  },
  ellipse: {
    top: 48,
    left: 0,
    width: 94,
    height: 94,
    position: "absolute"
  },
  loremIpsum: {
    top: 70,
    left: 19,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 25,
  },
  normal: {
    top: 106,
    color: "rgba(255,255,255,1)",
    position: "absolute",

    left: 26
  },
  pathStack: {
    width: 94,
    height: 142,
    marginTop: 11,
    marginLeft: 131
  }
});


const palm = new calculator(); 
export default { palm};



{/* import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path, Ellipse } from "react-native-svg";

function Main1(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <View style={styles.rect2}>
          <View style={styles.rect3Row}>
            <View style={styles.rect3}>
              <Text style={styles.under}>UNDER</Text>
            </View>
            <View style={styles.rect4}>
              <Text style={styles.good}>GOOD</Text>
            </View>
            <View style={styles.rect5}>
              <Text style={styles.over}>OVER</Text>
            </View>
          </View>
        </View>
        <View style={styles.pathStack}>
          <Svg viewBox="0 0 54 65" style={styles.path}>
            <Path
              strokeWidth={1}
              fill="rgba(48,159,24,1)"
              stroke="rgba(230, 230, 230,1)"
              d="M0.00 64.00 L54.00 65.00 L29.00 0.00 L0.00 64.00 Z"
            ></Path>
          </Svg>
          <Svg viewBox="0 0 94.31 94.31" style={styles.ellipse}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(48,159,24,1)"
              stroke="rgba(230, 230, 230,1)"
              cx={47}
              cy={47}
              rx={47}
              ry={47}
            ></Ellipse>
          </Svg>
          <Text style={styles.loremIpsum}>1200</Text>
          <Text style={styles.normal}>Normal</Text>
        </View>
      </View>
    </View>
  );
}



export default Main1;
 */}

