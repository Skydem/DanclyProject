<template>
  <div class="dashboard">
    <chat-container class="dashboard-item"></chat-container>
    <div class="cards-container dashboard-item">
      <card-component v-for="character in characters" :key="character">
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
    };
  },
  methods: {
    reject() {
      console.log('rejected!');
    },
    accept() {
      console.log('accepted!');
    },
  },
};
</script>

<style>

</style>
