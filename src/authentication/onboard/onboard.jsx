import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../constants/routes';

const OnBoard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.message}>
                Welcome! Please choose an option to get started.
            </Text>
            
            <Button
                mode="contained"
                onPress={() => navigation.navigate(LOGIN_ROUTE)}
                style={styles.button}
            >
                Login Here
            </Button>

            <Button
                mode="outlined"
                onPress={() => navigation.navigate(REGISTER_ROUTE)}
                style={styles.button}
            >
                Register
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        width: '80%',
        marginBottom: 16,
    },
});

export default OnBoard;
