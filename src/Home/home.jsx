import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopStories from './components/topStories';
import { Button } from 'react-native-paper'; // Using Paper Button
import { logoutUser } from '../redux/authStore/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { LOGIN_ROUTE } from '../constants/routes';

const Home = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            dispatch(logoutUser());
            navigation.navigate(LOGIN_ROUTE); // Navigate to login screen
        } catch (err) {
            console.error('Problem logging out', err);
        }
    };

    // Set up a button in the top right corner of the header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    mode="text"
                    onPress={handleLogout}
                    contentStyle={styles.logoutButton}
                >
                    Logout
                </Button>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TopStories />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    logoutButton: {
        marginRight: 16,
    },
});
