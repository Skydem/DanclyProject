<template>
  <div class="chatDisplay">
    <div class="chats">
      <button @click="getUserMessages">display id</button>
    </div>
    <div class="chat-input">
      <label for="message" style="display: none">Wpisz wiadomość</label>
      <textarea class="chat-text-input" id="message"
      placeholder="Wpisz wiadomość..." auto="false" rows='4'></textarea>
      <div class="button filled-button" type="submit">Wyślij wiadomość</div>
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
        const response = await axios.get('http://localhost:8001/messages', pack);
        const response2 = await axios.get('http://localhost:8001/messages', pack2);
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
      this.messagesDesc = this.messages.sort((a, b) => a.timestamp - b.timestamp);
    },
  },
};
</script>
