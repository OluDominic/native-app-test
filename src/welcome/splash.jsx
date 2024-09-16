import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { ONBOARD_ROUTE } from "../constants/routes";

const Splash = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate(ONBOARD_ROUTE);
        }, 2000);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigation]); // Pass navigation as a dependency

    return (
        <View style={styles.container}>
            <Animatable.Text
                style={styles.text}
                duration={2000}
                animation="fadeInDownBig"
            >
                News App
            </Animatable.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 36,
        fontWeight: '800'
    }
});

export default Splash;
