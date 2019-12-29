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
                    <div class="name-item-container overline my-8">
                        <div class="name-item-wrapper">
                            <span>spanion.xyz</span>
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
                                <span
                                    class="nav-item"
                                    @click="navigateTo(navItem)"
                                    @mouseover="
                                        onMenuMouseOver($event, navItem)
                                    "
                                    @mouseout="onMenuMouseOut($event, navItem)"
                                >
                                    {{ navItem.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="mt-auto">
            <v-row dense>
                <v-spacer></v-spacer>
                <v-col cols="12" md="8">
                    <v-row no-gutters align="center">
                        <div
                            class="overline my-8 pr-8 link-item-container"
                            v-for="link in socialLinks"
                            :key="link.id"
                        >
                            <div class="link-item-wrapper">
                                <span
                                    class="link-item"
                                    @mouseover="onMenuMouseOver($event, link)"
                                    @mouseout="onMenuMouseOut($event, link)"
                                >
                                    {{ link.name }}
                                </span>
                            </div>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

<script>
export default {
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
            this.$store.dispatch('SHOW_CURSOR', false);
            this.$store.dispatch('SHOW_NAV_MENU', false);
        },
        onMenuMouseOver(e, n) {
            this.$store.dispatch('SHOW_CURSOR', {
                hovered: true,
                tooltip: n.tooltip,
            });
        },
        onMenuMouseOut() {
            this.$store.dispatch('SHOW_CURSOR', false);
        },
        animateItems(alive) {
            let navs = document.querySelectorAll('.nav-item-wrapper');
            let name = document.querySelectorAll('.name-item-wrapper');
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
        },
    },
    mounted() {
        this.animateItems(false);
    },
};
</script>

<style>
.nav-menu-container {
    transition: transform 1s cubic-bezier(1, 0, 0, 1);
    transform: translate3d(100vw, 0px, 0px);
    padding: 100px 80px 0px 80px;
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
.name-item-container,
.link-item-container {
    overflow: hidden;
}
.nav-item-wrapper,
.name-item-wrapper,
.link-item-wrapper {
    transition: transform 0.5s cubic-bezier(1, 0, 0, 1);
    will-change: transform;
}
.nav-item,
.link-item {
    cursor: pointer;
}
</style>
