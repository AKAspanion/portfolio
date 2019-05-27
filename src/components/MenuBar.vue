<template>
    <div class="menu-container"
        :class="{active: alive}"
        >
        <div class="side-menu">
            <div
                class="side-item"
                v-for="item in menuItems" 
                :key="item">                
                    <router-link :to="'/' + item">{{item}}</router-link>
            </div>
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
    @font-face {
        font-family: "Hipstelvetica";
        src: url("../assets/fonts/Hipstelvetica.ttf");
    }
    .menu-container{
        position: absolute;
        display: flex;
        justify-content:baseline;
        align-items: center;
        background: goldenrod;
        width: 100vw;
        color:beige;
        height: 100vh;
        transition: 0.5s;
        transform: translateY(-100vh);
    }
    .side-menu{
        text-align: center;
        margin: 0 auto;
        width: 80vw;
        font-size: 5vw;
        font-family: 'Hipstelvetica';
    }
    .side-item{
        cursor: pointer;
        margin: 15px 0;
        transition: 0.5s;
    }
    .side-item:hover{
        background: rgb(65, 65, 65);
    }
    .active{
        transform: translateX(0);
    }
</style>
