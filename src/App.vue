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
      <div class="scroll-icon">
        <div class="arrow-container">
          <div v-show="routeIndex !== 0" @click="navigate('left')"  class=""><v-icon color="white">arrow_left</v-icon></div>
        </div>
        <div class="scroll"> scroll </div>
        <div class="arrow-container">
          <div v-show="routeIndex !== 2" @click="navigate('right')" class=""><v-icon color="white">arrow_right</v-icon></div>
        </div>
      </div>
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
        if(!this.isMenuActive){
          if(event.deltaY < 0){
            this.navigate('left');
          }
          else{
            this.navigate('right')
          }
        }
      },
      navigate(direction){        
        let path = '/';
        if(direction === 'left'){
          if(this.routeIndex !== 0){
            path += this.menuItems[this.routeIndex-1];
          }else{
            path += this.menuItems[this.routeIndex];
          }
        }else if(direction === 'right'){
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
          var transition = to.meta.index < from.meta.index ? 'slide-right' : 'slide-left';
        }
        this.transitionName = transition || DEFAULT_TRANSITION;
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
  text-rendering: optimizeLegibility;
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
.scroll-icon{
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-49%);
  text-align: center;
}
.scroll{
  padding: 5px;
  color: white; 
  font-size: 10px
}
.arrow-container{
  width: 22px;
}

.link{
    text-decoration: none;
    color: #FEFFFF;
    transition: 0.3s ease;
}
.link:hover{
  box-shadow: inset 0px -15px 0 #FFF;
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
