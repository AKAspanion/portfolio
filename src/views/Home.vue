<template>
    <div class="home-container" :style="containerStyle">
        <div class="home-text-wrapper">
            <div class="home-text-container home-padding">
                <div class="d-inline-block my-1 pb-2">
                    Hi.
                </div>
                <br />
                <div class="d-inline-block my-1 pb-2">
                    <mask-text :delay="loaded ? maskDelay : maskDelay + 1000">
                        My name is,
                    </mask-text>
                </div>
                <br />
                <div class="d-inline-block my-1 pb-2">
                    <mask-text :delay="loaded ? maskDelay : maskDelay + 1500">
                        <hover-text
                            text="know about me"
                            classes="home-text--name"
                            link="images/profile.jpeg"
                            @click="goToRoute('/about')"
                        >
                            Ankit Pandit
                        </hover-text>
                        -
                    </mask-text>
                </div>
                <br />
                <div class="d-inline-block my-1 pb-2">
                    <mask-text :delay="loaded ? maskDelay : maskDelay + 3000">
                        Software and
                    </mask-text>
                </div>
                <br />
                <div class="d-inline-block my-1 pb-2">
                    <mask-text :delay="loaded ? maskDelay : maskDelay + 3500">
                        Web developer.
                    </mask-text>
                </div>
            </div>
        </div>
        <template v-if="loaded">
            <div class="about-text-wrapper">
                <div class="about-headline home-padding">
                    <div class="d-inline-block my-1 pb-2 title">
                        <mask-text v-model="aboutHead" :delay="maskDelay">
                            UNDER CONSTRUCTION
                        </mask-text>
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus sequi est hic delectus esse vero
                        nisi velit eaque mollitia. Minus dolor quos aliquam
                        fugiat quae in cupiditate rerum deserunt optio.
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Non repellendus ratione deserunt tempore,
                        cumque similique dicta sed repudiandae aliquid
                        pariatur neque magnam consequuntur, dolorum sapiente
                        minus fugiat architecto atque aperiam! Lorem ipsum
                        dolor, sit amet consectetur adipisicing elit. Quod
                        possimus ipsa dolorem neque quo, odio corporis
                        debitis. Blanditiis dolore ullam aperiam
                        exercitationem, fugiat officiis corrupti nostrum
                        facilis assumenda necessitatibus sint. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit.
                        Aspernatur ipsam quis, nam earum, delectus voluptate
                        molestiae sequi iste totam saepe eveniet dignissimos
                        sit magni minima libero, quae quasi natus
                        voluptatum.
                    </div>
                </div>
            </div>
            <div class="about-text-wrapper-2">
                <div class="about-headline home-padding">
                    <div class="d-inline-block my-1 pb-2 title">
                        <mask-text v-model="aboutHead" :delay="maskDelay">
                            UNDER CONSTRUCTION
                        </mask-text>
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus sequi est hic delectus esse vero
                        nisi velit eaque mollitia. Minus dolor quos aliquam
                        fugiat quae in cupiditate rerum deserunt optio.
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Non repellendus ratione deserunt tempore,
                        cumque similique dicta sed repudiandae aliquid
                        pariatur neque magnam consequuntur, dolorum sapiente
                        minus fugiat architecto atque aperiam! Lorem ipsum
                        dolor, sit amet consectetur adipisicing elit. Quod
                        possimus ipsa dolorem neque quo, odio corporis
                        debitis. Blanditiis dolore ullam aperiam
                        exercitationem, fugiat officiis corrupti nostrum
                        facilis assumenda necessitatibus sint. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit.
                        Aspernatur ipsam quis, nam earum, delectus voluptate
                        molestiae sequi iste totam saepe eveniet dignissimos
                        sit magni minima libero, quae quasi natus
                        voluptatum.
                    </div>
                </div>
            </div>
            <div class="about-text-wrapper-3">
                <div class="about-headline home-padding">
                    <div class="d-inline-block my-1 pb-2 title">
                        <mask-text v-model="aboutHead" :delay="maskDelay">
                            UNDER CONSTRUCTION
                        </mask-text>
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus sequi est hic delectus esse vero
                        nisi velit eaque mollitia. Minus dolor quos aliquam
                        fugiat quae in cupiditate rerum deserunt optio.
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Non repellendus ratione deserunt tempore,
                        cumque similique dicta sed repudiandae aliquid
                        pariatur neque magnam consequuntur, dolorum sapiente
                        minus fugiat architecto atque aperiam! Lorem ipsum
                        dolor, sit amet consectetur adipisicing elit. Quod
                        possimus ipsa dolorem neque quo, odio corporis
                        debitis. Blanditiis dolore ullam aperiam
                        exercitationem, fugiat officiis corrupti nostrum
                        facilis assumenda necessitatibus sint. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit.
                        Aspernatur ipsam quis, nam earum, delectus voluptate
                        molestiae sequi iste totam saepe eveniet dignissimos
                        sit magni minima libero, quae quasi natus
                        voluptatum.
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import HoverText from '@/components/HoverText.vue';
import MaskText from '@/components/MaskText.vue';
export default {
    name: 'SpanionHome',
    components: {
        HoverText,
        MaskText,
    },
    data() {
        return {
            maskDelay: 0,
            aboutHead: true,
            showLandingMask: true,
        };
    },
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
        loaded() {
            return this.$store.getters.loaded;
        },
    },
    methods: {
        goToRoute() {
            // this.$router.push(path);
            this.hideCursor();
        },
    },
    mounted() {
        setTimeout(() => {
            this.$store.dispatch('LOADED', true);
        }, 6000);
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
    padding: 64px 18vw;
}
.home-text-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: flex-end;
    justify-content: start;
}
.home-text-container {
    font-size: 8vw;
    line-height: 7vw;
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
.home-about-item,
.home-project-item {
    text-align: justify;
    transform-origin: top left;
    transform: translate3d(0px, 96px, 0px) rotate(5deg);
    transition: transform 1s ease;
}
.theme--dark .about-text-wrapper {
    background: #424242;
}
.theme--dark .about-text-wrapper-2 {
    background: #616161;
}
.theme--dark .about-text-wrapper-3 {
    background: #757575;
}
.theme--light .about-text-wrapper {
    background: #eeeeee;
}
.theme--light .about-text-wrapper-2 {
    background: #f5f5f5;
}
.theme--light .about-text-wrapper-3 {
    background: #fafafa;
}
@media only screen and (max-width: 600px) {
    .home-padding {
        padding: 148px 24px;
    }
    .home-text-container {
        font-size: 5.5vh;
        line-height: 6vh;
    }
}
</style>
