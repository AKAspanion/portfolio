<template>
    <div>
        <div class="user-toggle">
            <v-btn-toggle v-model="toggle_one" mandatory>
                <v-btn flat>
                    <div>
                        <v-label>Basic</v-label>
                        <v-scale-transition>
                            <div v-show="toggle_one === 0">
                                <v-icon color="primary">done</v-icon>
                            </div>
                        </v-scale-transition>
                    </div>
                </v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat class="ma-0">
                    <div>
                        <v-label>LDAP</v-label>
                        <v-scale-transition>
                            <div v-show="toggle_one === 1">
                                <v-icon color="primary">done</v-icon>
                            </div>
                        </v-scale-transition>
                    </div>
                </v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat>
                    <div>
                        <v-label>Kerberos</v-label>
                        <v-scale-transition>
                            <div v-if="toggle_one === 2">
                                <v-icon color="primary">done</v-icon>
                            </div>
                        </v-scale-transition>
                    </div>
                </v-btn>
            </v-btn-toggle>
            
        </div>
            <v-container fluid grid-list-md ma-0>
                <v-layout row style="margin: -24px auto;">
                    <v-flex align-self-center>
                        <v-label>Send auto generated password</v-label>
                    </v-flex>
                    <v-flex shrink>
                        <v-switch>Hey</v-switch>
                    </v-flex>
                </v-layout>
            </v-container>            
            <v-container fluid grid-list-md ma-0>
                <v-layout row wrap style="margin: -24px auto;">
                    <v-flex sm4 xs6 align-self-center style="margin: -24px auto;">
                        <v-label>Password:</v-label>
                    </v-flex>
                    <v-flex sm4 xs6 align-self-center style="margin: -24px auto;">
                        <v-text-field></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm3 text-xs-right>
                        <v-btn>Generate</v-btn>
                    </v-flex>
                    <v-flex sm4 xs6 align-self-center >
                        <v-label>Confirm Password:</v-label>
                    </v-flex>
                    <v-flex sm4 xs align-self-center>
                        <v-text-field></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
    </div>
</template>

<script>
export default {
    components: {},
    methods: {},
    data() {
        return {
            toggle_one: 0
        };
    }
};
</script>

<style scoped>
.test {
    background: red;
    border: 1px solid red !important;
}
.test-1 {
    background: green;
    border: 1px solid green !important;
}
.test-2 {
    background: blue;
    border: 1px solid blue !important;
}
.user-toggle {
    width: 100%;
}
.user-toggle >>> .v-btn-toggle{
    width: 100%;
    height: 100px;
}
.user-toggle >>> .v-btn{
    width: calc( 100% / 3);
    height: 100px;
    border-right: none;
}
.user-toggle >>> .v-btn:not(:last-child) {
    border-right: 0px solid transparent;
}

.user-toggle >>> .v-label{
    font-size: 16px;
}
</style>
