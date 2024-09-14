import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authStore/actions';
import { useNavigation } from '@react-navigation/native';
import { createTables } from '../../db/signInDb';
import { LOGIN_ROUTE } from '../../constants/routes';

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    
    const { registerLoading, registerSuccess, isRegisterSuccess, registerError } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        createTables();
    }, []);

    const handleRegister = () => {
        // Dispatch the register action
        dispatch(register(
            firstname,
            lastname,
            email,
            password
        ));
    };

    useEffect(() => {
        if (isRegisterSuccess) {
            Alert.alert('Registration Successful', 'You have registered successfully!', [{ text: 'OK' }]);
            const timer = setTimeout(() => {
                navigation.navigate(LOGIN_ROUTE);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isRegisterSuccess]);
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <Button onPress={()=> navigation.goBack()} icon={'arrow-left'} />
            <Text style={styles.title}>Register</Text>            
            <TextInput
                label="First Name"
                value={firstname}
                mode="outlined"
                onChangeText={text => setFirstname(text)}
                style={styles.input}
            />
            <TextInput
                label="Last Name"
                value={lastname}
                mode="outlined"
                onChangeText={text => setLastname(text)}
                style={styles.input}
            />
            <TextInput
                label="Email"
                value={email}
                mode="outlined"
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                mode="outlined"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                style={styles.input}
            />

            {/* Loader when registerLoading is true */}
            {registerLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button mode="contained" onPress={handleRegister} style={styles.button}>
                    Register
                </Button>
            )}

            {/* Displaying error message if there's any */}
            {registerError ? <Text style={styles.error}>{registerError}</Text> : null}
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    error: {
        marginTop: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default Register;
