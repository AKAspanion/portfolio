<template>
    <div
        @mousemove="iconHover($event, '.ham-burger-container', '.ham-burger')"
        :style="`top: ${top}px;right: ${right}px;`"
        class="ham-burger-container"
        @mouseover="showCursor()"
        @mouseout="
            iconHover($event, '.ham-burger-container', '.ham-burger', true);
            hideCursor();
        "
        @click="handleClick"
    >
        <div :class="[alive ? `ham-burger ham-burger--alive` : 'ham-burger']">
            <div
                class="ham"
                :style="
                    `background: ${$vuetify.theme.dark ? '#FFFFFF' : '#000000'}`
                "
                :class="[alive ? `ham--alive ham-alive-${n}` : `ham-${n}`]"
                v-for="n in 3"
                :key="n"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuHamburger',
    props: {
        top: {
            type: Number,
            default: 30,
        },
        right: {
            type: Number,
            default: 30,
        },
    },
    data() {
        return {
            animating: false,
        };
    },
    computed: {
        alive: {
            get() {
                return this.$store.getters.navMenu;
            },
            set(val) {
                this.$store.dispatch('SHOW_NAV_MENU', val);
            },
        },
    },
    methods: {
        handleClick() {
            if (this.animating) {
                return;
            } else {
                this.animating = true;
                this.alive = !this.alive;
                setTimeout(() => {
                    this.animating = false;
                }, 1000);
            }
        },
    },
};
</script>

<style>
.ham-burger-container {
    width: 80px;
    height: 80px;
    z-index: 100;
    margin: 0 auto;
    position: fixed;
    cursor: pointer;
    will-change: transform;
    transition: transform 150ms ease-out;
    transform: translate3d(0px, 0px, 0px);
}
.ham-burger {
    padding: 30px 25px;
    transition: 250ms;
}

.ham-burger:hover .ham-1 {
    transform: translate3d(5px, 0px, 0px);
}
.ham-burger:hover .ham-3 {
    transform: translate3d(-5px, 0px, 0px);
}
.ham-burger--alive:hover .ham-alive-1 {
    width: 0;
    transform: rotate(-45deg) skewX(45deg) translate3d(-14px, 8px, 0px);
}
.ham-burger--alive:hover .ham-alive-3 {
    width: 0;
    transform: rotate(-45deg) skewX(45deg) translate3d(14px, 13px, 0px);
}
.ham {
    width: 29px;
    height: 4px;
    transition: 250ms;
    margin-bottom: 4px;
}
.ham:nth-child(3) {
    margin-bottom: 0px;
}
.ham--alive {
    width: 29px;
}
.ham-alive-1 {
    transform: rotate(-45deg) skewX(45deg) translate3d(0.5px, -2.5px, 0px);
}
.ham-alive-2 {
    transform: rotate(180deg) skewX(-45deg);
}
.ham-alive-3 {
    transform: rotate(-45deg) skewX(45deg) translate3d(-0.5px, 2.5px, 0px);
}
</style>
