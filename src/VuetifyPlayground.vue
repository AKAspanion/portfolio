<template>
    <div>
        <v-container fluid fill-height grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 md3 align-center text-xs-center>
                    <v-card>
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2"
                            >
                        </v-img>
                        <div class="profile-img">
                            <v-avatar
                                size="150"
                                color="white"
                                class="elevation-3"
                                >
                                    <img src='./assets/profile.jpg' alt="avatar">
                            </v-avatar>
                        </div>
                        <v-card-text class="text-xs-center">
                            <!-- all data here -->
                            <h1>Ankit Pandit</h1>
                            <h3>Developer</h3>
                            <v-list >
                                <v-list-tile
                                    >
                                    <v-list-tile-avatar>
                                        <v-icon>
                                            email
                                        </v-icon>
                                    </v-list-tile-avatar>
                                        
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>ankit.pandit@globalids.com</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile 
                                    >
                                    <v-list-tile-avatar>
                                        <v-icon>
                                            email
                                        </v-icon>
                                    </v-list-tile-avatar>
                                        
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>pandit@globalids.com</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 md9 pl-5>
                    <v-card >
                        <v-card-text>
                            <template>
                                <div>
                                    <v-tabs>
                                        <v-tab
                                            v-for="n in 3"
                                            :key="n"
                                            ripple
                                        >
                                            Item {{ n }}

                                        </v-tab>
                                        <v-tab-item
                                            v-for="n in 3"
                                            :key="n"
                                            >
                                            <v-card flat>
                                                <v-card-text>Tab {{n}}</v-card-text>
                                            </v-card>
                                    </v-tab-item>
                                    </v-tabs>
                                </div>
                                </template>
                        </v-card-text>
                    </v-card>
                </v-flex>


            </v-layout>

        </v-container>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .profile-img{
        height: 80px;
        transform: translateY(-75px);
    }
    .profile-img .v-avatar img{
        border: 4px solid #EFEFEF;
    }
    .test{
        background: red;
        border: 1px solid red !important;
    }
</style>
