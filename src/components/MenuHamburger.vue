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
};
</script>

<style>
.ham-burger-container {
    position: absolute;
    cursor: pointer;
    top: 48px;
    right: 48px;
    margin: 0 auto;
    z-index: 2;
    width: 29px;
    height: 40px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.ham-burger {
    width: 29px;
    height: 29px;
    transition: 0.5s;
}
.ham-burger--alive {
    width: 20px;
    height: 29px;
    transition: 0.5s;
}
.ham-burger:hover .ham-1 {
    transform: translate(-5px, 0px);
}
.ham-burger:hover .ham-3 {
    transform: translate(5px, 0px);
}
.ham-burger--alive:hover .ham-alive-1 {
    width: 0;
    transform: rotate(-45deg) skewX(45deg) translate(-12px, 7px);
}
.ham-burger--alive:hover .ham-alive-3 {
    width: 0;
    transform: rotate(-45deg) skewX(45deg) translate(12px, 7px);
}
.ham {
    width: 29px;
    height: 3px;
    margin-bottom: 5px;
    background: #424242;
    transition: 0.5s;
}
.ham--alive {
    width: 20px;
}
.ham-alive-1 {
    transform: rotate(-45deg) skewX(45deg) translate(-3px, 0px);
}
.ham-alive-2 {
    transform: rotate(180deg) skewX(-45deg);
}
.ham-alive-3 {
    transform: rotate(-45deg) skewX(45deg) translate(3px, 0px);
}
</style>
