<template>
    <div class="container">
        <div>
            <div class="name">
                {{home.name}}
            </div>

            <div class="slash">
                {{home.slash}}
            </div>
            <div class="desc">
                {{home.description}}
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
    .container{        
        text-align: center;
        font-size: 7vw;
        background: #3AAfA9;
        color: #DEF2F1;
    }
    .name, .slash, .desc{
        font-family: "Hipstelvetica";
        font-weight: bold;
    }
    @media only screen and (max-width: 600px) {
        .container{
            font-size: 7vh;
        }
    }
</style>
