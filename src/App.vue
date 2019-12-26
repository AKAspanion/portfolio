<template>
    <div id="app">
        <v-app>
            <router-view></router-view>
        </v-app>
    </div>
</template>

<script>
export default {
    name: 'app',
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
.test {
    background: red;
}
</style>
