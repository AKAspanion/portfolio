<template>
    <div class="home-container" :style="containerStyle">
        <div class="home-text-container home-padding">
            <div class="d-inline-block">
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
                            'https://firebasestorage.googleapis.com/v0/b/spanion-portfolio.appspot.com/o/profile.jpeg?alt=media&token=a121422d-c2bb-44d1-9e8f-30140dd31ce1'
                        )
                    "
                    @mousemove="textHover"
                    @mouseout="
                        hideCursor();
                        textHover($event, true);
                    "
                    @click="goToAbout"
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
        <v-divider></v-divider>
        <div class="home-about-container home-padding">
            <v-row>
                <v-col cols="12" sm="4" class="overflow-hidden">
                    <div class="home-about-item title fill-height">
                        A little about me.
                    </div>
                </v-col>
                <v-col cols="12" sm="8" class="overflow-hidden">
                    <div class="home-about-item fill-height">
                        I am a Kolkata based Software/Web Developer, currently
                        working at Global Ids. <br />I love making awesome web
                        applications and websites. <br />I am always on a
                        lookout for new and exciting challenges. <br />If you
                        have any projects or suggestions, or you just want to
                        say "hi", contact me.
                    </div>
                </v-col>
            </v-row>
        </div>
        <v-divider></v-divider>
        <div class="home-project-container home-padding">
            <v-row>
                <v-col cols="12" sm="4" class="overflow-hidden">
                    <div class="home-project-item title fill-height">
                        A little project me.
                    </div>
                </v-col>
                <v-col cols="12" sm="8" class="overflow-hidden">
                    <div class="home-project-item fill-height">
                        I am a Kolkata based Software/Web Developer, currently
                        working at Global Ids. <br />I love making awesome web
                        applications and websites. <br />I am always on a
                        lookout for new and exciting challenges. <br />If you
                        have any projects or suggestions, or you just want to
                        say "hi", contact me.
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SpanionHome',
    computed: {
        containerStyle() {
            let _style = { background: '#e0e0e0', color: '#212121' };
            if (this.$vuetify.theme.dark) {
                _style = {
                    ..._style,
                    background: '#212121',
                    color: '#e0e0e0',
                };
            }
            return _style;
        },
        scrollPosition() {
            return this.$store.getters.scrollPos;
        },
    },
    watch: {
        scrollPosition: {
            handler() {
                let aboutItems = document.querySelectorAll('.home-about-item');
                let projectItems = document.querySelectorAll(
                    '.home-project-item'
                );
                const changeItems = (items, _style) => {
                    for (let item of items) {
                        item.style.transform = _style;
                    }
                };
                if (this.isInViewport('.home-about-container', 120)) {
                    changeItems(aboutItems, 'translate3d(0px, 0px, 0px)');
                }
                if (this.isInViewport('.home-project-container', 120)) {
                    changeItems(projectItems, 'translate3d(0px, 0px, 0px)');
                }
            },
            immediate: true,
        },
    },
    methods: {
        goToAbout() {
            this.$router.push(`/about`);
            this.hideCursor();
        },
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
}
.home-padding {
    padding: 100px 18vw;
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
.home-about-item,
.home-project-item {
    text-align: justify;
    transform-origin: top left;
    transform: translate3d(0px, 96px, 0px) rotate(10deg);
    transition: transform 1s ease;
}
@media only screen and (max-width: 600px) {
    .home-padding {
        padding: 100px 24px;
    }
    .home-text-container {
        font-size: 7vh;
        line-height: 8vh;
    }
}
</style>
