
function cal_bmi_diamond(weight ,hight) {
  
    // console.log(weight)
    // this.setState({BMI: this.state.weight / ( (this.state.height/100) * (this.state.height/100) ) });
    var ans = weight / ((hight/100)*(hight/100))
    // AsyncStorage.getItem('a').then(val => console.log(val));
    return ans
  }

function cal_bmr_diamond(weight ,hight ,age) {
  
    var ans =  66 + (13.7 * weight) + (5 * hight) - (6.8 * age)
    return ans
  }

function cal_water(weight) {
  
    var ans =  weight * 33
    return ans
  }

export default { cal_bmi_diamond ,cal_bmr_diamond ,cal_water};