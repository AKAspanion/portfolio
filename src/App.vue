<template>
  <div id="app" >
    <HamBurger 
      :alive="isMenuActive" 
      @click.native="onHamClick"/>
    <MenuBar 
      :alive="isMenuActive" 
      :menuItems="menuItems"
      @click.native="onMenuClick"/>
      <transition>
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
      menuItems: ['home', 'about', 'contact']
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
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  margin: 0;
  padding: 0; 
  z-index: -1; 
}
#app {
  font-family: 'Rubik';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(65, 65, 65);
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
::-webkit-scrollbar {
      width: 0;
}
</style>
