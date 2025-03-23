import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSocket } from '../../contexts/SocketContext';

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState('');
  const socket = useSocket();

  const handleTyping = (text) => {
    setMessage(text);
    socket.emit(text ? 'typing_start' : 'typing_stop');
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={handleTyping}
        placeholder="Type a message..."
        multiline
        maxLength={500}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Icon name="send" size={24} color="#2196F3" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFF'
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 20,
    marginRight: 8
  },
  sendButton: {
    padding: 8
  }
});
