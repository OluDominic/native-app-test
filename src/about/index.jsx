import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const About = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator animating={true} style={styles.loader} />;
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Avatar.Icon size={100} icon="account" style={styles.avatar} />
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{userData.firstname}</Text>

          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{userData.lastname}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loader: {
    marginTop: 50,
  },
  avatar: {
    backgroundColor: '#6200ea',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});
