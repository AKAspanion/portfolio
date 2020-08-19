<template>
  <div class="home-container" :style="containerStyle">
    <div class="home-text-wrapper">
      <div class="home-text-container home-padding">
        <div class="fixed-wrapper">
          <div class="d-inline-block my-1 pb-2">Hi.</div>
          <br />
          <div class="d-inline-block my-1 pb-2">
            <mask-text :delay="delay(500)">My name is,</mask-text>
          </div>
          <br />
          <div class="d-inline-block my-1 pb-2">
            <mask-text :delay="delay(1500)">
              <hover-text
                text="KNOW ABOUT ME"
                classes="home-text--name"
                link="images/profile.jpeg"
                @click="goToRoute('/about')"
              >Ankit Pandit</hover-text>-
            </mask-text>
          </div>
          <br />
          <div class="d-inline-block my-1 pb-2">
            <mask-text :delay="delay(2000)">Software and</mask-text>
          </div>
          <br />
          <div class="d-inline-block my-1 pb-2">
            <mask-text :delay="delay(2500)">Web developer.</mask-text>
          </div>
        </div>
      </div>
    </div>
    <template v-if="loaded">
      <div class="project-text-wrapper pb-8">
        <div class="about-headline home-padding">
          <div class="fixed-wrapper">
            <div class="text-center mb-2 mt-6">
              <div class="d-inline-block mb-12 display-2 font-weight-light">
                <mask-text v-model="aboutHead" :delay="maskDelay">PROJECTS</mask-text>
              </div>
            </div>
            <div class="work-grid">
              <div
                class="work-grid__item"
                v-for="({name, img, link, icons}, i) in projectItems"
                :key="i"
              >
                <skew-on-hover classes="work-grid__img">
                  <img :src="`images/${img}.png`" />

                  <div class="work-grid__view-link title">
                    <hover-text
                      :text="`GO TO ${name}`"
                      @click="navigateTo(link)"
                      :link="`images/ss/${img}.jpg`"
                      class="text-center home-text--name"
                    >
                      VIEW
                      <br />&rarr;
                    </hover-text>
                  </div>
                  <div class="work-grid__hover-item"></div>
                </skew-on-hover>
                <div>
                  <div class="d-inline-block pt-4 title font-weight-medium">
                    <mask-text v-model="aboutHead" :delay="maskDelay">{{name}}</mask-text>
                  </div>
                </div>
                <span v-for="(icon, i) in icons" :key="i" class="d-inline-block">
                  <v-icon
                    small
                    :color="icon.color"
                  >{{ icon.icon.startsWith('M') ? icon.icon : `mdi-${icon.icon}`}}</v-icon>
                  <span class="ml-2 mr-4 overline">{{icon.name}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="exp-text-wrapper pb-8">
        <div class="home-padding">
          <div class="fixed-wrapper">
            <div class="text-center mb-2 mt-6">
              <div class="d-inline-block mb-12 display-2 font-weight-light">
                <mask-text v-model="aboutHead" :delay="maskDelay">EXPERIENCE</mask-text>
              </div>
            </div>
            <div class="exp-grid">
              <div
                :key="i"
                class="exp-grid__item"
                v-for="({name, role, time, img, link, location, desc}, i) in expItems"
              >
                <div>
                  <div class="d-inline-block font-weight-light display-1">
                    <mask-text v-model="aboutHead" :delay="maskDelay">
                      <hover-text
                        :text="name"
                        classes="home-text--name"
                        :link="`images/${img}.png`"
                        @click="navigateTo(link)"
                      >{{name}}</hover-text>,
                    </mask-text>
                  </div>&nbsp;
                  <div class="d-inline-block headline font-weight-thin">{{role}}</div>
                </div>
                <div class="pt-3 title font-weight-light">{{desc}}</div>
                <div class="pt-8 font-weight-light">{{location}}</div>
                <div class="overline">{{time}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-text-wrapper">
        <div class="home-padding">
          <div class="fixed-wrapper">
            <div class="text-center mb-2 mt-6">
              <div class="d-inline-block mb-12 display-2 font-weight-light">
                <mask-text v-model="aboutHead" :delay="maskDelay">SKILLS</mask-text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="skills-text-wrapper">
        <div class="home-padding">
          <div class="fixed-wrapper">
            <div class="text-center mb-2 mt-6">
              <div class="d-inline-block mb-12 display-2 font-weight-light">
                <mask-text v-model="aboutHead" :delay="maskDelay">CONTACT</mask-text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import HoverText from '@/components/HoverText.vue';
import MaskText from '@/components/MaskText.vue';
import SkewOnHover from '@/components/SkewOnHover.vue';
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
      expItems: [
        {
          name: 'Global IDs',
          role: 'Web Software Developer',
          location: 'Kolkata, India',
          time: 'MAY 2019 - Present',
          img: 'gids',
          link: 'https://www.globalids.com/',
          desc:
            'As a Web/Software Developer, I build reusable web components and UI framework from scratch, for the product using Vue.js and Vuetify.js.',
        },
        {
          name: 'TCS',
          role: 'Assistant Systems Engineer',
          location: 'Kolkata, India',
          time: 'JUNE 2018 - FEBRUARY 2019',
          img: 'tcs',
          link: 'https://www.tcs.com/',
          desc:
            'As a Trainee Developer, I built backend web application/REST API modules along with my team for the project using Node/Mongoose.',
        },
      ],
      projectItems: [
        {
          name: 'UI NEUMORPHISM',
          img: 'neu',
          link: 'https://akaspanion.github.io/ui-neumorphism/',
          icons: [
            { name: 'React', icon: 'react', color: '#61DAFB' },
            {
              name: 'Component Library',
              icon: 'notebook-multiple',
              color: '#2979FF',
            },
          ],
        },
        {
          name: 'FLASH CARDS',
          img: 'fc',
          link: 'https://spanion-flash-cards.web.app/',
          icons: [
            { name: 'Vue', icon: 'vuejs', color: '#4FC08D' },
            { name: 'Vuetify', icon: 'vuetify', color: '#1867C0' },
            { name: 'Android', icon: 'android', color: '#3DDC84' },
            { name: 'Firebase', icon: 'firebase', color: '#FFCA28' },
          ],
        },
        {
          name: 'TASK MANAGER',
          img: 'task',
          link: 'https://spanion-todo.web.app/',
          icons: [
            { name: 'Vue', icon: 'vuejs', color: '#4FC08D' },
            { name: 'Vuetify', icon: 'vuetify', color: '#1867C0' },
            { name: 'Firebase', icon: 'firebase', color: '#FFCA28' },
          ],
        },
        {
          name: 'LENS-N-LIGHT',
          img: 'lnl',
          link: 'https://lens-n-light.web.app/',
          icons: [
            { name: 'Vue', icon: 'vuejs', color: '#4FC08D' },
            { name: 'Vuetify', icon: 'vuetify', color: '#1867C0' },
          ],
        },
        {
          name: 'NOTES APP',
          img: 'note',
          link: 'https://ankitkumarspanion.github.io/iarani-test/',
          icons: [
            { name: 'React', icon: 'react', color: '#61DAFB' },
            {
              name: 'Redux',
              icon:
                'M16.633 16.504c.869-.075 1.543-.84 1.499-1.754-.046-.914-.795-1.648-1.708-1.648h-.061c-.943.031-1.678.824-1.648 1.769.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.004 4.795-1.603.838-3.296 1.154-4.944.929-1.378-.194-2.456-.81-3.116-1.798-.988-1.499-1.078-3.116-.255-4.734.601-1.169 1.499-2.023 2.099-2.443-.15-.389-.33-1.048-.42-1.542-4.436 3.177-3.985 7.521-2.637 9.574 1.004 1.498 3.057 2.456 5.304 2.456.599 0 1.229-.044 1.843-.194 3.896-.749 6.847-3.086 8.54-6.532l.014-.031zM21.981 12.758c-2.321-2.727-5.738-4.225-9.634-4.225h-.51c-.253-.554-.837-.899-1.497-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074c.675-.03 1.259-.45 1.498-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.004 2.622 2.322 3.236 3.896.538 1.288.509 2.547-.045 3.597-.854 1.647-2.293 2.517-4.195 2.517-1.199 0-2.367-.375-2.967-.644-.359.298-.959.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.093-1.647 5.918-3.236.898-1.798.824-4.824-1.469-7.416l-.014.03zM6.49 17.042c.029.899.793 1.648 1.708 1.648h.06c.959-.03 1.693-.823 1.648-1.768 0-.899-.779-1.647-1.693-1.647h-.061c-.06 0-.149 0-.225.029-1.243-2.098-1.768-4.346-1.572-6.771.119-1.828.719-3.417 1.797-4.735.899-1.124 2.592-1.679 3.746-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.449c-.345-4.914-3.4-7.492-6.322-7.492-2.742 0-5.273 1.993-6.293 4.915-1.393 3.896-.479 7.641 1.229 10.638-.149.195-.239.539-.209.868z',
              color: '#764ABC',
            },
            {
              name: 'Bootstrap',
              icon:
                'M20 0H4C1.793.006.006 1.793 0 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zm-2.187 16.855c-.2.482-.517.907-.923 1.234-.42.34-.952.62-1.607.82-.654.203-1.432.305-2.333.305H6.518v-14h6.802c1.258 0 2.266.283 3.02.86.76.58 1.138 1.444 1.138 2.61 0 .705-.172 1.31-.518 1.81-.344.497-.84.886-1.48 1.156v.046c.854.18 1.515.585 1.95 1.215s.658 1.426.658 2.387c0 .538-.104 1.05-.3 1.528l.025.027zm-2.776-3.45c-.41-.375-.986-.558-1.73-.558H8.985v4.368h4.334c.74 0 1.32-.192 1.73-.58.41-.385.62-.934.62-1.64-.007-.69-.21-1.224-.62-1.59h-.017zm-.6-2.823c.396-.336.59-.817.59-1.444 0-.704-.175-1.204-.53-1.49-.352-.285-.86-.433-1.528-.433h-4v3.863h4c.583 0 1.08-.17 1.464-.496z',
              color: '#563D7C',
            },
          ],
        },
        {
          name: 'FEATURE PHONE CLONE',
          img: 'phone',
          link: 'https://ankitkumarspanion.github.io/ownerstown-test-app/',
          icons: [
            {
              name: 'HTML',
              icon:
                'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z',
              color: '#E34F26',
            },
            {
              name: 'CSS',
              icon:
                'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z',
              color: '#1572B6',
            },
          ],
        },
        {
          name: 'VIDEO CHAT ROOM',
          img: 'chat',
          link: 'https://spanion-video-chat.herokuapp.com/',
          icons: [
            { name: 'Node', icon: 'nodejs', color: '#339933' },
            {
              name: 'Socket.io',
              icon:
                'M11.936.016a12.17 12.17 0 0 0-2.975.378C4.281 1.557.567 5.797.091 10.604c-.59 4.549 1.708 9.286 5.644 11.635 3.861 2.418 9.093 2.32 12.874-.223 3.397-2.206 5.512-6.228 5.386-10.285-.058-4.016-2.31-7.917-5.759-9.98C16.354.59 14.143.007 11.936.016zm-.063 1.696c4.945-.007 9.789 3.814 10.282 8.925.945 5.66-3.753 11.413-9.488 11.58-5.454.544-10.725-4.08-10.88-9.557C1.38 8.226 4.303 3.825 8.485 2.36a9.113 9.113 0 0 1 3.388-.647zm5.091 3.225c-2.687 2.085-5.26 4.308-7.889 6.457 1.203.017 2.412.016 3.621.01 1.41-2.165 2.859-4.301 4.268-6.467zm-5.665 7.654c-1.41 2.166-2.86 4.309-4.27 6.474 2.693-2.08 5.255-4.32 7.902-6.456a255.425 255.425 0 0 0-3.632-.018z',
              color: '#010101',
            },
          ],
        },
        {
          name: 'SNAKE GAME',
          img: 'snake',
          link: 'https://akaspanion.github.io/react-redux-snake/',
          icons: [
            { name: 'React', icon: 'react', color: '#61DAFB' },
            {
              name: 'Redux',
              icon:
                'M16.633 16.504c.869-.075 1.543-.84 1.499-1.754-.046-.914-.795-1.648-1.708-1.648h-.061c-.943.031-1.678.824-1.648 1.769.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.004 4.795-1.603.838-3.296 1.154-4.944.929-1.378-.194-2.456-.81-3.116-1.798-.988-1.499-1.078-3.116-.255-4.734.601-1.169 1.499-2.023 2.099-2.443-.15-.389-.33-1.048-.42-1.542-4.436 3.177-3.985 7.521-2.637 9.574 1.004 1.498 3.057 2.456 5.304 2.456.599 0 1.229-.044 1.843-.194 3.896-.749 6.847-3.086 8.54-6.532l.014-.031zM21.981 12.758c-2.321-2.727-5.738-4.225-9.634-4.225h-.51c-.253-.554-.837-.899-1.497-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074c.675-.03 1.259-.45 1.498-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.004 2.622 2.322 3.236 3.896.538 1.288.509 2.547-.045 3.597-.854 1.647-2.293 2.517-4.195 2.517-1.199 0-2.367-.375-2.967-.644-.359.298-.959.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.093-1.647 5.918-3.236.898-1.798.824-4.824-1.469-7.416l-.014.03zM6.49 17.042c.029.899.793 1.648 1.708 1.648h.06c.959-.03 1.693-.823 1.648-1.768 0-.899-.779-1.647-1.693-1.647h-.061c-.06 0-.149 0-.225.029-1.243-2.098-1.768-4.346-1.572-6.771.119-1.828.719-3.417 1.797-4.735.899-1.124 2.592-1.679 3.746-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.449c-.345-4.914-3.4-7.492-6.322-7.492-2.742 0-5.273 1.993-6.293 4.915-1.393 3.896-.479 7.641 1.229 10.638-.149.195-.239.539-.209.868z',
              color: '#764ABC',
            },
          ],
        },
        {
          name: 'DOG TRAINING STARTUP WEBSITE',
          img: 'paw',
          link: 'https://akaspanion.github.io/dog-training-academy-start-up/',
          icons: [
            {
              name: 'HTML',
              icon:
                'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z',
              color: '#E34F26',
            },
            {
              name: 'CSS',
              icon:
                'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z',
              color: '#1572B6',
            },
            {
              name: 'jQuery',
              icon: 'jquery',
              color: '#0769AD',
            },
          ],
        },
      ],
    };
  },
  computed: {
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
      // return this.$store.getters.loaded;
      return true;
    },
  },
  methods: {
    goToRoute() {
      // this.$router.push(path);
      this.hideCursor();
    },
    delay(time) {
      return this.loaded ? this.maskDelay : this.maskDelay + time;
    },
    navigateTo(link) {
      window.open(link, '_blank');
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('LOADED', true);
      // }, 4000);
    }, 0);
  },
};
</script>
<style >
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
    padding: 148px 24px;
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
  font-size: 8vw;
  line-height: 7vw;
  overflow: hidden;
  text-transform: uppercase;
  font-weight: 100 !important;
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
  background: #616161;
}
.theme--dark .contact-text-wrapper {
  background: #757575;
}
.theme--light .project-text-wrapper {
  background: #eeeeee;
}
.theme--light .exp-text-wrapper {
  background: #f5f5f5;
}
.theme--light .contact-text-wrapper {
  background: #fafafa;
}

.work-grid,
.exp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
.work-grid__item {
  padding: 48px 24px;
  position: relative;
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

.exp-grid__item {
  padding: 48px 24px;
}
</style>
