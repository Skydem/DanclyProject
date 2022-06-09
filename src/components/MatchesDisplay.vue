<template>
  <div class="match-display">
    a
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MatchesDisplay',
  props: ['user'],
  data() {
    return {
      matchedProfiles: {},
    };
  },
  methods: {
    async getMatches() {
      try {
        const response = await axios.get('http://localhost:8000/users', {
          params: {
            userIds: JSON.stringify(this.user.matches),
          },
        });
        this.matchedProfiles = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
