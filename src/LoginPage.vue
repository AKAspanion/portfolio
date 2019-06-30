<template>
    <v-app>
        <v-container bg fluid fill-height text-xs-center pa-0 ma-0>
            <v-layout row align-center ma-0 pa-0>
                <v-flex xs12 md7 ma-0 pa-0>
                    <v-card class="elevation-0" height="100vh" tile pa-0 ma-0  color="primary">
                        <v-container bg fluid fill-height grid-list-md text-xs-center pa-0 ma-0>
                            <v-layout row align-center ma-0 pa-0>
                                <v-flex ma-0 pa-0>
                                    Photo
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                <v-flex xs12 md5>
                    <v-card class="elevation-0" height="100vh" tile pa-0 ma-0  color="white">
                        <v-container bg fluid fill-height grid-list-md text-xs-center pa-0 ma-0>
                            <v-layout row align-center ma-0 pa-0>
                                <v-flex xs12 ma-0 pa-0>
                                    <v-container text-xs-left pl-5 pr-5>
                                        <v-layout>
                                            <v-flex>
                                                <v-card flat style="font-size: 30px; font-weight: bold;font-family: monospace;">
                                                    DATA <br>MANAGEMENT SUITE
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <v-container class="" fluid fill-height grid-list-md text-xs-center pl-5 pr-5>
                                        <v-layout row class="">
                                            <v-flex >
                                                <v-card flat >
                                                    <v-text-field 
                                                        label="Email"                                                     
                                                        prepend-icon="mail">
                                                    </v-text-field>
                                                    <v-text-field 
                                                        label="Password" 
                                                        prepend-icon="lock"
                                                        :append-icon="seePass ? 'visibility' : 'visibility_off'"
                                                        @click:append="() => (seePass = !seePass)"
                                                        :type="seePass ? 'text' : 'password'">

                                                    </v-text-field>
                                                    <v-card-actions>
                                                        <v-spacer/>
                                                        <v-btn                                                         
                                                            :loading="loading"
                                                            color="primary"                                                            
                                                            @click="() => {loading= true; setTimeout(()=> { loading = false;},200)}">
                                                            Login
                                                        </v-btn>
                                                        <v-spacer/>
                                                    </v-card-actions>
                                                    <v-card-actions>
                                                        <v-spacer/>
                                                        <a>Forgot Password?</a>
                                                        <v-spacer/>
                                                    </v-card-actions>
                                                </v-card>                                                
                                            </v-flex>
                                        </v-layout>
                                    </v-container>                                    
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
    data() {
        return{
            seePass: false,
            loading: false
        }
    }
}
</script>

<style>
    .a{
        font-family:monospace
    }
</style>
