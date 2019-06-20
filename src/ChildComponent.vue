<template>
    <div>  
        <v-expand-transition>
            <v-card v-show="show">
                <v-card-text>
                    This is child<br>
                </v-card-text>
            <v-card-actions style="background: blue;">
                <v-btn @click="show = !show">
                    Close
                </v-btn>
            </v-card-actions>  
            </v-card>  
        </v-expand-transition> 
    </div>
</template>

<script>
export default {
    props: ["value"],
    methods: {
    },
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>

<style>

</style>
