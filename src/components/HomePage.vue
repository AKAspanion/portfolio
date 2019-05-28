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
import axios from 'axios';
export default {
    name: 'HomePage',
    data() {
        return {            
            name: 'ANKIT PANDIT',
            desc: 'DEVELOPER',
            slash: '/',
        }
    },
    created: function() {
        axios.get('/data.json')
        .then(resolve => {
            console.log(resolve)
        }, reject => {
            console.log(reject)
        })
    }
}
</script>
<style scoped>
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
