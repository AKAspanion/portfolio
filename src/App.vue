<template>
    <v-app>
        <nav-menu></nav-menu>
        <scroll-progress></scroll-progress>
        <cursor-animated></cursor-animated>
        <menu-hamburger
            :top="hamPosition.top"
            :right="hamPosition.right"
        ></menu-hamburger>
        <router-view></router-view>
    </v-app>
</template>

<script>
import NavMenu from '@/views/NavMenu.vue';
import CursorAnimated from '@/components/CursorAnimated.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';
import MenuHamburger from '@/components/MenuHamburger.vue';
export default {
    name: 'app',
    components: {
        NavMenu,
        CursorAnimated,
        ScrollProgress,
        MenuHamburger,
    },
    computed: {
        hamPosition() {
            if (this.$vuetify.breakpoint.xsOnly) {
                return {
                    top: 23,
                    right: 20,
                };
            } else {
                return {
                    top: 103,
                    right: 100,
                };
            }
        },
    },
};
</script>

<style>
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
.scroll-icon {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 50%;
    justify-content: space-between;
    align-items: stretch;
    transform: translateX(-50%);
}
.scroll-title {
    text-align: center;
    width: 50px;
    padding: 7px 5px 5px 5px;
    color: white;
    font-size: 10px;
}
.arrow-container {
    width: 22px;
    cursor: pointer;
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
.test {
    background: red;
}
</style>
