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
                        v-for="tab in tabItems"
                        :key="tab"
                        ripple
                    >
                    {{tab}}
                    </v-tab>
                </v-tabs>
                <!-- style="background: red;"-->
                
                <v-tabs-items v-model="tabs">
                    <v-tab-item>          
                        <v-container fill-height grid-list-md >
                            <v-layout row wrap>                                
                                <v-flex xs6>
                                    <v-menu
                                        ref="menuDate"
                                        v-model="menuDate"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="scheduleDate"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="scheduleDate"
                                            label="Pick Date"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker 
                                            v-model="scheduleDate" 
                                            :min="scheduleDate"
                                            no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menuDate = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.menuDate.save(scheduleDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex> 
                                <v-flex xs6>
                                    <v-menu
                                        ref="menuTime"
                                        v-model="menuTime"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="scheduleTime"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="scheduleTime"
                                            label="Pick Time"
                                            prepend-icon="access_time"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-if="menuTime"
                                            v-model="scheduleTime"
                                            full-width
                                            @click:minute="$refs.menuTime.save(scheduleTime)"
                                            ></v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs8 grow align-self-center>
                                    <v-switch 
                                        v-model="timeRestrictionSwitch" 
                                        color="green" 
                                        label="Time Restriction"
                                        ></v-switch>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-flex text-lg-right>
                                    <v-btn
                                        :disabled="!timeRestrictionSwitch"
                                        color="green lighten"
                                        dark
                                        >
                                        + Add New
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                        box
                                        :disabled="!timeRestrictionSwitch"
                                        readonly
                                        :value="['Don\'t Run Tasks' + getTime() + ' on ' + getDay()]"
                                    ></v-textarea>
                                </v-flex> 
                                <v-radio-group                                      
                                    class="radio-group-full-width"                                
                                    :disabled="!timeRestrictionSwitch"
                                    v-model="restrictionRadios" :mandatory="true">                                                             
                                    <v-layout row style="margin-top: -50px;">
                                        <v-flex align-self-center shrink style="margin-left: 2px;">
                                            Don't run tasks between 
                                        </v-flex> 
                                        <v-flex xs1 align-self-center >                                                                       
                                            <v-select
                                                v-model="fromTime"
                                                :items="timeIntervals"
                                                :disabled="!timeRestrictionSwitch || checkAllDay"
                                            ></v-select>
                                        </v-flex>                                     
                                        <v-flex xs1 align-self-center text-lg-center>
                                            and 
                                        </v-flex>    
                                        <v-flex xs1 align-self-center>                                                                       
                                            <v-select
                                                v-model="toTime"
                                                :items="timeIntervals"
                                                :disabled="!timeRestrictionSwitch || checkAllDay"
                                            ></v-select>
                                        </v-flex>        
                                        <v-spacer></v-spacer>
                                        <v-flex xs2 text-lg-right >
                                            <v-checkbox 
                                                :disabled="restrictionRadios==='radioEveryday' ? true:false"
                                                v-model="checkAllDay" 
                                                label="Entire day">
                                            </v-checkbox>
                                        </v-flex>     
                                    </v-layout>                 
                                    <v-layout row style="padding-bottom: 20px;">                                                                                
                                        <v-flex xs12 align-self-center>
                                            <v-radio 
                                                label="Everyday" 
                                                value="radioEveryday"                                                
                                                ></v-radio>
                                        </v-flex>
                                    </v-layout>                                      
                                    <v-layout row >                                        
                                        <v-flex xs6 align-self-center>
                                            <v-radio label="On certain day of week" value="radio-2"></v-radio>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs4 text-xs-right>                                    
                                            <v-select
                                                :disabled="restrictionRadios==='radio-2' ? false:true"
                                                v-model="weekDay"
                                                :items="weekDays"
                                                label="Week Day"
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>     
                                    <v-layout row justify-start>                                        
                                        <v-flex xs6 align-self-center>
                                            <v-radio 
                                                label="On certain date" 
                                                value="radio-3"
                                                ></v-radio>
                                        </v-flex>                                        
                                        <v-spacer></v-spacer>
                                        <v-flex xs4>
                                            <v-menu
                                                ref="menuRestrictDate"
                                                v-model="menuRestrictDate"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="restrictDate"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    :disabled="restrictionRadios==='radio-3' ? false:true"
                                                    v-model="restrictDate"
                                                    append-icon="event"
                                                    label="Date"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                                </template>
                                                <v-date-picker 
                                                    v-model="restrictDate" 
                                                    :min="restrictDate"
                                                    no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="menuRestrictDate = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.menuRestrictDate.save(restrictDate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-flex> 
                                    </v-layout>
                                </v-radio-group>
                            </v-layout>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>                        
                        <v-container fill-height grid-list-md >
                            <v-layout row wrap>
                                <v-flex xs6>
                                <v-select
                                    :items="priorityItems"
                                    label="Priority"
                                ></v-select>
                                </v-flex>
                                <v-flex xs6>                       
                                <v-select
                                    label="Max tasks run in parallel"
                                    value="2"
                                    :items=Array.from(Array(10).keys())
                                ></v-select>
                                </v-flex>
                                <v-flex xs6>
                                    <v-textarea
                                        box
                                        label="Configure Action Name"
                                        value="DISCOVER TABLES"
                                    ></v-textarea>
                                    </v-flex>
                                    <v-flex xs6>                          
                                    <v-select
                                        label="Attempts to restart failed task"
                                        value="0"
                                        :items=Array.from(Array(10).keys())
                                    ></v-select>
                                    </v-flex>
                            </v-layout>
                        </v-container>                        
                    </v-tab-item>
                    <v-tab-item>
                        <v-container fluid fill-height grid-list-md >
                            <v-layout row wrap>
                                <v-flex xs12 >
                                    <v-switch 
                                        v-model="notificationSwitch" 
                                        color="blue" 
                                        label="Send Notification" 
                                        ></v-switch>
                                </v-flex>                                   
                                <v-radio-group  
                                    :disabled="!notificationSwitch" 
                                    v-model="notificationRadios" 
                                    :mandatory="true">
                                    <v-flex xs12 >
                                        <v-radio 
                                            label="Whenever a task fails or terminates" 
                                            value="radioFail"
                                            ></v-radio>
                                    </v-flex>
                                    <v-layout row >
                                        <v-flex align-self-center shrink style="margin-left: 2px;">
                                            <v-radio 
                                                label="At every given" 
                                                value="radioGiven"
                                                ></v-radio>
                                        </v-flex> 
                                        <v-flex xs1 align-self-center >                                                                       
                                            <v-select
                                                v-model="fromTime"
                                                :items="timeIntervals"
                                                :disabled="!notificationSwitch"
                                            ></v-select>
                                        </v-flex>                                                                            
                                        <v-flex xs2 align-self-center text-lg-right>
                                            hour
                                        </v-flex>  
                                    </v-layout>             
                                    <v-flex xs12 >
                                        <v-radio 
                                            label="When activity is complete" 
                                            value="radioHour"></v-radio>
                                    </v-flex>
                                </v-radio-group>
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
                                                        <v-checkbox :disabled="!notificationSwitch" v-model="checkbox"></v-checkbox>
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
            checkAllDay: false,
            timeRestrictionSwitch: false,
            notificationSwitch: false,  
            notificationRadios: 'radioFail',       
            restrictionRadios: 'radioEveryday',
            tabs: null,
            weekDay: 'Sunday',
            scheduleDate: new Date().toISOString().substr(0, 10),
            menuDate: false, 
            restrictDate: new Date().toISOString().substr(0, 10),
            menuRestrictDate: false,
            scheduleTime: new Date().toISOString().substr(11, 5),
            fromTime: '22:30',
            toTime: '09:15',
            menuTime: false,
            weekDays: [],
            timeIntervals: [],
            tabItems: ["Schedule","Task Prioperties", "Notification"],
            priorityItems: ["Very High","High", "Normal", "Low", "Very Low", "Background"],
        }
    },
    methods: {
        getDay(){
            switch(this.restrictionRadios){
                case 'radioEveryday':
                    this.checkAllDay = false;
                    return 'Everyday';
                case 'radio-2':
                    return this.weekDay;
                case 'radio-3':
                    return this.restrictDate
            }
        },
        getTime(){
            if(!this.checkAllDay){
                return ' between ' + this.fromTime +' and ' + this.toTime;
            }
            else{
                return ''
            }
        },
        getHourIntervals(){
            var quarterHours = ["00", "15", "30", "45"];
            var times = [];
            for(var i = 0; i < 24; i++){
                for(var j = 0; j < 4; j++){
                    var time = i + ":" + quarterHours[j];
                    if(i < 10){
                        time = "0" + time;
                    }
                    times.push(time);
                }
            }
            return times;
        }
    },
    created(){
        this.weekDays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.timeIntervals = this.getHourIntervals();
    }
}
</script>

<style scoped>
    .scroll{
        overflow-y: scroll;
    }    
    .radio-group-full-width >>>.v-input__control {
        width: 100%
    }
</style>
