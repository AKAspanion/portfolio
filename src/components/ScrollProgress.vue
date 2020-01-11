<template>
    <v-fab-transition>
        <div
            :style="`bottom: ${bottom}px;right: ${right}px;`"
            @mousemove="
                iconHover(
                    $event,
                    '.scroll-arrow-container',
                    '.scroll-arrow-wrapper'
                )
            "
            @mouseout="
                iconHover(
                    $event,
                    '.scroll-arrow-container',
                    '.scroll-arrow-wrapper'
                );
                hideCursor();
            "
            @mouseover="showCursor()"
            class="scroll-arrow-container"
            v-if="percentage > 10 && !navMenu"
        >
            <div class="scroll-arrow-container">
                <div class="scroll-arrow-wrapper">
                    <v-progress-circular
                        size="40"
                        width="2"
                        :color="$vuetify.theme.dark ? '#FFFFFF' : '#000000'"
                        :value="
                            percentage <= 99 && percentage >= 95
                                ? 100
                                : percentage
                        "
                    >
                        <v-btn
                            icon
                            @click="scrollUp"
                            :color="$vuetify.theme.dark ? '#FFFFFF' : '#000000'"
                        >
                            <v-icon>
                                keyboard_arrow_up
                            </v-icon>
                        </v-btn>
                    </v-progress-circular>
                </div>
            </div>
        </div>
    </v-fab-transition>
</template>

<script>
export default {
    name: 'ScrollProgress',
    props: {
        bottom: {
            type: Number,
            default: 40,
        },
        right: {
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
        navMenu: {
            get() {
                return this.$store.getters.navMenu;
            },
        },
    },
    methods: {
        scrollUp() {
            this.hideCursor();
            this.$vuetify.goTo(0);
            setTimeout(() => {
                this.percentage = 0;
            }, 200);
        },
        handleScroll() {
            let topPosition = Math.floor(
                document.documentElement.scrollTop || document.body.scrollTop
            );
            let bottomPosition =
                document.getElementById('app').scrollHeight -
                window.innerHeight;
            this.percentage =
                topPosition !== 0
                    ? Math.floor((topPosition / bottomPosition) * 100)
                    : 0;
        },
    },
    mounted() {
        this.handleScroll();
        window.addEventListener('mousewheel', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('mousewheel', this.handleScroll);
    },
};
</script>

<style scoped>
.scroll-arrow-container {
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
.scroll-arrow-wrapper {
    padding: 20px 20px;
    transition: 250ms;
}
</style>
