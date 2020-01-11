<template>
    <div
        :style="`top: ${top}px;left: ${left}px;`"
        @mousemove="iconHover($event, '.logo-container', '.logo-wrapper')"
        @mouseout="
            iconHover($event, '.logo-container', '.logo-wrapper');
            hideCursor();
        "
        @click="navigateTo('/home')"
        @mouseover="showCursor()"
        class="logo-container"
    >
        <div class="logo-wrapper">
            <div
                class="logo-bar"
                :style="
                    `background: ${$vuetify.theme.dark ? '#e0e0e0' : '#212121'}`
                "
                :class="`logo-bar-${n}`"
                v-for="n in 3"
                :key="n"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpanionLogo',
    props: {
        top: {
            type: Number,
            default: 30,
        },
        left: {
            type: Number,
            default: 30,
        },
    },
    methods: {
        navigateTo(link) {
            this.$router.push(link);
        },
        handleMouseOver(e) {
            let hamb = document.querySelector('.logo-container');
            let xLimit = this.left + 80,
                yLimit = this.top + 80,
                xPos = 0,
                yPos = 0;
            if (
                e.pageY <= yLimit &&
                e.pageY >= this.top &&
                e.pageX <= xLimit &&
                e.pageX >= this.left
            ) {
                yPos = e.pageY - (this.top + 40);
                xPos = e.pageX - (this.left + 40);
            }
            hamb.style.transform = `translate3d(${xPos}px, ${yPos}px, 0px)`;
        },
    },
};
</script>

<style scoped>
.logo-container {
    width: 80px;
    height: 80px;
    z-index: 50;
    margin: 0 auto;
    position: fixed;
    cursor: pointer;
    will-change: transform;
    transition: transform 150ms ease-out;
    transform: translate3d(0px, 0px, 0px);
}
.logo-wrapper {
    padding: 30px 25px;
    transition: 250ms;
}
.logo-bar {
    width: 29px;
    height: 4px;
    transition: 250ms;
    margin-bottom: 4px;
}
.logo-bar-1 {
    transform: rotate(-45deg) skewX(45deg) translate3d(0.5px, -2.5px, 0px);
}
.logo-bar-2 {
    transform: rotate(180deg) skewX(-45deg);
}
.logo-bar-3 {
    transform: rotate(-45deg) skewX(45deg) translate3d(-0.5px, 2.5px, 0px);
}
</style>
