<template> 
    <div class="container">
        <div class="about-container">
            <div class="hi seperated">
                Hi.
            </div>
            <div class="name seperated">
                My name is {{about.name}}.
            </div>
            <div class="about seperated">
                I am a {{about.position}} currently working at {{about.company}}.
            </div>
        </div>
    </div>    
</template>

<script>
import DataService  from '../dataproviders/DataService';
export default {
    name: 'AboutPage',
    data(){
        return{
            about: {}
        }
    },
    methods: {
        fetchData(){
            DataService
            .getAbout((data) => {
                this.about = data;
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
    }
    .about-container{
        height: 60vh;
        width: 80vw;
    }
    .hi{
        font-size: 10vw;
    }
    .name{
        font-size: 5vw;
    }
    .about{
        font-size: 3vw;
    }
    .seperated{
        font-family: 'Andis';
        margin-bottom: 2vh;
    }
    @media only screen and (max-width: 600px) {
        .container{
            text-align: center;
        }
    }
</style>
