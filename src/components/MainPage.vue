<template>
    <div class="container">
        <div>
            <div class="hi">            
                Hi!
            </div>
            <div class="name">
                My name is Ankit Pandit.
            </div>
            <div class="desc">
                I am a software developer. Currently working at GLOBAL IDs.<br>
            </div>
        </div>
        <div class="side-image">
            <img src="../assets/spanion-profile.png"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MainContainer'
}
</script>
<style>
    .container{
        background: transparent;
        justify-content:space-between;
        display: flex;
        margin: 100px auto;
        padding-left: 100px;
        text-align: left;
    }
    .hi{
        font-size: 100px;
        margin: 25px 0;
    }
    .name{
        font-size: 35px;
        margin: 25px 0;
        font-weight: bold;
    }
    .desc{
        font-size: 25px;
    }
    .side-image img{
        height: 80vh;
    }
</style>
