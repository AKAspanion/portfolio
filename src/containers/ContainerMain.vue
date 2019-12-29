<template>
    <div>
        <nav-menu :alive="alive"></nav-menu>
        <cursor-animated :dark="alive"></cursor-animated>
        <menu-hamburger
            @mouseover="mouseOver()"
            @mouseout="mouseOver()"
            @click="alive = !alive"
            :alive="alive"
            :dark="alive"
        ></menu-hamburger>
        <router-view></router-view>
    </div>
</template>

<script>
import NavMenu from '@/views/NavMenu.vue';
import CursorAnimated from '@/components/CursorAnimated.vue';
// import ScrollProgress from '@/components/ScrollProgress.vue';
import MenuHamburger from '@/components/MenuHamburger.vue';
export default {
    name: '',
    components: {
        NavMenu,
        CursorAnimated,
        // ScrollProgress,
        MenuHamburger,
    },
    data() {
        return {
            hovered: false,
            message: 'Hello',
            alive: false,
        };
    },
    methods: {
        mouseOver() {
            this.hovered = !this.hovered;
            this.$store.dispatch('SHOW_CURSOR', this.hovered);
        },
    },
};
</script>

<style></style>
