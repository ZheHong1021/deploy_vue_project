<template>
  <v-row>
    <v-col cols="12">
      <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message"/>
      <button @click="sendMessage">Send</button>
      <div v-for="(msg, index) in messages" :key="index">{{ msg }}</div>
      <div>Status: {{ statusMessage }}</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      message: '',
      messages: [],
      statusMessage: 'Connecting...'
    };
  },
  methods: {
    initWebSocket() {
      this.socket = new WebSocket('ws://localhost:8000/ws/order/');

      this.socket.onopen = () => {
        this.statusMessage = 'Connected';
        console.log('WebSocket connection opened');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.messages.push(data.message);
      };

      this.socket.onclose = () => {
        this.statusMessage = 'Disconnected';
        console.log('WebSocket connection closed');
      };

      this.socket.onerror = (error) => {
        this.statusMessage = 'Error';
        console.error('WebSocket error:', error);
      };
    },

    
    sendMessage() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ message: this.message }));
        this.message = '';
      } else {
        console.warn('WebSocket is not open: readyState is', this.socket.readyState);
        this.statusMessage = 'WebSocket is not open. Ready state: ' + this.socket.readyState;
      }
    }
  },
  mounted() {
    this.initWebSocket();
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }
};
</script>
