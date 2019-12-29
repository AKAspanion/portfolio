<template>
    <div class="home-container">
        <div class="home">
            <div class="name">{{ $t('home.name') }}</div>
            <div class="slash">{{ $t('home.separator') }}</div>
            <div class="desc">{{ $t('home.designation') }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SpanionHome',
};
</script>
<style scoped>
.home-container {
    text-align: center;
    font-size: 6vw;
    background: #3aafa9;
    color: #def2f1;
    padding: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
.home {
    margin: 5vh 0 0 0;
}
.name,
.slash,
.desc {
    font-family: 'Roboto';
    font-weight: bold;
}
@media only screen and (max-width: 600px) {
    .home-container {
        font-size: 7vh;
    }
}
</style>
