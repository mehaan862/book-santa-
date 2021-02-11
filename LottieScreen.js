import * as React from 'react'
import LottieView from 'lottie-react-native'

export default class LottieScreen extends React.Component{
    render(){
       return(
           <LottieView
           source={require('../assets/44849-books.json')}
           style={{width:'80%'}}
           autoPlay loop
           />
       )
    }
}