<template>
    <div class="ham-burger-container">
        <div class="ham-burger">
            <div class="ham" 
                :class="{['ham-' + n]: alive}" 
                v-for="n in 3" 
                :key="n">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HamBurger',
    props: {
        alive: Boolean
    }
}
</script>

<style>
    .ham-burger-container{
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 1;
        width: 100px;
        height: 100px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        transform: scale(0.75)
    }
    .ham-burger{
        width: 50px;
        height: 34px;
        cursor: pointer;
    }
    .ham{
        width: 50px;
        height: 8px;
        margin-bottom: 5px;
        background: rgb(65, 65, 65);
        transition: 0.5s;
    }
    .ham-1{
        transform: rotate(-45deg) skewX(45deg) translate(1px, -5px);
    }
    .ham-2{
        transform: rotate(180deg) skewX(-45deg) ;
    }
    .ham-3{
        transform: rotate(-45deg) skewX(45deg) translate(-1px, 5px);
    }
</style>
