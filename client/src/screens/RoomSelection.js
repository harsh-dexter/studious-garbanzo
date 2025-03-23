import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { db } from '../config/firebase';
import { ref, onValue } from 'firebase/database';

export default function RoomSelection({ navigation }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roomsRef = ref(db, 'rooms');
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const roomsData = [];
      snapshot.forEach((child) => {
        roomsData.push({
          id: child.key,
          name: child.val().name,
          memberCount: child.val().members ? Object.keys(child.val().members).length : 0
        });
      });
      setRooms(roomsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading rooms...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.roomCard}
            onPress={() => navigation.navigate('Chat', { 
              roomId: item.id,
              roomName: item.name 
            })}
          >
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.memberCount}>
              {item.memberCount} anonymous members
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No chat rooms available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  roomCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  memberCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  }
});
