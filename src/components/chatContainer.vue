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
          @click.prevent="tab = 'matches'"
          :class="{
            'filled-tonal-button': tab === 'matches',
            'elevated-button': tab === 'chat'}">
            Matches</a>
      </li>
      <li class="auth-tab">
        <a href="#"
          class="auth-tab-text button tran"
          @click.prevent="tab = 'chat'"
          :class="{
            'filled-tonal-button': tab === 'chat',
            'elevated-button': tab === 'matches'}">
            Chat</a>
      </li>
    </ul>
    <matches-display v-if="tab === 'matches'"></matches-display>
    <chat-display v-else :user="user"></chat-display>
  </div>
</template>

<script>
import MatchesDisplay from '@/components/MatchesDisplay.vue';
import ChatDisplay from '@/components/ChatDisplay.vue';

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
  props: ['user'],
};
</script>
