<template>
    <v-card
        tile
        flat
        width="100vw"
        height="100vh"
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
    will-change: transform;
    -webkit-transition: all 1s cubic-bezier(1, 0, 0, 1);
    transition: all 1s cubic-bezier(1, 0, 0, 1);
    transform: translate(100vw, 0px);
    position: fixed;
    right: 0;
    top: 0;
}
.nav-menu-container--active {
    transform: translate(0px, 0px);
}
</style>
