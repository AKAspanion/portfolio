<template>
    <v-app>
        <nav-menu></nav-menu>
        <spanion-logo
            :top="hamPosition.top"
            :left="hamPosition.right"
        ></spanion-logo>
        <scroll-logo></scroll-logo>
        <scroll-progress></scroll-progress>
        <cursor-animated></cursor-animated>
        <menu-hamburger
            :top="hamPosition.top"
            :right="hamPosition.right"
        ></menu-hamburger>
        <transition name="page" mode="out-in">
            <router-view></router-view>
        </transition>
    </v-app>
</template>

<script>
import NavMenu from '@/views/NavMenu.vue';
import CursorAnimated from '@/components/CursorAnimated.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';
import ScrollLogo from '@/components/ScrollLogo.vue';
import SpanionLogo from '@/components/SpanionLogo.vue';
import MenuHamburger from '@/components/MenuHamburger.vue';
export default {
    name: 'app',
    components: {
        NavMenu,
        ScrollLogo,
        SpanionLogo,
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
</style>
