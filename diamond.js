import React from 'react';
class calculator extends React.Component {
  cal_bmi_diamond(weight ,hight) {
  
      // console.log(weight)
      // this.setState({BMI: this.state.weight / ( (this.state.height/100) * (this.state.height/100) ) });
      var ans = weight / ((hight/100)*(hight/100))
      // AsyncStorage.getItem('a').then(val => console.log(val));
      return ans
    }

  cal_bmr_diamond(weight ,hight ,age ,sex) {
   
      if(sex == "Male"){
        var ans =  66 + (13.7 * weight) + (5 * hight) - (6.8 * age)
      }else{
        var ans =  665 + (9.6 * weight) + (1.8 * hight) - (4.7 * age)
      }
      return ans
    }

  cal_water(weight) {
    
      var ans =  weight * 33
      return ans
    }
}

const diamond = new calculator(); 
export default { diamond};