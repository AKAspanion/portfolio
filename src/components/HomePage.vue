<template>
    <div class="home-container">
        <div class="home">
            <div class="name">
                {{home.name}}
            </div>
            <div class="slash">
                {{home.separator}}
            </div>
            <div class="desc">
                {{home.designation}}
            </div>
        </div>
    </div>
</template>
<script>
import DataService  from '../dataproviders/DataService';
export default {
    name: 'HomePage',
    data() {
        return {        
            home: {}
        }
    },
    methods: {
        fetchData(){
            DataService
            .getHome((data) => {
                this.home = data;
            })
        } 
    },
    created(){
        this.fetchData();
    }
}
</script>
<style scoped>
    .home-container{        
        text-align: center;
        font-size: 6vw;
        background: #3AAfA9;
        color: #DEF2F1;
        padding: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .home{        
        margin: 5vh 0 0 0;
    }
    .name, .slash, .desc{
        font-family: "Hipstelvetica";
        font-weight: bold;
    }
    @media only screen and (max-width: 600px) {
        .home-container{
            font-size: 7vh;
        }
    }
</style>
