import React from 'react';
import {Header} from 'react-native-elements';

const MyHeader=props=>{
    return(
        <Header
        centerComponent={{text: props.title, style: { color: 'black', fontSize:20,fontWeight:"bold", }}}
        backgroundColor='#00FFFB'
        />
    )
}

export default MyHeader;