import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const TopStories =()=> {
    const [stories, setStories] = useState();
    const [currentPage, setCurrentPage] = useState('')

    useEffect(()=> {
        fetchTopStories()
    }, [])

    const fetchTopStories = async () => {
        try {
            const {data: storyIds} = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
            const storyRequests = storyIds.slice(0, 10).map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
            const storyResponses = await Promise.all(storyRequests);
            setStories(storyResponses.map(res => res.data))
        } catch (error) {
            console.log('Error fetching top stories:', error)
        }
    };

    const pagination = async () => {
        try {
            const {data: storyIds} = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
            const newStoryId = storyIds.slice(currentPage * 10, (currentPage + 1) * 10);
            const newStoryRequest = newStoryId.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
            const newStoryResponses = await Promise.all(newStoryRequests);
            setCurrentPage(newStoryResponses.map(res => res.data))
        } catch (error) {
            console.error('Error loading more stories:', error);
        }
    }

    return (
        <FlatList 
            data={stories}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item})=> (
                <View>
                    <Text>{item.title}</Text>
                    <Text>{item.url}</Text>
                </View>
            )}
            onEndReached={pagination}
            onEndReachedThreshold={0.5}
        />
    );
};

export default TopStories;