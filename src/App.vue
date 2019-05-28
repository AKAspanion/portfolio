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
  color: rgb(65, 65, 65);
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

/* for Hover effect */
span {
    position: relative;
    display: block;
    cursor: pointer;
}

span:before, span:after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    top: 55%;
    margin-top: -0.5px;
    background: #fff;
}

span:before {
    left: -2.5px;   
}
span:after {
    right: 2.5px;
    background: #fff;
    transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

span:hover:before {
    background: #fff;
    width: 100%;
    transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

span:hover:after {
    background: transparent;
    width: 100%;
    transition: 0s;
}

::-webkit-scrollbar {
      width: 0;
}
</style>
