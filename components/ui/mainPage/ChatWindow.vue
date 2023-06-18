<template>
    <div class="chat-window">
      <!-- 头部 -->
      <div class="header">
        <h3>频道名称</h3>
        <div class="user-actions">
          <!-- 用户操作按钮，比如设置、退出等 -->
        </div>
      </div>
  
      <!-- 左侧栏 -->
      <div class="sidebar">
        <!-- 频道列表 -->
        <div class="channel-list">
          <h4>频道</h4>
          <ul>
            <li v-for="channel in channels" :key="channel.id">{{ channel.name }}</li>
          </ul>
        </div>
  
        <!-- 用户列表 -->
        <div class="user-list">
          <h4>当前用户</h4>
          <ul>
            <li v-for="user in users" :key="user.id">{{ user.name }}</li>
          </ul>
        </div>
      </div>
  
      <!-- 聊天内容 -->
      <div class="chat-content">
        <div v-for="message in messages" :key="message.id">
          <div class="message-header">
            <span class="username">{{ message.user }}</span>
            <span class="timestamp">{{ message.timestamp }}</span>
          </div>
          <p class="message-content">{{ message.content }}</p>
        </div>
      </div>
  
      <!-- 底部输入框 -->
      <div class="input-area">
        <input type="text" v-model="newMessage" placeholder="输入消息..." />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </template>
  <script>
export default {
  data() {
    return {
      channels: [
        { id: 1, name: '频道1' },
        { id: 2, name: '频道2' },
        { id: 3, name: '频道3' }
      ],
      users: [
        { id: 1, name: '用户1' },
        { id: 2, name: '用户2' },
        { id: 3, name: '用户3' }
      ],
      messages: [
        { id: 1, user: '用户1', timestamp: '12:34 PM', content: '你好！' },
        { id: 2, user: '用户2', timestamp: '12:35 PM', content: '欢迎加入聊天室！' },
        // 其他消息
      ],
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.messages.push({
          id: Date.now(),
          user: '当前用户',
          timestamp: timestamp,
          content: this.newMessage
        });
        this.newMessage = '';

        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      const chatContent = this.$el.querySelector('.chat-content');
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }
};
</script>
  <style scoped>
  .chat-window {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #46a5e5;
    padding: 10px;
    color: #fff;
  }
  
  .sidebar {
    display: flex;
    background-color: #f8f8f8;
    color: #333;
    padding: 10px;
    border-right: 1px solid #ccc;
  }
  
  .channel-list,
  .user-list {
    flex: 1;
    margin-right: 10px;
  }
  
  .channel-list h4,
  .user-list h4 {
    margin-top: 0;
  }
  
  .chat-content {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    color: #999;
  }
  
  .username {
    font-weight: bold;
  }
  
  .timestamp {
    font-size: 0.8em;
  }
  
  .message-content {
    margin: 5px 0;
  }
  
  .input-area {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-top: 1px solid #ccc;
  }
  
  .input-area input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .input-area button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #46a5e5;
    color: #fff;
  }
  </style>
  