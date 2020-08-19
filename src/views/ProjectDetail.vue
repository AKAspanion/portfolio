<template>
  <div v-if="current">
    <div class="details__cover" :style="dark ? 'filter: brightness(40%)':''">
      <img :src="`/images/${current.coverImg}.png`" />
    </div>
    <div class="home-padding">
      <div class="fixed-wrapper">help</div>
    </div>
  </div>
  <div v-else>Not found</div>
</template>

<script>
export default {
  data() {
    return {
      projects: {
        'ui-nuemorphism': { name: 'ABC', coverImg: 'neu' },
        'flash-cards': { name: 'ABC', coverImg: 'fc' },
        'task-manager': { name: 'ABC', coverImg: 'task' },
        'lens-n-light': { name: 'ABC', coverImg: 'lnl' },
        'notes-app': { name: 'ABC', coverImg: 'notes' },
        'feature-phone': { name: 'ABC', coverImg: 'phone' },
        'video-chat-room': { name: 'ABC', coverImg: 'chat' },
        'snake-game': { name: 'ABC', coverImg: 'snake' },
        'dog-training-startup': { name: 'ABC', coverImg: 'paw' },
      },
    };
  },
  computed: {
    dark() {
      return this.$vuetify.theme.dark;
    },
    current() {
      return this.projects[this.$route.params.id];
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('LOADED', true);
    }, 500);
  },
};
</script>

<style scope>
.details__cover {
  width: 100vw;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
}
img {
  width: 100%;
}
</style>