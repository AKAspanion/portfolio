<template>
    <v-card
        tile
        width="100vw"
        height="100vh"
        class="nav-menu-container d-flex flex-column"
        :class="alive ? 'nav-menu-container--active' : ''"
        :color="$vuetify.theme.dark ? '#000000' : '#FFFFFF'"
    >
        <div class="mb-auto">
            <v-row dense>
                <v-col cols="12" md="4">
                    <div
                        :class="$vuetify.breakpoint.xsOnly ? 'my-3' : 'my-8'"
                        class="name-item-container overline"
                    >
                        <div class="name-item-wrapper">
                            <div class="d-inline-block">ankitpandit.xyz</div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="8">
                    <div class="nav-container">
                        <div
                            class="nav-item-container display-3 font-weight-thin my-4"
                            v-for="navItem in navItems"
                            :key="navItem.id"
                        >
                            <div class="nav-item-wrapper">
                                <hover-text
                                    classes="nav-item"
                                    :text="navItem.tooltip"
                                    @click="navigateTo(navItem)"
                                >
                                    {{ navItem.name }}
                                </hover-text>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="mt-auto">
            <v-row dense align="center">
                <v-col cols="12" md="4" class="theme-item-container">
                    <div class="theme-item-wrapper">
                        <v-btn-toggle
                            tile
                            class="my-4"
                            v-model="theme"
                            :background-color="
                                theme === 1 ? '#000000' : '#FFFFFF'
                            "
                        >
                            <v-btn x-small text>
                                <v-icon x-small>mdi-white-balance-sunny</v-icon>
                            </v-btn>
                            <v-btn x-small text>
                                <v-icon
                                    x-small
                                    style="transform: rotate(-45deg)"
                                    >mdi-moon-waning-crescent</v-icon
                                >
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                </v-col>
                <v-col cols="12" md="8">
                    <v-row no-gutters align="center">
                        <div
                            :class="
                                $vuetify.breakpoint.xsOnly ? 'mb-3' : 'my-8'
                            "
                            class="overline pr-8 link-item-container"
                            v-for="link in socialLinks"
                            :key="link.id"
                        >
                            <div class="link-item-wrapper">
                                <hover-text
                                    classes="link-item"
                                    @click="openLink(link)"
                                >
                                    {{ link.name }}
                                </hover-text>
                            </div>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

<script>
import HoverText from '@/components/HoverText.vue';
export default {
    components: {
        HoverText,
    },
    computed: {
        alive() {
            return this.$store.getters.navMenu;
        },
        socialLinks() {
            return this.$store.getters.socialLinks;
        },
        navItems() {
            return this.$store.getters.navItems;
        },
        theme: {
            get() {
                return this.$vuetify.theme.dark ? 1 : 0;
            },
            set(val) {
                this.$vuetify.theme.dark = val === 1 ? true : false;
                localStorage.setItem(
                    'dark',
                    JSON.stringify(this.$vuetify.theme.dark)
                );
            },
        },
    },
    watch: {
        alive: {
            handler(newV) {
                this.animateItems(newV);
            },
        },
        deep: true,
        immediate: true,
    },
    methods: {
        navigateTo(page) {
            this.$router.push(`/${page.name}`);
            this.hideCursor();
            this.$store.dispatch('SHOW_NAV_MENU', false);
        },
        openLink(link) {
            window.open(link.url, '_blank');
        },
        animateItems(alive) {
            let navs = document.querySelectorAll('.nav-item-wrapper');
            let name = document.querySelectorAll('.name-item-wrapper');
            let theme = document.querySelectorAll('.theme-item-wrapper');
            let links = document.querySelectorAll('.link-item-wrapper');
            let _navStyle = `translate3d${
                alive ? '(0px, 0px, 0px)' : '(0px, 80px, 0px)'
            }`;
            let _linkStyle = `translate3d${
                alive ? '(0px, 0px, 0px)' : '(0px, 16px, 0px)'
            }`;
            let _timeout = alive ? 120 : 60;
            let _delay = alive ? 600 : 0;
            navs.forEach((nav, index) => {
                setTimeout(() => {
                    nav.style.transform = _navStyle;
                }, _timeout * index + _delay);
            });
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = _linkStyle;
                }, _timeout * index + _delay);
            });
            setTimeout(() => {
                name[0].style.transform = _linkStyle;
            }, _delay * 2);
            setTimeout(() => {
                theme[0].style.transform = _navStyle;
            }, _delay * 3);
        },
    },
    mounted() {
        this.animateItems(false);
        this.$vuetify.theme.dark =
            localStorage.getItem('dark') == 'true' ? true : false;
    },
};
</script>

<style>
.nav-menu-container {
    transition: transform 1s cubic-bezier(1, 0, 0, 1);
    transform: translate3d(100vw, 0px, 0px);
    padding: 100px 100px 0px 100px;
    will-change: transform;
    position: fixed;
    z-index: 100;
    right: 0;
    top: 0;
}
.nav-menu-container--active {
    transition: transform 1s cubic-bezier(1, 0, 0, 1);
    transform: translate3d(0px, 0px, 0px);
}
.nav-item-container,
.theme-item-container,
.name-item-container,
.link-item-container {
    overflow: hidden;
}
.nav-item-wrapper,
.theme-item-wrapper,
.name-item-wrapper,
.link-item-wrapper {
    transition: transform 0.5s cubic-bezier(1, 0, 0, 1);
    will-change: transform;
}
.nav-item,
.link-item {
    cursor: pointer;
    will-change: transform;
    transition: transform 150ms ease-out;
}
@media only screen and (max-width: 600px) {
    .nav-menu-container {
        padding: 16px 24px 4px 24px;
    }
}
</style>
