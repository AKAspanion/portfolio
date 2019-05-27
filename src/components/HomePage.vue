<template>
    <div class="container">
        <div>
            <div class="name">
                {{name}}
            </div>

            <div class="slash">
                {{slash}}
            </div>
            <div class="desc">
                {{desc}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HomePage',
    data() {
        return {            
            name: 'ANKIT PANDIT',
            desc: 'DEVELOPER',
            slash: '/',
        }
    }
}
</script>
<style>
    @font-face {
        font-family: "Hipstelvetica";
        src: url("../assets/fonts/Hipstelvetica.ttf");
    }
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        text-align: center;
    }
    .name, .slash, .desc{
        font-family: "Hipstelvetica";
        font-size: 8vw;
        font-weight: bold;
    }
</style>
