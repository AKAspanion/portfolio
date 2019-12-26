<template>
    <div>
        <cursor-animated
            :hovered="hovered"
            :tooltip="message"
        ></cursor-animated>
        <menu-hamburger
            @mouseover="mouseOver()"
            @mouseout="
                message = '';
                mouseOver();
            "
            :alive="alive"
            @click="alive = !alive"
        ></menu-hamburger>
        <router-view></router-view>
    </div>
</template>

<script>
import CursorAnimated from '@/components/CursorAnimated.vue';
// import ScrollProgress from '@/components/ScrollProgress.vue';
import MenuHamburger from '@/components/MenuHamburger.vue';
export default {
    name: '',
    components: {
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
        },
    },
};
</script>

<style></style>
