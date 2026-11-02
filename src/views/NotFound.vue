<template>
  <div class="not-found-container" :style="containerStyle">
    <div class="not-found-text">404</div>
    <div class="title font-weight-light pt-4">
      This page doesn't exist.
    </div>
    <router-link to="/" class="not-found-link title font-weight-light pt-8">
      &larr; Back to the portfolio
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SpanionNotFound',
  computed: {
    containerStyle() {
      if (this.$vuetify.theme.dark) {
        return { background: '#212121', color: '#e0e0e0' };
      }
      return { background: '#e0e0e0', color: '#212121' };
    },
  },
  mounted() {
    // Firebase serves index.html with a 200 for every path, so tell crawlers
    // this is not a real page and keep it out of the index (and out of ads).
    this.robotsMeta = document.createElement('meta');
    this.robotsMeta.name = 'robots';
    this.robotsMeta.content = 'noindex';
    document.head.appendChild(this.robotsMeta);
    this.$store.dispatch('LOADED', true);
  },
  beforeDestroy() {
    document.head.removeChild(this.robotsMeta);
  },
};
</script>

<style scoped>
.not-found-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
}

.not-found-text {
  font-size: max(16vw, 96px);
  line-height: 1;
  font-weight: 100;
  font-family: Roboto, sans-serif !important;
}

.not-found-link {
  color: inherit !important;
  text-decoration: none;
}
</style>
