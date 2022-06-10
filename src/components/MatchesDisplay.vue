<template>
  <div class="match-display">
      <div v-for="match in matchesForUser" :key="match.user_id"
      class="match-section" @click="clickedUser" @keyup.right="clickedUser">
        <div class="match-img-container">
          <img :src="match.url" alt="prof" class="match-pic"/>
        </div>
        <h3>{{ match.firstName }}</h3>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import axios from 'axios';

export default {
  name: 'MatchesDisplay',
  data() {
    return {
      matchedProfiles: {},
    };
  },
  computed: {
    ...mapState(['matchesForUser']),
    ...mapState(['user']),
  },
};
</script>
