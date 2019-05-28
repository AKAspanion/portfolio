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
