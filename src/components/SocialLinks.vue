<template>
  <div class="social-links-wrapper text-center" :style="`bottom: ${bottom}px;left: ${left}px;`">
    <div class="social-links-content-wrapper">
      <div
        @click="toggle()"
        @mouseover="showCursor('LINKS')"
        class="speedial-container white--text"
        @mousemove="iconHover($event,'.speedial-container','.speedial-wrapper')"
        @mouseout="iconHover($event,'.speedial-container','.speedial-wrapper');hideCursor();"
      >
        <div class="speedial-wrapper">
          <v-progress-circular
            size="40"
            width="2"
            :value="hide ? 0 : 100"
            :color="$vuetify.theme.dark ? '#e0e0e0' : '#212121'"
          >
            <v-btn icon @click="onScroll" :color="$vuetify.theme.dark ? '#e0e0e0' : '#212121'">
              <v-icon :style="`transform: rotate(${hide ? '45':'90'}deg)`">mdi-chevron-left</v-icon>
            </v-btn>
          </v-progress-circular>
        </div>
      </div>
      <div
        @mouseover="showCursor()"
        :class="hide ? 'hide-icon':''"
        class="link-logo-container-gh"
        @click="openLink('https://github.com/AKAspanion')"
        @mousemove="iconHover($event,'.link-logo-container-gh','.link-logo-wrapper-gh')"
        @mouseout="iconHover($event,'.link-logo-container-gh','.link-logo-wrapper-gh');hideCursor();"
      >
        <div class="link-logo-wrapper-gh">
          <v-icon>mdi-github-circle</v-icon>
        </div>
      </div>
      <div
        @mouseover="showCursor()"
        :class="hide ? 'hide-icon':''"
        class="link-logo-container-li"
        @click="openLink('https://www.linkedin.com/in/spanion')"
        @mousemove="iconHover($event,'.link-logo-container-li','.link-logo-wrapper-li')"
        @mouseout="iconHover($event,'.link-logo-container-li','.link-logo-wrapper-li');hideCursor();"
      >
        <div class="link-logo-wrapper-li">
          <v-icon>mdi-linkedin-box</v-icon>
        </div>
      </div>
      <div
        @mouseover="showCursor()"
        :class="hide ? 'hide-icon':''"
        class="link-logo-container-in"
        @click="openLink('https://www.instagram.com/spanionkumar')"
        @mousemove="iconHover($event,'.link-logo-container-in','.link-logo-wrapper-in')"
        @mouseout="iconHover($event,'.link-logo-container-in','.link-logo-wrapper-in');hideCursor();"
      >
        <div class="link-logo-wrapper-in">
          <v-icon>mdi-instagram</v-icon>
        </div>
      </div>
      <div
        @mouseover="showCursor()"
        :class="hide ? 'hide-icon':''"
        class="link-logo-container-fb"
        @click="openLink('https://www.facebook.com/AKAspanion')"
        @mousemove="iconHover($event,'.link-logo-container-fb','.link-logo-wrapper-fb')"
        @mouseout="iconHover($event,'.link-logo-container-fb','.link-logo-wrapper-fb');hideCursor();"
      >
        <div class="link-logo-wrapper-fb">
          <v-icon size="24">mdi-facebook</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bottom: {
      type: Number,
      default: 24,
    },
    left: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      hide: true,
    };
  },
  methods: {
    toggle() {
      this.hide = !this.hide;
    },
    openLink(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped>
.social-links-wrapper {
  width: 80px;
  z-index: 50;
  margin: 0 auto;
  position: fixed;
  will-change: transform;
  transition: transform 150ms ease-out, left 450ms ease;
  transform: translate3d(0px, 0px, 0px);
}
.speedial-container,
.link-logo-container-fb,
.link-logo-container-gh,
.link-logo-container-in,
.link-logo-container-li {
  width: 80px;
  height: 80px;
  cursor: pointer;
  margin-bottom: 2px;
}
.speedial-wrapper,
.link-logo-wrapper-fb,
.link-logo-wrapper-gh,
.link-logo-wrapper-in,
.link-logo-wrapper-li {
  padding: 28px;
  transition: 250ms;
}

.social-links-content-wrapper {
  position: relative;
}

.link-logo-container-fb,
.link-logo-container-gh,
.link-logo-container-in,
.link-logo-container-li {
  position: absolute;
  transition: 250ms;
  left: 0px;
}

.link-logo-container-gh {
  top: -328px;
  transition-delay: 150ms;
}
.link-logo-container-li {
  top: -246px;
  transition-delay: 100ms;
}
.link-logo-container-in {
  top: -164px;
  transition-delay: 50ms;
}
.link-logo-container-fb {
  top: -82px;
}
.hide-icon {
  opacity: 0;
  left: -100%;
  transition: 250ms;
  pointer-events: none;
}
.speedial-wrapper {
  padding: 20px;
}
</style>
