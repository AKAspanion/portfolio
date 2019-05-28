<template>
  <div id="app" >
    <HamBurger 
      :alive="isMenuActive" 
      @click.native="onHamClick"/>
    <MenuBar 
      :alive="isMenuActive" 
      :menuItems="menuItems"
      @click.native="onMenuClick"/>
      <transition name="router-anim">
        <router-view>
        </router-view>
      </transition>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue'
import HamBurger from './components/HamBurger.vue'

export default {
  name: 'app',
  components: {
    MenuBar,
    HamBurger
  },
  data(){
    return{      
      isMenuActive: false,
      menuItems: ['home', 'about', 'work', 'contact']
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
      }
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
body{
  margin: 0;
  padding: 0;  
  overflow: hidden;
}
#app {
  font-family: 'Rubik';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* .router-anim-enter-active{
  animation: coming 1s;
  animation-delay: .5s;
  opacity: 0;
}
.router-anim-leave-active{
  animation: going 1s;
}
@keyframes going{
  from{
    transform: translate(0)
  }
  to{
    transform: translateY(-100vh);
    opacity: 0;
  }
}

@keyframes coming {
  from{
    transform: translateY(100vh);
    opacity: 0;
  }
  to{
    transform: translate(0);
    opacity: 1;
  }
} */
</style>
