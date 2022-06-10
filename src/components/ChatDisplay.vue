<template>
  <div class="chatDisplay">
    <div class="chats">
      chat displays
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

export default {
  name: 'ChatDisplay',
  computed: {
    ...mapState(['user']),
    ...mapState(['matchesForUser']),
  },
};
</script>
