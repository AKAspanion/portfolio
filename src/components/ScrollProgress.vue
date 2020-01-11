<template>
    <div
        class="scroll-indicator"
        :style="`bottom: ${bottom}px;right: ${right}px;`"
        :class="[percentage < 10 || navMenu ? 'scroll-indicator--hidden' : '']"
    >
        <v-progress-circular
            size="40"
            width="2"
            :value="percentage <= 99 && percentage >= 95 ? 100 : percentage"
        ></v-progress-circular>
    </div>
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
            default: 120,
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
.scroll-indicator {
    pointer-events: none;
    position: fixed;
    z-index: 100;
    bottom: 32px;
    right: 32px;
}
.scroll-indicator--hidden {
    opacity: 0;
    transition: opacity 1.5s ease;
}
</style>
