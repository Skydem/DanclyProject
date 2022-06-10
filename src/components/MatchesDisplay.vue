<template>
  <div class="match-display">
      <div v-for="match in matchesForUser" :key="match.user_id"
      class="match-section" @click="clickedUser(match)" @keyup.right="clickedUser(match)">
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
  },
};
</script>

<style>
.match-display {
  display: flex;
  flex-wrap: wrap;
}
.match-img-container {
  width: 80px;
  height: 80px;
  border-style: solid;
  border-width: 1px;
  border-radius: 50px;
  overflow: hidden;
}
.match-pic {
  width: 100%;
  object-fit: contain;
  object-position:center;
}
.match-section {
  text-align: center;
}
</style>
