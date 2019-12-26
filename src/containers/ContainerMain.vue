<template>
    <div>
        <cursor-animated
            :hovered="hovered"
            :tooltip="message"
        ></cursor-animated>
        <scroll-progress></scroll-progress>
        <router-view></router-view>
        <div @mouseover="mouseOver" @mouseout="mouseOver">
            hey
            {{ hovered }}
        </div>
        <div @mouseover="mouseOver" @mouseout="mouseOver">
            hey
            {{ hovered }}
        </div>
        <div @mouseover="mouseOver" @mouseout="mouseOver">
            hey
            {{ hovered }}
        </div>
        <div @mouseover="mouseOver" @mouseout="mouseOver">
            hey
            {{ hovered }}
        </div>
    </div>
</template>

<script>
import CursorAnimated from '@/components/CursorAnimated.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';
export default {
    name: '',
    components: {
        CursorAnimated,
        ScrollProgress,
    },
    data() {
        return {
            hovered: false,
            message: 'Hello',
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
