import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
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
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const navigation = useNavigation();
    const { registerLoading, isRegisterSuccess, registerError } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 4 && !/\s/.test(password);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        if (validateEmail(text)) {
            setEmailError('');
        } else {
            setEmailError('Invalid email format');
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (validatePassword(text)) {
            setPasswordError('');
        } else {
            setPasswordError('Password must be at least 4 characters and contain no spaces');
        }
    };

    const handleRegister = () => {
        const trimmedFirstname = firstname.trim();
        const trimmedLastname = lastname.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        dispatch(register(
            trimmedFirstname,
            trimmedLastname,
            trimmedEmail,
            trimmedPassword
        ));
    };
    useEffect(() => {
        if (
            firstname.trim() && 
            lastname.trim() && 
            email.trim() && 
            password.trim() && 
            validateEmail(email) && 
            validatePassword(password)
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [firstname, lastname, email, password]);

    useEffect(() => {
        createTables();
    }, []);

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
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({
            ios: (40),
            android: (68),
          })}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
                <Button onPress={() => navigation.goBack()} icon={'arrow-left'} />
                <Text style={styles.title}>Register</Text>

                <TextInput
                    label="First Name"
                    value={firstname}
                    mode="outlined"
                    onChangeText={text => setFirstname(text.trim())} // Trim input
                    style={styles.input}
                />
                <TextInput
                    label="Last Name"
                    value={lastname}
                    mode="outlined"
                    onChangeText={text => setLastname(text.trim())} // Trim input
                    style={styles.input}
                />
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
                    onChangeText={handlePasswordChange}
                    style={styles.input}
                    error={!!passwordError}
                />
                {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

                {registerLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button
                        mode="contained"
                        onPress={handleRegister}
                        disabled={isButtonDisabled}
                        style={[styles.button, isButtonDisabled && styles.disabledButton]}
                    >
                        Register
                    </Button>
                )}
                {registerError ? <Text style={styles.error}>{registerError}</Text> : null}
            </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { marginBottom: 15 },
    button: { marginTop: 20 },
    disabledButton: { backgroundColor: '#ccc' },
    error: { color: 'red', marginBottom: 10 }
});

export default Register;
