<template>
  <div id="app" >
    <v-app>
    <HamBurger 
      :alive="isMenuActive" 
      @click.native="onHamClick"/>
    <MenuBar 
      :alive="isMenuActive" 
      :menuItems="menuItems"
      @click.native="onMenuClick"/>
      <transition
        :name="transitionName"
        mode="out-in"
      >
        <router-view/>
      </transition>
      <!-- <vuetify-playground v-on:dataFromSchedule="onChildClick"/> -->
    </v-app>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue'
import HamBurger from './components/HamBurger.vue'
// import VuetifyPlayground from './VuetifyPlayground.vue'

const DEFAULT_TRANSITION = 'slide-left';
export default {
  name: 'app',
  components: {
    MenuBar,
    HamBurger,
    // VuetifyPlayground
  },
  data(){
    return{      
      isMenuActive: false,
      menuItems: ['home', 'about', 'contact'],
      scrollPosition: 0,
      SCROLL_VALUE: 5,
      routeIndex: 0,
      transitionName: DEFAULT_TRANSITION,
    }
  },
  methods: {
      onHamClick(){
        this.isMenuActive = !this.isMenuActive;
      },
      onMenuClick(){
        if(this.isMenuActive){
          this.isMenuActive = false;
        }
      },
      onChildClick (value) {
        console.log(value);
      },      
      handleScroll (event) {
        let path = '/';
        if(event.deltaY < 0){
          if(this.routeIndex !== 0){
            path += this.menuItems[this.routeIndex-1];
          }else{
            path += this.menuItems[this.routeIndex];
          }
        }
        else{
          if(this.routeIndex !== 2){
            path += this.menuItems[this.routeIndex+1];
          }else{
            path += this.menuItems[this.routeIndex];
          }
        }
        this.$router.push(path);
      },
      changeScrollPos(event){
        if(event){
          this.scrollPosition += this.SCROLL_VALUE;
        }else{
          if(this.scrollPosition > 0){
            this.scrollPosition -= this.SCROLL_VALUE;
          }
        }
      }
    },
    created () {
      window.addEventListener('mousewheel', this.handleScroll);
      this.$router.beforeEach((to, from, next) => { 
        this.routeIndex = to.meta.index; 
        if (to.meta) {
          var transitionName = to.meta.index < from.meta.index ? 'slide-right' : 'slide-left';
        }
        this.transitionName = transitionName || DEFAULT_TRANSITION;
        next();
      });
    },
    destroyed () {
      window.removeEventListener('mousewheel', this.handleScroll);
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');
@font-face {
  font-family: "Hipstelvetica";
  src: url("./assets/fonts/Hipstelvetica.ttf");
}

@font-face {
  font-family: "Andis";
  src: url("./assets/fonts/Andis.ttf");
}
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
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
      width: 0;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
