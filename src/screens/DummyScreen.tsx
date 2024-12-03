import React from 'react'; 
import { TCText } from '../components/text/CustomText';
import { Colors } from '../utils/constants/colors';
import { StyleSheet, Text, View } from 'react-native';

const DummyScreen : React.FC = () =>{
    return (
        <View style={styles.container }>
            <TCText style={styles.text}>Connect 55</TCText>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'pink',
    },
    text:{
        color:Colors.black,
        textAlign:'center',
        fontSize:20,
        marginHorizontal:20,
        marginVertical:20,
        
    }
})

export default DummyScreen; 