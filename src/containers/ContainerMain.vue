<template>
    <div>
        <cursor-animated :hovered="hovered"></cursor-animated>
        <scroll-indicator></scroll-indicator>
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
import ScrollIndicator from '@/components/ScrollIndicator.vue';
export default {
    name: '',
    components: {
        CursorAnimated,
        ScrollIndicator,
    },
    data() {
        return {
            hovered: false,
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
