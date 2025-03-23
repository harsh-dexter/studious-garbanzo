import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const REACTIONS = ['👍', '❤️', '😂', '😲', '😢'];

export default function ReactionPicker({ onSelect }) {
  return (
    <View style={styles.container}>
      {REACTIONS.map((emoji) => (
        <TouchableOpacity
          key={emoji}
          style={styles.reactionButton}
          onPress={() => onSelect(emoji)}
        >
          <Text style={styles.emoji}>{emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3
  },
  reactionButton: {
    marginHorizontal: 4
  },
  emoji: {
    fontSize: 24
  }
});
