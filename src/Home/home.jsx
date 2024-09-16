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
            dispatch(logoutUser());  // This will update the Redux `authenticated` state
            
            // Navigate to the login screen or home screen after logout
            navigation.navigate(LOGIN_ROUTE);  // Ensure LOGIN_ROUTE is the name of your login screen
        } catch (err) {
            console.error('Problem logging out', err);
        }
    };
    

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
