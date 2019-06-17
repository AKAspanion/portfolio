<template> 
    <div class="about-container">
        <div class="about-main">
            <div class="hi seperated">
                Hi
            </div>
            <div class="name seperated">
                My name is {{about.name}}.
            </div>
            <div class="about seperated">
                I am a {{about.position}} currently working at {{about.company}}.<br>
                {{about.love}}
            </div>            
            <div class="about seperated">
                You can follow me here -  
                <a class="link" target="_blank" :href="about.github">Github</a>, 
                <a class="link" target="_blank" :href="about.instagram">Instagram</a> and 
                <a class="link" target="_blank" :href="about.facebook">Facebook</a>.
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
    .about-container{
        height: 100vh;
        width: 100vw;
        background: #2B7A78;
        color: #FEFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .about-main{
        margin-top: 15vh;
        width: 80vw;
        height: 85vh;
        overflow-y: scroll;
    }
    .hi{
        font-size: 20vh;
    }
    .name{
        font-size: 9vh;
    }
    .about{
        font-size: 5vh;
    }
    .seperated{
        font-family: 'Andis';
        margin-bottom: 2vh;
    }
    .link{
        text-decoration: none;
        color: #FEFFFF;
    }

    @media only screen and (max-width: 600px) {
        .about-container{
            text-align: center;
        }
        .about-main{
            width: 90vw;
        }
    }
</style>
