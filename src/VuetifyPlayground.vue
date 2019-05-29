<template>
    <div>   
        <v-dialog
            v-model="dialog"
            width="800"
            >
            <template v-slot:activator="{ on }">
                <v-btn
                    color="red lighten-2"
                    dark
                    v-on="on"
                    >
                    Click Me
                </v-btn>
            </template>
            <v-card>
                 <v-tabs
                    v-model="tabs"
                    centered
                    slider-color="blue"
                    ripple
                    >
                    <v-tab
                        v-for="n in 3"
                        :key="n"
                    >
                        Item {{ n }}
                    </v-tab>
                </v-tabs>
                <!-- style="background: red;"-->
                
                <v-tabs-items v-model="tabs" >
                    <v-tab-item>
                        <v-container fluid fill-height grid-list-md >
                            <v-layout row wrap>
                                <v-flex xs12 >
                                    <v-switch  v-model="switchNotification" color="blue" label="Send Notification" />
                                </v-flex>
                                <v-flex xs12 >                                    
                                    <v-radio-group  :disabled="!switchNotification" v-model="radios" :mandatory="true">
                                        <v-flex xs12 >
                                            <v-radio label="Whenever a task fails or terminates " value="radio-1"></v-radio>
                                        </v-flex>
                                        <v-flex xs12 >                                        
                                            <v-layout row justify-start>                                        
                                                <v-flex xs10 align-self-center>
                                                    <v-radio label="At every given" value="radio-2"></v-radio>
                                                </v-flex>
                                                <v-flex xs2>
                                                    <v-text-field
                                                    placeholder="Hour"
                                                    ></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>                                
                                        <v-flex xs12 >
                                            <v-radio label="When activity is complete" value="radio-3"></v-radio>
                                        </v-flex>
                                    </v-radio-group>
                                </v-flex>
                                <v-flex xs12 >
                                    <v-card height="250" class="scroll">  
                                        <v-list
                                            one-line
                                        >           
                                            <template v-for="n in 10">
                                                <v-divider
                                                :key="n"
                                                ></v-divider>

                                                <v-list-tile
                                                    :key="n"
                                                    >
                                                    
                                                    <v-list-tile-action>
                                                        <v-checkbox :disabled="!switchNotification" v-model="checkbox"></v-checkbox>
                                                    </v-list-tile-action>

                                                    <v-list-tile-content>
                                                        <v-list-tile-title>Hey</v-list-tile-title>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </template> 
                                        </v-list>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-tab-item>                    
                    <v-tab-item>
                        2
                    </v-tab-item>
                    <v-tab-item>
                        3
                    </v-tab-item>
                </v-tabs-items>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        flat
                        @click="dialog = false"
                        >
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'VuetifyPlaygrounds',
    data(){
        return{
            dialog: true,
            tabs: null,
            switchNotification: false,            
            radios: null
        }
    }
}
</script>

<style>
    .scroll{
        overflow-y: scroll;
    }
    
    .v-input--selection-controls .v-input__control{
        width: 100%
    }
</style>
