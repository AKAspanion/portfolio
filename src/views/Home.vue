<template>
  <div class="home-container" :style="containerStyle">
    <div class="home-text-wrapper">
      <div id="home" class="home-text-container home-padding">
        <div class="fixed-wrapper">
          <div class="d-inline-block my-1 pb-2">{{ $t('hi') }}</div>
          <br />
          <div class="d-inline-block my-1 pb-2">
            <mask-text :delay="maskDelay">{{ $t('home.salute') }},</mask-text>
          </div>
          <br />
          <div class="d-inline-block my-1 pb-2">
            <mask-text :delay="maskDelay">
              <hover-text
                :text="$t('home.know-me')"
                classes="home-text--name"
                link="images/profile.jpeg"
                @click="goToRoute('/about')"
                >{{ $t('home.name') }}</hover-text
              >-
            </mask-text>
          </div>
          <br />
          <div class="d-inline-block my-1 pb-2">
            <mask-text :delay="maskDelay">{{
              $t('home.designation-1')
            }}</mask-text>
          </div>
          <br />
          <div class="d-inline-block my-1 pb-2">
            <mask-text :delay="maskDelay">{{
              $t('home.designation-2')
            }}</mask-text>
          </div>
        </div>
      </div>
    </div>
    <template v-if="loaded">
      <div id="projects" class="project-text-wrapper">
        <div class="about-headline home-padding">
          <div class="fixed-wrapper" :class="mobile ? '' : 'pt-12 mt-4'">
            <div class="text-center">
              <div class="d-inline-block display-2 font-weight-light">
                <mask-text v-model="aboutHead" :delay="maskDelay">{{
                  $t('projects.title')
                }}</mask-text>
              </div>
            </div>
            <div class="text-center pt-4 mb-12 pb-12">
              <div class="d-inline-block title font-weight-light">
                {{ $t('projects.subtitle') }}
              </div>
            </div>
            <div class="work-grid">
              <div
                class="work-grid__item"
                v-for="({ name, img, link, icons }, i) in projectItems"
                :key="i"
              >
                <skew-on-hover classes="work-grid__img">
                  <img :alt="img" :src="`images/${img}.png`" />

                  <div class="work-grid__view-link title">
                    <hover-text
                      @click="navigateTo(link)"
                      :link="`images/ss/${img}.jpg`"
                      class="text-center home-text--name"
                      :text="`${$t('projects.go-to')}, ${name}`"
                    >
                      {{ $t('view') }}
                      <br />&rarr;
                    </hover-text>
                  </div>
                  <div class="work-grid__hover-item"></div>
                </skew-on-hover>
                <div>
                  <div class="d-inline-block pt-4 title font-weight-medium">
                    <mask-text v-model="aboutHead" :delay="maskDelay">{{
                      name
                    }}</mask-text>
                  </div>
                </div>
                <span
                  v-for="(icon, i) in icons"
                  :key="i"
                  class="d-inline-block"
                >
                  <v-icon small :color="icon.color">{{
                    icon.icon.startsWith('M') ? icon.icon : `mdi-${icon.icon}`
                  }}</v-icon>
                  <span class="ml-2 mr-4 overline">{{ icon.name }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="skills" class="skills-text-wrapper">
        <div class="home-padding">
          <div class="fixed-wrapper" :class="mobile ? '' : 'pt-12 mt-4'">
            <div class="text-center">
              <div class="d-inline-block display-2 font-weight-light">
                <mask-text v-model="aboutHead" :delay="maskDelay">{{
                  $t('skills.title')
                }}</mask-text>
              </div>
            </div>
            <div class="text-center pt-4 mb-12 pb-12">
              <div class="d-inline-block title font-weight-light">
                {{ $t('skills.subtitle') }}
              </div>
            </div>
            <div class="skill-grid pt-12 pb-12 mb-12">
              <div
                :key="i"
                class="skill-grid__item"
                @mouseout="hideCursor()"
                @mouseover="showCursor()"
                v-for="({ name, icon, top }, i) in skillItems"
                :style="{
                  background: dark ? '#424242' : '#EEEEEE',
                  borderBottom: `2px solid ${top ? '#4FC08D' : '#FFCA28'}`,
                }"
              >
                <img
                  :alt="icon"
                  class="skill-grid__img"
                  :src="`images/icons/${icon}.svg`"
                />
                <div
                  :class="[
                    'subtitle-1 font-weight-light pt-3',
                    dark ? 'white--text' : 'black--text',
                  ]"
                >
                  {{ name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="experience" class="exp-text-wrapper">
        <div class="home-padding">
          <div class="fixed-wrapper" :class="mobile ? '' : 'pt-12 mt-4'">
            <div class="text-center">
              <div class="d-inline-block display-2 font-weight-light">
                <mask-text v-model="aboutHead" :delay="maskDelay">{{
                  $t('experience.title')
                }}</mask-text>
              </div>
            </div>
            <div class="text-center pt-4 mb-12 pb-8">
              <div class="d-inline-block title font-weight-light">
                {{ $t('experience.subtitle') }}
              </div>
            </div>
            <div class="exp-grid pb-12">
              <div
                :key="i"
                class="exp-grid__item"
                :style="`background: ${dark ? '#616161' : '#f5f5f5'}`"
                v-for="({ name, role, time, img, link, location, desc },
                i) in expItems"
              >
                <div>
                  <div class="d-inline-block font-weight-light display-1">
                    <mask-text v-model="aboutHead" :delay="maskDelay">
                      <hover-text
                        :text="name"
                        classes="home-text--name"
                        :link="`images/${img}.png`"
                        @click="navigateTo(link)"
                        >{{ name }}</hover-text
                      >,
                    </mask-text>
                  </div>
                  &nbsp;
                  <div class="d-inline-block headline font-weight-thin">
                    {{ role }}
                  </div>
                  <div
                    @mouseout="hideCursor()"
                    @mouseover="showCursor()"
                    class="pt-3 title font-weight-light"
                  >
                    {{ desc }}
                  </div>
                </div>
                <div>
                  <div class="pt-8 font-weight-light">{{ location }}</div>
                  <div class="overline">{{ time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="contact" class="contact-text-wrapper">
        <div class="home-padding">
          <div class="fixed-wrapper" :class="mobile ? '' : 'pt-12 mt-4'">
            <div class="text-center mb-2 mt-6">
              <div class="d-inline-block display-2 font-weight-light">
                <mask-text v-model="aboutHead" :delay="maskDelay">{{
                  $t('contact.title')
                }}</mask-text>
              </div>
            </div>
            <div class="text-center pt-12 mt-12">
              <div class="d-inline-block headline font-weight-light">
                panditankit1995@gmail.com
              </div>
            </div>
            <div class="text-center pt-6 mb-12 pb-8">
              <div
                @mouseout="hideCursor()"
                @mouseover="showCursor()"
                class="d-inline-block mx-4 cursor-pointer"
                @click="navigateTo('https://github.com/AKAspanion')"
              >
                <v-icon size="32" color="#181717">mdi-github-circle</v-icon>
              </div>
              <div
                @mouseout="hideCursor()"
                @mouseover="showCursor()"
                class="d-inline-block mx-4 cursor-pointer"
                @click="navigateTo('https://www.linkedin.com/in/spanion')"
              >
                <v-icon size="32" color="#0077B5">mdi-linkedin-box</v-icon>
              </div>
              <div
                @mouseout="hideCursor()"
                @mouseover="showCursor()"
                class="d-inline-block mx-4 cursor-pointer"
                @click="navigateTo('https://www.instagram.com/spanionkumar')"
              >
                <v-icon size="32" color="#E4405F">mdi-instagram</v-icon>
              </div>
              <div
                @mouseout="hideCursor()"
                @mouseover="showCursor()"
                class="d-inline-block mx-4 cursor-pointer"
                @click="navigateTo('https://www.facebook.com/AKAspanion')"
              >
                <v-icon size="32" color="#1877F2">mdi-facebook</v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-text-wrapper py-12">
        <div
          class="pt-9 pb-10 title text-center font-weight-light text-uppercase"
        >
          {{ $t('copyright') }}
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import HoverText from '@/components/HoverText.vue';
import MaskText from '@/components/MaskText.vue';
import SkewOnHover from '@/components/SkewOnHover.vue';

import expEn from '../assets/json/en/experience.json';
import expHi from '../assets/json/hi/experience.json';
import skillsEn from '../assets/json/en/skills.json';
import skillsHi from '../assets/json/hi/skills.json';
import projectsEn from '../assets/json/en/projects.json';
import projectsHi from '../assets/json/hi/projects.json';

export default {
  name: 'SpanionHome',
  components: {
    SkewOnHover,
    HoverText,
    MaskText,
  },
  data() {
    return {
      maskDelay: 0,
      aboutHead: true,
      showLandingMask: true,
    };
  },
  computed: {
    expItems() {
      return this.$i18n.locale === 'en' ? expEn : expHi;
    },
    skillItems() {
      return this.$i18n.locale === 'en' ? skillsEn : skillsHi;
    },
    projectItems() {
      return this.$i18n.locale === 'en' ? projectsEn : projectsHi;
    },
    containerStyle() {
      let _style = { background: '#e0e0e0', color: '#212121' };
      if (this.$vuetify.theme.dark) {
        _style = {
          ..._style,
          background: '#212121',
          color: '#e0e0e0',
        };
      }
      return _style;
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
  methods: {
    goToRoute() {
      // this.$router.push(path);
      this.hideCursor();
    },
    navigateTo(link) {
      window.open(link, '_blank');
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('LOADED', true);
    }, 1500);
  },
};
</script>
<style>
.work-grid__img {
  height: 203px;
  object-fit: cover;
  position: relative;
  background: #d9d9d9;
}
.fixed-wrapper {
  margin: 0 auto;
  max-width: 1220px;
}
.home-padding {
  padding: 64px max(11vw, 128px);
}
@media only screen and (max-width: 600px) {
  .home-padding {
    padding: 148px 32px;
  }
  .home-text-container {
    font-size: 5.5vh;
    line-height: 6vh;
  }
}
</style>
<style scoped>
.home-container {
  width: 100vw;
  text-align: left;
  min-height: 100vh;
}
.home-text-wrapper {
  display: flex;
  min-height: 100vh;
  align-items: flex-end;
  justify-content: start;
}
.home-text-container {
  width: 100%;
  overflow: hidden;
  text-transform: uppercase;
  font-weight: 100 !important;
  font-size: max(7.8vw, 40px);
  line-height: max(6.4vw, 30px);
  font-family: Roboto, sans-serif !important;
}
.home-text--name {
  cursor: pointer;
  font-weight: 300 !important;
  transition: transform 150ms ease-out;
}
.home-about-item,
.home-project-item {
  text-align: justify;
  transform-origin: top left;
  transform: translate3d(0px, 96px, 0px) rotate(5deg);
  transition: transform 1s ease;
}
.theme--dark .project-text-wrapper {
  background: #424242;
}
.theme--dark .exp-text-wrapper {
  background: #757575;
}
.theme--dark .skills-text-wrapper {
  background: #616161;
}
.theme--dark .contact-text-wrapper {
  background: #424242;
}
.theme--light .project-text-wrapper {
  background: #eeeeee;
}
.theme--light .exp-text-wrapper {
  background: #fafafa;
}
.theme--light .skills-text-wrapper {
  background: #f5f5f5;
}
.theme--light .contact-text-wrapper {
  background: #eeeeee;
}

.work-grid,
.exp-grid {
  display: grid;
  gap: 0px 48px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
.work-grid__item,
.exp-grid__item {
  margin: 48px 0px;
  position: relative;
}
.exp-grid__item {
  padding: 32px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
}
img {
  width: 100%;
  height: 203px;
  object-fit: cover;
}
.work-grid__item:hover .work-grid__hover-item {
  opacity: 0.6;
  transition: all 0.3s ease-in-out;
}
.work-grid__item:hover .work-grid__view-link {
  transform: translate3d(-50%, -50%, 0px);
  transition: all 0.3s ease-in-out;
  opacity: 1;
}
.work-grid__hover-item {
  top: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;
  height: 203px;
  position: absolute;
  pointer-events: none;
  background: #000000;
  transition: all 0.3s ease-in-out;
}
.work-grid__view-link {
  top: 50%;
  left: 50%;
  opacity: 0;
  z-index: 2;
  color: white;
  position: absolute;
  transition: all 0.3s ease-in-out;
  transform: translate3d(-50%, 100%, 0px);
}

.skill-grid {
  display: grid;
  gap: 48px 48px;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
}
.skill-grid__item {
  display: flex;
  padding: 24px 0px;
  align-items: center;
  background: #9b9292;
  flex-direction: column;
  justify-content: center;
}
.skill-grid__item img {
  width: 32px;
  height: 32px;
  transition: 0.5s;
  text-align: center;
}
.skill-grid__img:hover {
  transform: scale(1.4);
  transition: 0.5s;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
