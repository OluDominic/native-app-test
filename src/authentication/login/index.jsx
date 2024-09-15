import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authStore/actions'; // adjust as needed
import { useNavigation } from '@react-navigation/native';
import { createTables } from '../../db/signInDb';
import { clearLoginError } from '../../redux/authStore/authSlice';
import { HOME_ROUTE } from '../../constants/routes';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigation = useNavigation();
    const { signInLoading, isSignInSuccess, signInError } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        createTables();
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        if (!validateEmail(text)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleLogin = () => {
        if (!emailError) {
            dispatch(login(email, password));
        }
    };

    useEffect(() => {
        if (signInError) {
            setTimeout(() => {
                dispatch(clearLoginError());
            }, 10000);
            return () => {
                dispatch(clearLoginError());
            };
        }
    }, [signInError]);

    useEffect(() => {
        if (isSignInSuccess) {
            navigation.navigate('App', {
                screen: HOME_ROUTE,
              })
        }
      }, [isSignInSuccess]);
    

    const isFormValid = email.trim() !== '' && password.trim() !== '' && !emailError;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Button onPress={() => navigation.goBack()} icon={'arrow-left'} />
                <Text style={styles.title}>Login</Text>

                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={handleEmailChange}
                    style={styles.input}
                    error={!!emailError}
                />
                {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

                <TextInput
                    label="Password"
                    value={password}
                    mode="outlined"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                />
                {signInLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        style={[styles.button, !isFormValid && styles.disabledButton]}
                        disabled={!isFormValid}  // Disable the button if form is invalid
                    >
                        Login
                    </Button>
                )}
                {signInError ? <Text style={styles.error}>{signInError}</Text> : null}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
    },
    button: {
        padding: 10,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
});

export default Login;
