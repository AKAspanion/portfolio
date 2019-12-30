<template>
    <div
        :style="`top: ${top}px;right: ${right}px;`"
        class="ham-burger-container"
        @mousemove="handleMouseOver"
        @mouseover="showCursor()"
        @mouseout="hideCursor()"
        @click="handleClick"
    >
        <div :class="[alive ? `ham-burger--alive` : 'ham-burger']">
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
        handleMouseOver(e) {
            let windowWidth = window.innerWidth;
            let hamb = document.querySelector('.ham-burger-container');
            let evalpageX = windowWidth - e.pageX,
                xLimit = this.right + 80,
                yLimit = this.top + 80,
                xPos = 0,
                yPos = 0;
            if (
                e.pageY <= yLimit &&
                e.pageY >= this.top &&
                evalpageX <= xLimit &&
                evalpageX >= this.right
            ) {
                yPos = e.pageY - (this.top + 40);
                xPos = this.right + 45 - evalpageX;
            }
            hamb.style.transform = `translate3d(${xPos}px, ${yPos}px, 0px)`;
        },
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
.ham-burger,
.ham-burger--alive {
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
