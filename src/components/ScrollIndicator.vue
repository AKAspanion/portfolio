<template>
    <div
        class="scroll-indicator"
        :class="[
            percentage && percentage < 5 ? 'scroll-indicator--hidden' : '',
        ]"
    >
        <v-progress-circular
            size="40"
            width="2"
            :value="percentage"
        ></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: 'ScrollIndicator',
    data() {
        return {
            percentage: 0,
        };
    },
    methods: {
        handleScroll() {
            let topPosition = Math.floor(
                document.documentElement.scrollTop || document.body.scrollTop
            );
            let bottomPosition =
                document.getElementById('app').scrollHeight -
                window.innerHeight;
            this.percentage = Math.floor((topPosition / bottomPosition) * 100);
        },
    },
    created() {
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
