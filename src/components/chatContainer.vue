<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="profile">
        <div class="profile-img-container">
          <img :src="user.url" alt="profile image" class="profile-img">
        </div>
      </div>
      <h2>Cześć {{ user.firstName }}!</h2>
    </div>
    <ul class="tabs">
      <li class="auth-tab">
        <a href="#"
          class="auth-tab-text button tran"
          @click.prevent="this.$store.dispatch('setChatTabs', 'matches')"
          :class="{
            'filled-tonal-button': chatTabs === 'matches',
            'elevated-button': chatTabs === 'chat'}">
            Matches</a>
      </li>
      <li class="auth-tab">
        <a href="#"
          class="auth-tab-text button tran"
          @click.prevent="this.$store.dispatch('setChatTabs', 'chat')"
          :class="{
            'filled-tonal-button': chatTabs === 'chat',
            'elevated-button': chatTabs === 'matches'}">
            Chat</a>
      </li>
    </ul>
    <matches-display v-if="chatTabs === 'matches'" :user="user"></matches-display>
    <chat-display v-else :user="user"></chat-display>
  </div>
</template>

<script>
import MatchesDisplay from '@/components/MatchesDisplay.vue';
import ChatDisplay from '@/components/ChatDisplay.vue';
import { mapState } from 'vuex';

export default {
  name: 'ChatContainer',
  data() {
    return {
      tab: 'matches',
    };
  },
  components: {
    MatchesDisplay,
    ChatDisplay,
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['matchesForUser']),
    ...mapState(['chatTabs']),
  },
};
</script>
