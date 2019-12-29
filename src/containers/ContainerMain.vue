<template>
    <div>
        <nav-menu></nav-menu>
        <scroll-progress></scroll-progress>
        <cursor-animated></cursor-animated>
        <menu-hamburger></menu-hamburger>
        <router-view></router-view>
    </div>
</template>

<script>
import NavMenu from '@/views/NavMenu.vue';
import CursorAnimated from '@/components/CursorAnimated.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';
import MenuHamburger from '@/components/MenuHamburger.vue';
export default {
    name: '',
    components: {
        NavMenu,
        CursorAnimated,
        ScrollProgress,
        MenuHamburger,
    },
};
</script>

<style></style>
