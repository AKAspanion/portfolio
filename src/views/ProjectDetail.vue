<template>
  <div v-if="current" :style="containerStyle">
    <skew-on-hover :no-zoom="true">
      <div class="details__cover">
        <img :alt="current.coverImg" :src="`/images/${current.coverImg}.webp`" />
      </div>
    </skew-on-hover>

    <div class="home-padding">
      <div class="fixed-wrapper">help</div>
    </div>
  </div>
  <div v-else>Not found</div>
</template>

<script>
import SkewOnHover from '@/components/SkewOnHover.vue';
export default {
  components: {
    SkewOnHover,
  },
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
    containerStyle() {
      let _style = { background: '#d9d9d9', color: '#212121' };
      if (this.$vuetify.theme.dark) {
        _style = {
          ..._style,
          background: '#212121',
          color: '#d9d9d9',
        };
      }
      return _style;
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
  height: 100vh;
}
.details__cover img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
}

.theme--light .details__cover {
  background: #eeeeee;
}

.theme--dark .details__cover {
  background: #424242;
}
</style>