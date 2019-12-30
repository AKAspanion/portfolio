<template>
    <div class="home-container" :style="style">
        <div class="home-text">
            Hello.<br />
            I, Ankit Pandit - <br />
            Software and <br />
            Web developer
        </div>
    </div>
</template>
<script>
export default {
    name: 'SpanionHome',
    computed: {
        style() {
            if (this.$vuetify.theme.dark) {
                return {
                    background: '#000000',
                    color: '#FFFFFF',
                };
            } else {
                return {
                    background: '#FFFFFF',
                    color: '#000000',
                };
            }
        },
    },
};
</script>
<style scoped>
.home-container {
    padding: 0;
    width: 100vw;
    text-align: left;
    min-height: 100vh;
    padding: 120px 10vw 120px 20vw;
}
.home-text {
    font-size: 8vw;
    font-weight: 100 !important;
    line-height: 8vw;
    text-transform: uppercase;
    font-family: Roboto, sans-serif !important;
}
@media only screen and (max-width: 600px) {
    .home-container {
        padding: 140px 10vw 120px 10vw;
    }
    .home-text {
        font-size: 8vh;
        line-height: 8vh;
    }
}
</style>
