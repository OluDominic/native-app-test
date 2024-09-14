import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Handle registration logic here
        console.log('First Name:', firstname);
        console.log('Last Name:', lastname);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
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
            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Register
            </Button>
        </View>
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
});

export default Register;
