import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { VirtualizedList, Text, View, StyleSheet, Linking } from 'react-native';

const TopStories = () => {
    const [stories, setStories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [storyIds, setStoryIds] = useState([]);

    useEffect(() => {
        fetchTopStories();
    }, []);

    const fetchTopStories = async () => {
        try {
            const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
            setStoryIds(data);
            loadStories(data.slice(0, 10));
        } catch (error) {
            console.log('Error fetching top stories:', error);
        }
    };

    const loadStories = async (ids) => {
        try {
            const storyRequests = ids.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
            const storyResponses = await Promise.all(storyRequests);
            setStories(prevStories => [...prevStories, ...storyResponses.map(res => res.data)]);
        } catch (error) {
            console.error('Error loading stories:', error);
        }
    };

    const pagination = () => {
        const nextPage = currentPage + 1;
        const newStoryIds = storyIds.slice(nextPage * 10, (nextPage + 1) * 10); // Load next 10 stories
        loadStories(newStoryIds);
        setCurrentPage(nextPage);
    };

    const handleUrlPress = (url) => {
        Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    };

    const getItem = (data, index) => data[index];

    const getItemCount = (data) => data.length;

    return (
        <VirtualizedList
            data={stories}
            initialNumToRender={10}
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
            getItem={getItem}
            getItemCount={getItemCount}
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
