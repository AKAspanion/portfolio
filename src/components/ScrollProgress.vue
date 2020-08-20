<template>
  <div
    @mouseout="iconHover($event,'.scroll-arrow-container','.scroll-arrow-wrapper',mobile);hideCursor(mobile);"
    @mousemove="iconHover($event,'.scroll-arrow-container','.scroll-arrow-wrapper',mobile)"
    @mouseover="showCursor(percentage > 10 ? 'GO UP' : 'SCROLL', null, mobile)"
    :style="`bottom: ${bottom}px;right: ${right}px;`"
    class="scroll-arrow-container"
    v-if="!navMenu"
  >
    <div class="scroll-arrow-wrapper">
      <v-progress-circular
        size="40"
        width="2"
        :color="$vuetify.theme.dark ? '#e0e0e0' : '#212121'"
        :value="percentage <= 99 && percentage >= 95 ? 100 : percentage"
      >
        <v-btn icon @click="onScroll" :color="$vuetify.theme.dark ? '#e0e0e0' : '#212121'">
          <v-icon
            :style="`transform: rotate(${percentage > 10 ? '135' : '-45'}deg)`"
          >mdi-arrow-bottom-left</v-icon>
        </v-btn>
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollProgress',
  props: {
    bottom: {
      type: Number,
      default: 24,
    },
    right: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      percentage: 0,
      scrolling: false,
    };
  },
  computed: {
    navMenu: {
      get() {
        return this.$store.getters.navMenu;
      },
    },
    mobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  methods: {
    onScroll() {
      this.hideCursor();
      if (this.percentage < 10) {
        this.$vuetify.goTo(200);
      } else {
        this.$vuetify.goTo(0);
        this.$store.dispatch('SET_SCROLLING', true);
        setTimeout(() => {
          this.$store.dispatch('SET_SCROLLING', false);
        }, 600);
      }
    },
    handleScroll() {
      let topPosition = Math.floor(
        document.documentElement.scrollTop || document.body.scrollTop,
      );
      let bottomPosition =
        document.getElementById('app').scrollHeight - window.innerHeight;

      this.$store.dispatch('SET_SCROLL_POS', topPosition);

      this.percentage =
        topPosition !== 0
          ? Math.floor((topPosition / bottomPosition) * 100)
          : 0;
    },
  },
  mounted() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.scroll-arrow-container {
  width: 80px;
  height: 80px;
  z-index: 50;
  margin: 0 auto;
  position: fixed;
  cursor: pointer;
  will-change: transform;
  transition: transform 150ms ease-out, right 450ms ease;
  transform: translate3d(0px, 0px, 0px);
}
.scroll-arrow-wrapper {
  padding: 20px 20px;
  transition: 250ms;
}
</style>
