<template>
    <v-fab-transition>
        <div
            :style="`bottom: ${bottom}px;left: ${left}px;`"
            @mousemove="
                iconHover(
                    $event,
                    '.scroll-logo-container',
                    '.scroll-logo-wrapper'
                )
            "
            @mouseout="
                iconHover(
                    $event,
                    '.scroll-logo-container',
                    '.scroll-logo-wrapper'
                );
                hideCursor();
            "
            @click="scrollDown"
            @mouseover="showCursor('scroll to see more')"
            class="scroll-logo-container"
            v-if="canShow && !navMenu"
        >
            <div class="scroll-logo-container">
                <div class="scroll-logo-wrapper">
                    <div
                        class="mouse-icon"
                        :class="
                            $vuetify.theme.dark
                                ? 'mouse-icon--dark'
                                : 'mouse-icon--white'
                        "
                    ></div>
                </div>
            </div>
        </div>
    </v-fab-transition>
</template>

<script>
export default {
    name: 'ScrollLogo',
    props: {
        bottom: {
            type: Number,
            default: 80,
        },
        left: {
            type: Number,
            default: 110,
        },
    },
    data() {
        return {
            percentage: 0,
        };
    },
    computed: {
        navMenu() {
            return this.$store.getters.navMenu;
        },
        canShow() {
            return this.$store.getters.scrollPos < 20;
        },
    },
    methods: {
        scrollDown() {
            this.hideCursor();
            this.$vuetify.goTo(100);
            setTimeout(() => {
                this.percentage = 100;
            }, 200);
        },
    },
};
</script>

<style scoped>
.scroll-logo-container {
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
.scroll-logo-wrapper {
    padding: 22px 28px;
    transition: 250ms;
}
.mouse-icon {
    height: 36px;
    width: 24px;
    mix-blend-mode: difference;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
}
.mouse-icon--dark {
    border: solid 2px #e0e0e0;
}
.mouse-icon--white {
    border: solid 2px #212121;
}
.mouse-icon--dark::after {
    background: #e0e0e0;
}
.mouse-icon--white::after {
    background: #212121;
}
.mouse-icon::after {
    content: '';
    width: 3px;
    height: 6px;
    border-radius: 12px;
    position: absolute;
    left: 9px;
    top: 7px;
}
</style>
