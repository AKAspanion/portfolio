<template>
    <div
        class="ham-burger-container"
        @mouseover="$emit('mouseover')"
        @mouseout="$emit('mouseout')"
        @click="$emit('click')"
    >
        <div :class="[alive ? `ham-burger--alive` : 'ham-burger']">
            <div
                class="ham"
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
        alive: Boolean,
    },
    methods: {
        handleMouseOver(e) {
            let hamb = document.querySelector('.ham-burger-container');
            let windowWidth = window.innerWidth;
            let evalpageX = windowWidth - e.pageX;
            let xPos = 0,
                yPos = 0;
            if (
                e.pageY <= 86 &&
                e.pageY >= 48 &&
                evalpageX <= 90 &&
                evalpageX >= 48
            ) {
                xPos = 68 - evalpageX;
                yPos = e.pageY - 68;
            }
            hamb.setAttribute(
                'style',
                `transform: translate(${xPos}px, ${yPos}px)`
            );
        },
    },
    mounted() {
        document.addEventListener('mousemove', this.handleMouseOver);
    },
    destroyed() {
        document.removeEventListener('mousemove', this.handleMouseOver);
    },
};
</script>

<style>
.ham-burger-container {
    position: absolute;
    cursor: pointer;
    top: 48px;
    right: 48px;
    margin: 0 auto;
    transition: 0.3s;
    z-index: 2;
    width: 40px;
    height: 40px;
    will-change: transform;
}
.ham-burger,
.ham-burger--alive {
    padding: 10px 5px;
    transition: 0.3s;
}

.ham-burger:hover .ham-1 {
    transform: translate(5px, 0px);
}
.ham-burger:hover .ham-3 {
    transform: translate(-5px, 0px);
}
.ham-burger--alive:hover .ham-alive-1 {
    width: 0;
    transform: rotate(-45deg) skewX(45deg) translate(-14px, 8px);
}
.ham-burger--alive:hover .ham-alive-3 {
    width: 0;
    transform: rotate(-45deg) skewX(45deg) translate(14px, 13px);
}
.ham {
    width: 29px;
    height: 4px;
    margin-bottom: 4px;
    background: #424242;
    transition: 0.3s;
}
.ham:nth-child(3) {
    margin-bottom: 0px;
}
.ham--alive {
    width: 29px;
}
.ham-alive-1 {
    transform: rotate(-45deg) skewX(45deg) translate(0.5px, -2.5px);
}
.ham-alive-2 {
    transform: rotate(180deg) skewX(-45deg);
}
.ham-alive-3 {
    transform: rotate(-45deg) skewX(45deg) translate(-0.5px, 2.5px);
}
</style>
