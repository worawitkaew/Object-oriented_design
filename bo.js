import React from 'react'
import {Comment} from 'react-native'
import{view,text,Image,StyleSheet,ActivityIndicator,} from 'react-native'
import Axios from 'axios';
   
class calculator extends React.Component {
    construtor(props){
        
        this.state ={
            isLoading: true,
            dataSoure: null,
        }
    }
        componentDidMount(){
            return fetch('http://wger.de/api/v2/exercise/?format=api')
            .then (  (Response) => Response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading : false,
                    dataSource : responseJson.exercise,
                })
 
            })
            .catch((error)=>{
                console.log(error)
            });
            fetch
        }
 
 
    render(){
        if (this.state.isLoading){
            return(
                <view style={styles.container}>
                    <ActivityIndicator/>
                </view>
            )
        } else{
            // Let exercise = this.state.dataSoure.map((val,key)=>{
            //     return <view key={key} style={styles.item}>
            //         <text>{val.license_author}</text>
            //     </view>

            // })
   
        return(
            <view style={styles.container}>
                {exercise}
            </view>
        )
    }
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item:{
        flex:1,
        alignSelf : 'stretch',
        margin:10,
        alignItems:'center',
        justifyContent:"center",
        borderBottomWidth: 1,
        borderBottomColor:"#eee",
    }
});
const bo = new exercise(); 
export default { bo};
