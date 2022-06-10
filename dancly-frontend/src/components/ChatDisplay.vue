<template>
  <div class="chatDisplay">
    <h3>Piszesz z {{ clickedUser.firstName }}</h3>
    <div class="chats">
      <div class="conversation-container">
        <div class="message" v-for="message in messagesDesc" :key="message.name+message.timestamp">
          <div class="message-image-container">
            <img :src="message.img" :alt="message.name + 'profile picture'"
            class="message-img"/>
          </div>
          <div class="message-content">
            <span>{{ message.message }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <label for="message" style="display: none">Wpisz wiadomość</label>
      <textarea class="chat-text-input" id="message"
      placeholder="Wpisz wiadomość..." auto="false" v-model="messageContent"/>
      <button class="button filled-button" type="submit"
      @click="addMessage">Wyślij wiadomość</button>
      <button @click="getUserMessages" class="button filled-tonal-button">Odśwież</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'ChatDisplay',
  data() {
    return {
      userMessagesSent: [],
      userMessagesRecieved: [],
      messages: [],
      messagesDesc: [],
      messageContent: '',
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['matchesForUser']),
    ...mapState(['clickedUser']),
  },
  methods: {
    display() {
      console.log(this.clickedUser.user_id);
    },
    async getUserMessages() {
      const pack = {
        params: {
          userId: this.user.user_id, correspondingUserId: this.clickedUser.user_id,
        },
      };
      const pack2 = {
        params: {
          userId: this.clickedUser.user_id, correspondingUserId: this.user.user_id,
        },
      };
      console.log('id for messages pack ', pack);
      try {
        const response = await axios.get('http://2a02:a314:8342:ff00:7094:76e4:2bfa:8753:8001/messages', pack);
        const response2 = await axios.get('http://2a02:a314:8342:ff00:7094:76e4:2bfa:8753:8001/messages', pack2);
        this.userMessagesSent = response.data;
        this.userMessagesRecieved = response2.data;
      } catch (error) {
        console.log('pozyskiwanie wiadomosci error!');
        console.log(error);
      }
      this.userMessagesSent.forEach((message) => {
        const formattedMessage = {
          name: this.user.firstName,
          img: this.user.url,
          message: message.message,
          timestamp: message.timestamp,
        };
        this.messages.push(formattedMessage);
      });
      this.userMessagesRecieved.forEach((message) => {
        const formattedMessage = {
          name: this.clickedUser.firstName,
          img: this.clickedUser.url,
          message: message.message,
          timestamp: message.timestamp,
        };
        this.messages.push(formattedMessage);
      });
      this.messagesDesc = this.messages.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      this.messages = [];
    },
    async addMessage() {
      const message = {
        timestamp: new Date().toISOString(),
        from_userId: this.user.user_id,
        to_userId: this.clickedUser.user_id,
        message: this.messageContent,
      };
      this.messageContent = '';

      try {
        await axios.post('http://2a02:a314:8342:ff00:7094:76e4:2bfa:8753:8001/message', { message });
        this.getUserMessages();
      } catch (error) {
        console.log('error sending message!', error);
      }
    },
  },
  mounted() {
    // setInterval(() => this.getUserMessages(), 10000);
    this.getUserMessages();
  },
};
</script>
