import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { listenForMessages } from '../services/chat';
import MessageInput from '../components/Chat/MessageInput';
import Message from '../components/Chat/Message';
import TypingIndicator from '../components/Chat/TypingIndicator';
import PrivacyBanner from '../PrivacyBanner';

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const unsubscribe = listenForMessages((messages) => {
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <PrivacyBanner />
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Message
            message={item}
            isCurrentUser={item.userId === auth.currentUser?.uid}
          />
        )}
        contentContainerStyle={styles.messageList}
      />

      <TypingIndicator visible={isTyping} />
      <MessageInput 
        onSend={handleSend}
        onTypingChange={setIsTyping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8'
  },
  messageList: {
    padding: 16
  }
});
