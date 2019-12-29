<template>
    <div class="pa-4" :style="`background: ${theme ? '#000000' : '#FFFFFF'};`">
        <v-switch v-model="theme"></v-switch>
        <div class="home-container"></div>
        <div class="home-container"></div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {};
    },
    computed: {
        theme: {
            get() {
                return this.$vuetify.theme.dark;
            },
            set(val) {
                this.$vuetify.theme.dark = val;
            },
        },
    },
};
</script>

<style>
.home-container {
    width: 100vw;
    height: 100vh;
}
</style>
