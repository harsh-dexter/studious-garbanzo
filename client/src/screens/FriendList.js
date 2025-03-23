import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { db } from '../config/firebase';
import { ref, onValue } from 'firebase/database';

export default function FriendList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friendsRef = ref(db, 'friends');
    return onValue(friendsRef, (snapshot) => {
      const friendsData = [];
      snapshot.forEach((child) => {
        friendsData.push({ id: child.key, ...child.val() });
      });
      setFriends(friendsData);
    });
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text>{item.username}</Text>
            <Text style={styles.lastSeen}>
              Last active: {new Date(item.lastSeen).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
