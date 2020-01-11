<template>
    <div class="home-container" :style="containerStyle">
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
                    @mouseover="
                        showCursor(
                            'know about me',
                            'https://cdn.vox-cdn.com/thumbor/VThb31FgP4avHBic3zDTmBUIrCY=/0x0:3368x3368/920x613/filters:focal(1188x715:1726x1253):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/62994726/AJ_Finn_author_photo_color_photo_courtesy_of_the_author.0.jpg'
                        )
                    "
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
        containerStyle() {
            let _style = { background: '#FFFFFF', color: '#000000' };
            if (this.$vuetify.theme.dark) {
                _style = {
                    ..._style,
                    background: '#000000',
                    color: '#FFFFFF',
                };
            }
            return _style;
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
    padding: 64px 15vw;
}
.home-text-container {
    font-size: 8vw;
    line-height: 8vw;
    overflow: hidden;
    text-transform: uppercase;
    font-weight: 100 !important;
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
