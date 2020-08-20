<template>
  <v-app :class="loaded ? '' : 'disable-cursor'">
    <nav-menu></nav-menu>
    <cursor-animated></cursor-animated>
    <v-fade-transition>
      <div v-show="scrollPosition > 1 && !hamPosition.top" :style="background" class="nav-shadow"></div>
    </v-fade-transition>
    <spanion-logo :top="hamPosition.top" :left="loaded ? hamPosition.right : -80"></spanion-logo>
    <scroll-progress :bottom="hamPosition.top" :right="loaded ? hamPosition.right : -80"></scroll-progress>
    <menu-hamburger :top="hamPosition.top" :right="loaded ? hamPosition.right : -80"></menu-hamburger>
    <social-links
      v-if="hamPosition.top"
      :bottom="hamPosition.top"
      :left="loaded ? hamPosition.right : -80"
    ></social-links>
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import NavMenu from '@/views/NavMenu.vue';
import CursorAnimated from '@/components/CursorAnimated.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';
import SpanionLogo from '@/components/SpanionLogo.vue';
import SocialLinks from '@/components/SocialLinks.vue';
import MenuHamburger from '@/components/MenuHamburger.vue';
export default {
  name: 'app',
  components: {
    NavMenu,
    SocialLinks,
    SpanionLogo,
    MenuHamburger,
    CursorAnimated,
    ScrollProgress,
  },
  computed: {
    hamPosition() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return {
          top: 0,
          right: 12,
        };
      } else {
        return {
          top: 40,
          right: 40,
        };
      }
    },
    background() {
      return `background: ${this.$vuetify.theme.dark ? '#212121' : '#E0E0E0'};`;
    },
    scrollPosition() {
      return this.$store.getters.scrollPos;
    },
    loaded() {
      return this.$store.getters.loaded;
    },
    mobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    dark() {
      return this.$vuetify.theme.dark;
    },
  },
  watch: {
    scrollPosition: {
      handler(v) {
        if (v && this.mobile) {
          let offset = v + 80;
          let navShadow = document.querySelector('.nav-shadow');
          let container = document.querySelector('.project-text-wrapper');
          let container2 = document.querySelector('.exp-text-wrapper');
          let container3 = document.querySelector('.contact-text-wrapper');
          if (0 <= offset && offset <= container.offsetTop) {
            navShadow.style.backgroundColor = this.dark ? '#212121' : '#E0E0E0';
          } else if (
            container.offsetTop < offset &&
            offset <= container2.offsetTop
          ) {
            navShadow.style.backgroundColor = window.getComputedStyle(
              container,
            ).backgroundColor;
          } else if (
            container2.offsetTop < offset &&
            offset <= container3.offsetTop
          ) {
            navShadow.style.backgroundColor = window.getComputedStyle(
              container2,
            ).backgroundColor;
          } else {
            navShadow.style.backgroundColor = window.getComputedStyle(
              container3,
            ).backgroundColor;
          }
          if (v && v > 1) {
            // navShadow.classList.add('elevation-3');
            navShadow.style.boxShadow = `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`;
          }
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
@import url('/assets/style.css');
@import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');
@font-face {
  font-family: 'Hipstelvetica';
  src: url('./assets/fonts/Hipstelvetica.ttf');
}

@font-face {
  font-family: 'Andis';
  src: url('./assets/fonts/Andis.ttf');
}
* {
  margin: 0px;
  padding: 0px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
body {
  margin: 0;
  padding: 0;
  z-index: -1;
  transition: 0.5s ease;
}
#app {
  font-family: 'Rubik';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(65, 65, 65);
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #424242;
}
::-webkit-scrollbar-thumb:hover {
  background: #000000;
}
.page-enter-active,
.page-leave-active {
  transition: transform 0.9s cubic-bezier(1, 0, 0, 1);
}
.page-enter,
.page-leave-to {
  transform: translateX(100vw);
  transition-timing-function: cubic-bezier(1, 0, 0, 1);
}
.disable-cursor {
  pointer-events: none;
}
.nav-shadow {
  width: 100vw;
  height: 80px;
  z-index: 48;
  position: fixed;
}
</style>
