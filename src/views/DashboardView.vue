<template>
  <div class="dashboard">
    <chat-container class="dashboard-item chat-container"></chat-container>
    <button @click="getUser()">get user</button>
    <button @click="getUsers()">get users</button>
    <button @click="getGenderedUsers()">get gendered users</button>
    <div class="cards-container dashboard-item">
      <card-component v-for="gUser in genderedUsers" :key="gUser.firstName">
        <img :src="gUser.url" alt="image" class="card-img">
        <h3 class="card-padding">{{ gUser.firstName }}</h3>
        <p class="card-padding">{{ gUser.about }}</p>
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
      user: {
        // firstName: 'jan',
        // dob_day: '21',
        // dob_month: '11',
        // dob_year: '2001',
        // gender_identity: 'man',
        // show_gender: '1',
        // gender_interest: 'woman',
        // about: 'test',
        // url: 'https://i.imgur.com/oPj4A8u.jpeg',
        // matches: [],
      },
      UserId: this.setUserId(),
      genderedUsers: this.getGenderedUsers(),
      filteredGenderedUsers: {},
      matchesForUser: this.getUsers(),
      testMatch: {},
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
      this.genderedUsers.pop();
    },
    async accept(id) {
      console.log('accepted!', id);
      this.user.matches.push(id);
      this.genderedUsers.pop();
      try {
        await axios.put('http://localhost:8001/add-match', {
          userId: this.UserId,
          matchedUserId: id,
        });
        // this.getUser();
        await this.getUsers();
      } catch (error) {
        console.log(error);
      }
    },
    async getUser() {
      try {
        console.log('getUser: sending userid of: ', this.UserId);
        const pack = { params: { userId: this.UserId } };
        const response = await axios.get('http://localhost:8001/user', pack);
        console.log('getUser responsedata: ', response);
        this.user = response.data;
        this.$store.dispatch('setUser', response.data);
        // this.getGenderedUsers();
      } catch (error) {
        console.log('error in getuser: ', error);
      }
    },
    async getGenderedUsers() {
      try {
        const pack = { params: { gender: this.user.gender_interest } };
        const response = await axios.get('http://localhost:8001/gendered-users', pack);
        this.genderedUsers = response.data;
        // this.testMatch = this.user.matches.filter((match) => {
        //   const res = this.genderedUsers.forEach((guser) => {
        //     if (match === guser.user_id) return true;
        //     return false;
        //   });
        //   if (res) return false;
        //   return true;
        // });
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        console.log('user matches: ', this.user.matches);
        const pack = { params: { userIds: JSON.stringify(this.user.matches) } };
        console.log('pack ', pack);
        const response = await axios.get('http://localhost:8001/users', pack);
        this.matchesForUser = response.data;
        console.log('/dashboard response:', response.data);
        // this.getUser();
        this.$store.dispatch('setMatchesForUser', this.matchesForUser);
      } catch (error) {
        console.log(error);
      }
    },
    async getStarterInfo() {
      await this.getUser();
      await this.getUsers();
      // await this.getGenderedUsers();
    },
  },
  mounted() {
    this.getStarterInfo();
  },
};
</script>

<style>

</style>
