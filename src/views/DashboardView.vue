<template>
  <div class="dashboard">
    <chat-container class="dashboard-item chat-container"></chat-container>
    <div class="cards-container dashboard-item">
      <card-component v-for="character in characters" :key="character.name">
        <img :src="character.url" alt="image" class="card-img">
        <h3 class="card-padding">{{ character.name }}</h3>
        <div class="row-section card-padding">
          <div class="button" @click="reject" @keyup.left="reject">Nope</div>
          <div class="button filled-button" @click="accept" @keyup.right="accept">Yas</div>
        </div>
      </card-component>
    </div>

  </div>
</template>

<script>
import cardComponent from '@/components/CardComponent.vue';
import chatContainer from '@/components/chatContainer.vue';
import axios from 'axios';

export default {
  name: 'DashboardView',
  components: {
    cardComponent,
    chatContainer,
  },
  data() {
    return {
      characters: [
        {
          name: 'Ania',
          url: 'https://i.imgur.com/oPj4A8u.jpeg',
        },
        {
          name: 'Kasia',
          url: 'https://i.imgur.com/OckVkRo.jpeg',
        },
      ],
      UserId: this.setUser(),
      user: {},
    };
  },
  methods: {
    setUser() {
      /* eslint-disable prefer-destructuring */
      const gotCookies = document.cookie.split('; ');
      console.log(gotCookies);
      let result = 0;
      gotCookies.forEach((cookie) => {
        const tmpCookie = cookie.split('=');
        console.log(tmpCookie);
        if (tmpCookie[0] === 'UserId') {
          console.log(tmpCookie[1]);
          result = tmpCookie[1];
        }
      });
      return result;
      /* eslint-enable prefer-destructuring */
    },
    reject() {
      console.log('rejected!');
    },
    accept() {
      console.log('accepted!');
    },
    async getUser() {
      try {
        const response = await axios.get('http://localhost:800/user', {
          params: this.UserId,
        });
        this.user = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>

</style>
