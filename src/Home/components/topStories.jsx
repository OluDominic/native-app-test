import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Linking } from 'react-native';

const TopStories = () => {
    const [stories, setStories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchTopStories();
    }, []);

    const fetchTopStories = async () => {
        try {
            const { data: storyIds } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
            const storyRequests = storyIds.slice(0, 10).map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
            const storyResponses = await Promise.all(storyRequests);
            setStories(storyResponses.map(res => res.data));
        } catch (error) {
            console.log('Error fetching top stories:', error);
        }
    };

    const pagination = async () => {
        try {
            const { data: storyIds } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
            const newStoryIds = storyIds.slice(currentPage * 10, (currentPage + 1) * 10);
            const newStoryRequests = newStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
            const newStoryResponses = await Promise.all(newStoryRequests);
            setStories([...stories, ...newStoryResponses.map(res => res.data)]);
            setCurrentPage(currentPage + 1);
        } catch (error) {
            console.error('Error loading more stories:', error);
        }
    };

    const handleUrlPress = (url) => {
        Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    };

    return (
        <FlatList
            data={stories}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
                <View style={styles.storyContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.url && (
                        <Text style={styles.url} onPress={() => handleUrlPress(item.url)}>
                            {item.url}
                        </Text>
                    )}
                </View>
            )}
            onEndReached={pagination}
            onEndReachedThreshold={0.5}
        />
    );
};

const styles = StyleSheet.create({
    storyContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: 'black'
    },
    url: {
        fontSize: 14,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default TopStories;
