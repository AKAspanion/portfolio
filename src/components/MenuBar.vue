<template>
    <div class="menu-container"
        :class="{active: alive}"
        >
        <div class="menu">
            <router-link
                tag="div"
                class="menu-item"
                v-for="item in menuItems" 
                :key="item"
                :to="'/' + item">
                    <div><a class="link">{{item}}</a></div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MenuBar',
    data(){
        return {}
    },
    props: {
        alive: Boolean,
        menuItems: Array
    },
    methods: {
    }
}
</script>
<style>
    .menu-container{
        position: absolute;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #17252A;
        width: 100vw;
        color:beige;
        height: 100vh;
        transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
        transform: translateY(-100vh);
    }
    .menu{
        text-align: center;
        margin: 0 auto;
        font-size: 5vh;
        font-family: 'Andis';
    }
    .menu-item{
        cursor: pointer;
        margin: 15px 0;
        transition: 0.5s;
    }
    .active{
        transform: translateX(0);
    }    
</style>
