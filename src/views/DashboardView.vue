<template>
  <div class="dashboard">
    <chat-container class="dashboard-item chat-container" :user="user"></chat-container>
    <div class="cards-container dashboard-item">
      <card-component v-for="gUser in characters" :key="gUser.firstName">
        <img :src="gUser.url" alt="image" class="card-img">
        <h3 class="card-padding">{{ gUser.firstName }}</h3>
        <div class="row-section card-padding">
          <div class="button" @click="reject" @keyup.left="reject">Nope</div>
          <div class="button filled-button" @click="accept(gUser.user_id)"
          @keyup.right="accept">Yas</div>
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
          firstName: 'Karolina',
          dob_day: '11',
          dob_month: '6',
          dob_year: '1999',
          gender_identity: 'woman',
          show_gender: '1',
          gender_interest: 'man',
          about: 'wszystko',
          url: 'https://i.imgur.com/oPj4A8u.jpeg',
          matches: [],
          user_id: 1,
        },
        {
          firstName: 'Basia',
          dob_day: '6',
          dob_month: '3',
          dob_year: '2000',
          gender_identity: 'woman',
          show_gender: '1',
          about: 'wszystko i nic',
          url: 'https://i.imgur.com/H07Fxdh.jpeg',
          matches: [],
          user_id: 2,
        },
        {
          firstName: 'Marek',
          dob_day: '5',
          dob_month: '8',
          dob_year: '2002',
          gender_identity: 'man',
          show_gender: '1',
          about: 'siłka',
          url: 'https://i.imgur.com/dmwjVjG.jpeg',
          matches: [],
          user_id: 3,
        },
      ],
      user: {
        firstName: 'jan',
        dob_day: '21',
        dob_month: '11',
        dob_year: '2001',
        gender_identity: 'man',
        show_gender: '1',
        gender_interest: 'woman',
        about: 'test',
        url: 'https://i.imgur.com/oPj4A8u.jpeg',
        matches: [],
      },
      UserId: this.setUserId(),
      genderedUsers: {},
      filteredGenderedUsers: {},
    };
  },
  methods: {
    setUserId() {
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
    reject(e) {
      console.log('rejected!', e.path[2]);
      e.path[2].remove();
    },
    async accept(id) {
      console.log('accepted!', id);
      this.user.matches.push(id);
      this.characters.pop();
      try {
        await axios.put('http://localhost:8000/addmatch', {
          userId: this.userId,
          matcheduserId: id,
        });
        this.getUser();
      } catch (error) {
        console.log(error);
      }
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
    async getGenderedUsers() {
      try {
        const response = await axios.get('http://localhost:800/gendered-users', {
          params: this.user.gender_interest,
        });
        this.genderedUsers = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>

</style>
