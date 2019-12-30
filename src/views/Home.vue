<template>
    <div class="home-container" :style="style">
        <div class="home-text-container pa-12">
            <div class="home-text d-inline-block">
                Hi.
            </div>
            <br />
            <div class="home-text d-inline-block">
                My name is,
            </div>
            <br />
            <div class="home-text d-inline-block">
                <div
                    class="home-text--name d-inline-block"
                    @mouseover="showCursor('know about me')"
                    @mousemove="textHover"
                    @mouseout="
                        hideCursor();
                        textHover($event, true);
                    "
                >
                    Ankit Pandit
                </div>
                -
            </div>
            <br />
            <div class="home-text d-inline-block">Software and</div>
            <br />
            <div class="home-text d-inline-block">Web developer.</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SpanionHome',
    computed: {
        style() {
            if (this.$vuetify.theme.dark) {
                return {
                    background: '#000000',
                    color: '#FFFFFF',
                };
            } else {
                return {
                    background: '#FFFFFF',
                    color: '#000000',
                };
            }
        },
    },
    methods: {
        animateItems() {
            let texts = document.querySelectorAll('.home-text');
            let _style = `translate3d(0px, 0vh, 0px)`;
            texts.forEach((text, index) => {
                setTimeout(() => {
                    text.style.transform = _style;
                }, 150 * index + 250);
            });
        },
    },
    mounted() {
        this.animateItems(true);
    },
};
</script>
<style scoped>
.home-container {
    width: 100vw;
    text-align: left;
    min-height: 100vh;
    overflow: hidden;
    padding: 64px 10vw 64px 15vw;
}
.home-text-container {
    font-size: 8vw;
    font-weight: 100 !important;
    line-height: 8vw;
    text-transform: uppercase;
    font-family: Roboto, sans-serif !important;
}
.home-text--name {
    cursor: pointer;
    font-weight: 300 !important;
    transition: transform 150ms ease-out;
}
.home-text {
    will-change: transform;
    transform-origin: bottom;
    transform: translate3d(0px, 100vh, 0px) rotate(15deg) scale(1.5);
    transition: transform 1s cubic-bezier(1, 0, 0, 1);
}
@media only screen and (max-width: 600px) {
    .home-container {
        padding: 64px 0px;
    }
    .home-text {
        font-size: 8vh;
        line-height: 8vh;
    }
}
</style>
