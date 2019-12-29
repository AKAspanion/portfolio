<template>
    <v-card
        tile
        width="100vw"
        height="100vh"
        color="#202020"
        class="pa-12 nav-menu-container"
        :class="alive ? 'nav-menu-container--active' : ''"
    >
        Menu
    </v-card>
</template>

<script>
export default {
    props: ['alive'],
};
</script>

<style>
.nav-menu-container {
    transition: transform 1s cubic-bezier(1, 0, 0, 1);
    transform: translate3d(100vw, 0px, 0px);
    will-change: transform;
    position: fixed;
    right: 0;
    top: 0;
}
.nav-menu-container--active {
    transition: transform 1s cubic-bezier(1, 0, 0, 1);
    transform: translate3d(0px, 0px, 0px);
}
</style>
