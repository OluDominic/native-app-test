import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { HOME_ROUTE, LOGIN_ROUTE } from "../constants/routes";

const Splash = ({ navigation}) => {

    useEffect(() => {
        setTimeout(()=> {
            navigation.navigate(LOGIN_ROUTE)
        }, 2000)
    })
    return (
        <View style={{backgroundColor: 'black', 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'}}>
            <Animatable.Text style={{color: 'white', fontSize: 36, fontWeight: '800'}} duration={2000} animation={"fadeInDownBig"}>QuickCheck</Animatable.Text>
        </View>
    );
}

export default Splash;

const styles = StyleSheet.create({})