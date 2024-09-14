import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopStories from './components/topStories';

const Home = () => {

    return (
        <View>
            <Text>Home</Text>
            <TopStories />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({})