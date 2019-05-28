<template>
    <div class="menu-container"
        :class="{active: alive}"
        >
        <div class="side-menu">
            <router-link
                tag="div"
                class="side-item"
                v-for="item in menuItems" 
                :key="item"
                :to="'/' + item">
                    <span>{{item}}</span>
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
        display: flex;
        justify-content:baseline;
        align-items: center;
        background: goldenrod;
        width: 100vw;
        color:beige;
        height: 100vh;
        transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
        transform: translateY(-100vh);
    }
    .side-menu{
        text-align: center;
        margin: 0 auto;
        width: 20vw;
        font-size: 5vh;
        font-family: 'Andis';
    }
    .side-item{
        cursor: pointer;
        margin: 15px 0;
        transition: 0.5s;
    }
    .active{
        transform: translateX(0);
    }    
</style>
