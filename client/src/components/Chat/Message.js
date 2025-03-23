import { View, Text, Image, StyleSheet } from 'react-native';

export default function Message({ message, isCurrentUser }) {
  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUser : styles.otherUser
    ]}>
      {message.type === 'image' ? (
        <Image source={{ uri: message.content }} style={styles.image} />
      ) : (
        <Text style={styles.text}>{message.content}</Text>
      )}
      <View style={styles.metaContainer}>
        <Text style={styles.time}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        {message.edited && <Text style={styles.edited}>(edited)</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 8
  },
  currentUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6'
  },
  otherUser: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8
  },
  text: {
    fontSize: 16
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 4
  },
  time: {
    fontSize: 12,
    color: '#666'
  },
  edited: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8
  }
});
