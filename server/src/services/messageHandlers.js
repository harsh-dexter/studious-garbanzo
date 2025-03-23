module.exports = (io, db) => {
    const handleMessage = (socket, message) => {
      const messageRef = ref(db, `messages/${message.id}`);
      update(messageRef, {
        ...message,
        timestamp: ServerValue.TIMESTAMP,
        status: 'delivered'
      });
      
      socket.broadcast.emit('message', message);
    };
  
    const handleReaction = (socket, { messageId, reaction }) => {
      const reactionRef = ref(db, `reactions/${messageId}/${socket.userId}`);
      set(reactionRef, reaction);
    };
  
    return { handleMessage, handleReaction };
  };
  