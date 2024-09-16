import React, { useState, useEffect } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoginError } from '../../redux/authStore/authSlice';
import { login } from '../../redux/authStore/actions';
import { createTables } from '../../db/signInDb';
import { HOME_ROUTE } from '../../constants/routes';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigation = useNavigation();
    const { signInLoading, isSignInSuccess, signInError } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        createTables(); // Assuming this is your database initialization
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

    // Show an alert if there's a sign-in error
    useEffect(() => {
        if (signInError) {
            Alert.alert("Login Error", signInError, [{ text: "OK", onPress: () => dispatch(clearLoginError()) }]);
            setTimeout(() => {
                dispatch(clearLoginError());
            }, 10000);
        }
    }, [signInError, dispatch]);

    useEffect(() => {
        if (isSignInSuccess) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'AppTabs', state: { routes: [{ name: HOME_ROUTE }] } }],
            });
        }
    }, [isSignInSuccess, navigation]);

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

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={[styles.button, !isFormValid && styles.disabledButton]}
                    disabled={!isFormValid || signInLoading} // Disable while loading or invalid form
                >
                    {signInLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        "Login"
                    )}
                </Button>
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
