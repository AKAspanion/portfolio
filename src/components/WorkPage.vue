<template>
    <div class="container">
        <div class="work-container">
            <div 
                class="timeline-container"
                v-for="item in work"
                :key="['index' + item]">
                    <div class="dot"></div>
                    <div class="heading">
                        <div class="company">{{item.company}}</div>
                        <div class="title">{{item.title}}</div>
                    </div>                                      
                    <div class="period">
                        {{item.period}}
                    </div>                 
                    <div class="description">
                        {{item.description}}
                    </div>                                  
                    <div class="technolgies">
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataService  from '../dataproviders/DataService';
export default {
    name: 'WorkPage',
    data(){
        return{
           work: []
        }
    },
    methods: {
        fetchData(){
            DataService
            .getWork((data) => {
                this.work = data;
            })
        } 
    },
    created(){
        this.fetchData();
    }
}
</script>

<style scoped>

    .work-container{
        padding: 0 5vw;
        margin-top: 15vh;
        width: 75vw;
        height: 85vh;
        overflow-y: scroll;
    }
    .timeline-container{
        padding: 5px 20px;
        border-left: 1px solid rgb(65, 65, 65);
        font-family: 'Andis';
        font-size: 18px;
    }
    .dot{
        z-index: -1;
        position: relative;
        width: 15px;
        height: 15px;
        background: rgb(65, 65, 65);
        border-radius: 100px;
        border: 2px solid rgb(65, 65, 65); 
        left: -29.6px;
        top: -5px;
    }
    .heading{
        display: inline-block;
    }
</style>
