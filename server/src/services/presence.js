export class PresenceManager {
    constructor(io, db) {
      this.onlineUsers = new Map();
      
      io.on('connection', (socket) => {
        socket.on('user_online', (userId) => {
          this.onlineUsers.set(userId, Date.now());
        });
  
        socket.on('disconnect', () => {
          this.onlineUsers.delete(socket.userId);
        });
      });
  
      setInterval(() => this.cleanupInactiveUsers(), 60000);
    }
  
    cleanupInactiveUsers() {
      const now = Date.now();
      this.onlineUsers.forEach((lastSeen, userId) => {
        if (now - lastSeen > 120000) { // 2 minutes
          this.onlineUsers.delete(userId);
        }
      });
    }
  }
  