<template>
    <div
        id="containermain"
        class="main-container--parent"
        :style="`height: ${contentHeight}px;`"
    >
        <div
            id="containercontent"
            class="main-container--slot-item"
            :style="mainChildStyle"
        >
            <slot></slot>
        </div>
        <div class="main-container-3d main-container--top-child">
            <div class="main-view-3d" :style="topRotationStyle">
                <div
                    class="main-container--slot-wrapper"
                    :style="topChildStyle"
                >
                    <div class="main-container--slot-item">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-container-3d main-container--bottom-child">
            <div class="main-view-3d" :style="bottomRotationStyle">
                <div
                    class="main-container--slot-wrapper"
                    :style="bottomChildStyle"
                >
                    <div class="main-container--slot-item">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            contentHeight: 0,
            contentScroll: 0,
            direction: 'DOWN',
        };
    },
    computed: {
        mainChildStyle() {
            return `transform: translate3d(0px, ${this.contentScroll}px, 0px)`;
        },
        topChildStyle() {
            return `transform: translate3d(0px, ${this.contentScroll}px, 0px)`;
        },
        bottomChildStyle() {
            const vh = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0
            );
            return `transform: translate3d(0px, ${this.contentScroll -
                vh +
                64}px, 0px)`;
        },
        topRotationStyle() {
            return `transform: rotateX(-24deg)`;
        },
        bottomRotationStyle() {
            return `transform: rotateX(24deg)`;
        },
    },
    methods: {
        onScroll() {
            const container = document.getElementById('containermain');
            const content = document.getElementById('containercontent');
            const contentRect = content.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            if (this.contentScroll >= containerRect.top) {
                this.direction = 'DOWN';
            } else {
                this.direction = 'UP';
            }
            this.contentHeight = contentRect.height;
            this.contentScroll = containerRect.top;
        },
    },
    mounted() {
        this.$nextTick(() => {
            document.addEventListener('scroll', this.onScroll);
            setTimeout(() => {
                this.onScroll();
            }, 6000);
        });
    },
};
</script>

<style scoped>
.main-container--slot-item {
    position: fixed;
    width: 100%;
    overflow-x: hidden;
}
.main-container-3d {
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 2;
    height: 4rem;
    overflow: hidden;
    perspective: 7.5rem;
    pointer-events: none;
    transform: scale(1);
}
.main-container--top-child {
    top: 0px;
    bottom: inherit;
}
.main-container-3d .main-view-3d {
    width: 100%;
    height: 4rem;
    transform-style: preserve-3d;
    transform-origin: 50% 0%;
}
.main-container-3d.main-container--top-child .main-view-3d {
    transform-origin: 50% 100%;
}
.main-container-3d .main-view-3d .main-container--slot-item {
    position: absolute;
}
</style>
