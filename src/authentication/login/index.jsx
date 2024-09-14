import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authStore/actions';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { signInLoading, isSignInSuccess, signInError } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login(email, password));
    };

    useEffect(()=> {
        console.log(signInLoading, 'loading')
    }, [signInLoading])

    // Handling login side effects
    useEffect(() => {
        if (isSignInSuccess) {
            Alert.alert('Login Successful', 'You have logged in successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigation.replace('App') // Navigate to 'App' stack
                }
            ]);
        }
        return ()=> {};
    }, [isSignInSuccess]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <Button onPress={()=> navigation.goBack()} icon={'arrow-left'} />
            <Text style={styles.title}>Login</Text>

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

            {/* Loader when signInLoading is true */}
            {signInLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Login
                </Button>
            )}

            {/* Displaying error message if there's any */}
            {signInError ? <Text style={styles.error}>{signInError}</Text> : null}
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

export default Login;
