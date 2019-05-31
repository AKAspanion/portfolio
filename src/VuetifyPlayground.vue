<template>
    <div>   
        <v-dialog
            v-model="dialog"
            width="600"
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
                    @change="onTabChange"
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
                
                <v-tabs-items 
                    v-model="tabs">
                    <!-- Schedule Tab -->
                    <v-tab-item>          
                        <v-container fill-height grid-list-md >
                            <v-layout row wrap style="margin-top: -20px">                                
                                <!-- date picker -->
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
                                            :min="new Date().toISOString().substr(0, 10)"
                                            no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menuDate = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.menuDate.save(scheduleDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex> 
                                <!-- time picker -->
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
                                 <!-- divider -->                               
                                <v-flex xs12>  
                                    <v-divider></v-divider>
                                </v-flex>
                                <!-- time restriction toggle -->
                                <v-layout 
                                    row
                                    style="margin: -10px -5px;">  
                                    <v-flex xs8 grow align-self-center ml-1>
                                        <v-switch 
                                            @change="onRestrictionSwitchChange"
                                            v-model="timeRestrictionSwitch" 
                                            color="green" 
                                            label="Time Restriction"
                                            ></v-switch>
                                    </v-flex>
                                    <v-spacer></v-spacer>
                                    <v-flex text-lg-right align-self-center mb-2>
                                        <v-btn
                                            :disabled="!timeRestrictionSwitch"
                                            color="green lighten"
                                            @click="onAddClick"
                                            >
                                            + Add New
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                                                <!-- expansion panel -->
                                <v-expansion-panel
                                    v-model="expansionRestriction"
                                    expand
                                    >
                                    <v-expansion-panel-content>
                                    <v-card> 
                                        <v-card-text>    
                                            <!-- defined restrictions list -->
                                            <v-flex xs12>  
                                                <v-list 
                                                    style="max-height: 100px; border: 1px solid #ccc;"
                                                    class="scroll-y">
                                                    <template v-for="(task) in scheduledTasks">
                                                        <v-list-tile
                                                            ripple
                                                            :class="task.id === selectedTask? 'grey-bg':''"
                                                            :key="task.id"
                                                            @click="onTileClick(task)"
                                                            >
                                                            <v-list-tile-action>
                                                                <v-icon
                                                                    color="red"
                                                                    @click="onIconClick(task)"
                                                                >remove_circle</v-icon>
                                                            </v-list-tile-action>
                                                            <v-list-tile-content 
                                                                style="margin-left: -20px">
                                                                <v-list-tile-title prepend-icon="event" v-html="getTextFromTask(task)"></v-list-tile-title>
                                                            </v-list-tile-content>
                                                        </v-list-tile>
                                                    </template>
                                                </v-list>
                                            </v-flex> 
                                            <!-- radio group -->   
                                            <v-radio-group                
                                                class="radio-group-full-width"                                
                                                :disabled="!timeRestrictionSwitch"
                                                v-model="restrictionRadios" 
                                                :mandatory="true"
                                                @change="onRestrictionRadioChange">
                                                <!-- task between picker -->                                                             
                                                <v-layout row style="margin-top: -35px;" >   
                                                    <v-flex align-self-center grow style="margin-left: 2px;">
                                                        Don't run tasks between 
                                                    </v-flex> 
                                                    <v-flex xs2 align-self-center>                                                                       
                                                        <v-select
                                                            v-model="fromTime"
                                                            :items="timeIntervals"
                                                            :disabled="!timeRestrictionSwitch || checkEntireDay"
                                                        ></v-select>
                                                    </v-flex>                                     
                                                    <v-flex xs1 align-self-center text-lg-center>
                                                        and 
                                                    </v-flex>    
                                                    <v-flex xs2 align-self-center>                                                                       
                                                        <v-select
                                                            v-model="toTime"
                                                            :items="timeIntervals"
                                                            :disabled="!timeRestrictionSwitch || checkEntireDay"
                                                        ></v-select>
                                                    </v-flex>        
                                                    <v-flex xs3 text-lg-right ml-3 align-self-center mt-1>
                                                        <v-checkbox 
                                                            @change="onCheckEntireDayChange"
                                                            :disabled="restrictionRadios==='radioEveryday' ? true:false"
                                                            v-model="checkEntireDay" 
                                                            label="Entire day">
                                                        </v-checkbox>
                                                    </v-flex>     
                                                </v-layout> 
                                                <!-- everyday radio -->                 
                                                <v-layout row >                                                                             
                                                    <v-flex xs12 align-self-center style="margin: -15px 0;">
                                                        <v-radio 
                                                            label="Everyday" 
                                                            value="radioEveryday"                                                
                                                            ></v-radio>
                                                    </v-flex>
                                                </v-layout>          
                                                <!-- weekday radio -->                             
                                                <v-layout row style="margin-bottom: -25px;">                                       
                                                    <v-flex xs6 align-self-center>
                                                        <v-radio 
                                                            label="On certain day of week" 
                                                            value="radioWeekday"
                                                            ></v-radio>
                                                    </v-flex>
                                                    <v-spacer></v-spacer>
                                                    <v-flex xs3 text-xs-right align-self-center>                                    
                                                        <v-select
                                                            :disabled="restrictionRadios==='radioWeekday' ? false:true"
                                                            v-model="weekDay"
                                                            :items="weekDays"
                                                            required
                                                        ></v-select>
                                                    </v-flex>
                                                </v-layout>     
                                                <!-- date radio --> 
                                                <v-layout row style="margin-bottom: -45px; margin-top: -15px;">                                       
                                                    <v-flex xs6 align-self-center>
                                                        <v-radio 
                                                            label="On certain date" 
                                                            value="radioDate"
                                                            ></v-radio>
                                                    </v-flex>                                        
                                                    <v-spacer></v-spacer>
                                                    <v-flex xs3>
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
                                                                :disabled="restrictionRadios==='radioDate' ? false:true"
                                                                v-model="restrictDate"
                                                                append-icon="event"
                                                                readonly
                                                                v-on="on"
                                                            ></v-text-field>
                                                            </template>
                                                            <v-date-picker 
                                                                v-model="restrictDate" 
                                                                :min="new Date().toISOString().substr(0, 10)"
                                                                no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat color="primary" @click="menuRestrictDate = false">Cancel</v-btn>
                                                            <v-btn flat color="primary" @click="$refs.menuRestrictDate.save(restrictDate)">OK</v-btn>
                                                            </v-date-picker>
                                                        </v-menu>
                                                    </v-flex> 
                                                </v-layout>
                                            </v-radio-group>
                                        </v-card-text>
                                    </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-layout>
                        </v-container>
                    </v-tab-item>                    
                    <!-- Task Properties Tab -->
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
                    <!-- Notification Tab -->
                    <v-tab-item>
                        <v-container fill-height grid-list-md >
                            <v-layout row wrap>
                                <v-flex xs12 >
                                    <v-switch 
                                        v-model="notificationSwitch" 
                                        color="blue" 
                                        label="Send Notification"
                                        @change="onNotificationSwitchChange" 
                                        ></v-switch>
                                </v-flex>   
                                
                                <v-expansion-panel
                                    v-model="expansionNotification"
                                    expand
                                    >
                                    <v-expansion-panel-content>
                                        <v-card> 
                                            <v-card-text>                                  
                                                <v-radio-group  
                                                    @change="onNotificationRadioChange"
                                                    :disabled="!notificationSwitch" 
                                                    v-model="notificationRadios" 
                                                    :mandatory="true">
                                                    <v-flex xs12 style="margin: -20px 0;">
                                                        <v-radio 
                                                            label="Whenever a task fails or terminates" 
                                                            value="radioFail"
                                                            ></v-radio>
                                                    </v-flex>
                                                    <v-layout row >
                                                        <v-flex align-self-center shrink ml-1>
                                                            <v-radio 
                                                                label="At every given" 
                                                                value="radioHour"
                                                                ></v-radio>
                                                        </v-flex> 
                                                        <v-flex xs2 align-self-center >                                                                       
                                                            <v-select
                                                                v-model="fromTime"
                                                                :items=Array.from(Array(10).keys())
                                                                :disabled="notificationRadios !=='radioHour'"
                                                            ></v-select>
                                                        </v-flex>                                                                            
                                                        <v-flex xs1 align-self-center text-lg-right>
                                                            hour
                                                        </v-flex>  
                                                    </v-layout>             
                                                    <v-flex xs12 style="margin: -20px 0;">
                                                        <v-radio 
                                                            label="When activity is complete" 
                                                            value="radioComplete"></v-radio>
                                                    </v-flex>
                                                </v-radio-group>
                                                <v-flex xs12 >
                                                    <v-card height="200" class="scroll">  
                                                        <v-list
                                                            one-line
                                                            >        
                                                            <v-list-tile>                                                    
                                                                <v-list-tile-action>
                                                                    <v-checkbox 
                                                                        :disabled="notificationRadios !=='radioComplete'" 
                                                                        v-model="checkAllEmail"
                                                                        @change="onCheckAllEmailChange"
                                                                        >
                                                                        </v-checkbox>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                        Recipients
                                                                    </v-list-tile-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>   
                                                            <template 
                                                                v-for="(item, index) in emails">
                                                                <v-divider
                                                                :key="['divider' + index]"
                                                                ></v-divider>
                                                                <v-list-tile
                                                                    :key="['email' + index]"
                                                                    >                                                    
                                                                    <v-list-tile-action>
                                                                        <v-checkbox 
                                                                            :disabled="notificationRadios !=='radioComplete'" 
                                                                            v-model="emailsSelected"
                                                                            :value="item"
                                                                            >
                                                                            </v-checkbox>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>
                                                                            {{item}}
                                                                        </v-list-tile-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                            </template> 
                                                        </v-list>
                                                    </v-card>
                                                </v-flex>
                                            </v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-layout>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer><v-btn
                        color="red"
                        flat
                        @click="dialog = false"
                        >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        flat
                        @click="onActionClick"
                        >
                        {{tabButtonName}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import uid from 'uid';
export default {
    name: 'VuetifyPlaygrounds',
    data(){
        return{
            dialog: true,
            // tab
            tabs: null,
            tabButtonName: 'Next',
            expansionNotification: [false],
            expansionRestriction: [true],
            tabItems: ["Schedule","Task Properties", "Notification"],
            //restriction
            scheduleDate: new Date().toISOString().substring(0, 10),
            scheduleTime: new Date().toISOString().substring(11, 16),
            timeRestrictionSwitch: true,
            restrictionRadios: 'radioEveryday',
            checkEntireDay: false,
            weekDay: null,
            restrictDate: null,
            fromTime: '23:00',
            toTime: '09:00',

            menuDate: false, 
            menuTime: false,
            menuRestrictDate: false,
            weekDays: [],
            timeIntervals: [],
            //task properties
            priorityItems: ["Very High","High", "Normal", "Low", "Very Low", "Background"],
            //notification
            notificationSwitch: false,  
            notificationRadios: 'radioFail',       
            checkAllEmail: false,
            emailsSelected: [],
            emails: ['thi.that@globalids.com', 'this.hat@globalids.com',
                        'ths.that@globalids.com', 'this.tat@globalids.com', 'this.that@globalis.com',
                        'tis.that@globalids.com', 'this.tht@globalids.com', 'this.that@globalid.com',
                        'his.that@globalids.com', 'this.tha@globalids.com', 'this.that@globalds.com'],
            selectedTask: null,
            scheduledTasks: []
        }
    },
    methods: {
        // events
        onTabChange(){
            if(this.tabs === 2){
                this.tabButtonName = "Done";
            }else{
                this.tabButtonName = "Next";
            }
        },
        onActionClick(){
            if(this.tabs === 2){
                this.submit();
            }else{
                this.next();
            }
        },
        onCheckAllEmailChange(){
            this.selectAllEmails();
        },
        onCheckEntireDayChange(){    
            !this.checkEntireDay ? this.fromTime = '23:00': this.fromTime = null;
            !this.checkEntireDay ? this.toTime = '09:00': this.toTime = null;
        },
        onNotificationRadioChange(){
            this.emailsSelected = [];
            this.checkAllEmail = false;
        },
        onRestrictionRadioChange(){   
            switch(this.restrictionRadios){
                case 'radioEveryday':
                    this.checkEntireDay = false;
                    this.fromTime = '23:00';
                    this.toTime = '09:00';
                    this.weekDay = null;
                    this.restrictDate = null;
                    break;
                case 'radioWeekday':
                    this.weekDay = 'Sunday';
                    this.restrictDate = null;
                    break;
                case 'radioDate':
                    this.restrictDate = new Date().toISOString().substr(0, 10);
                    this.weekDay = null;
                    break;
            }
        },
        onRestrictionSwitchChange(){
            this.expansionRestriction = [this.timeRestrictionSwitch];
        },
        onNotificationSwitchChange(){
            this.expansionNotification = [this.notificationSwitch];
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
        },
        onTileClick(item){ 
            this.selectedTask = item.id;    
            let 
            {   checkEntireDay,checkedRadio,
                fromTime,toTime,
                restrictDate,weekDay
            } = item;
            this.checkEntireDay = checkEntireDay;
            this.restrictionRadios=checkedRadio;
            this.fromTime=fromTime;
            this.toTime=toTime;
            this.restrictDate=restrictDate;
            this.weekDay=weekDay;
        },
        onIconClick(item){
            this.removeTask(item);
        },
        onAddClick(){
            this.scheduledTasks = [this.getCurrentState(), ...this.scheduledTasks];
        },

        // functions 
        removeTask(task){
            this.scheduledTasks = this.scheduledTasks.filter(e => task.id !== e.id);
        },
        next(){
            const active = parseInt(this.tabs)
            this.tabs = (active < 2 ? active + 1 : 0)
            this.onTabChange();
        },
        submit(){
            console.log('submit');
        },     
        selectAllEmails(){
            if(this.checkAllEmail){
                this.emailsSelected = this.emails;
            }
            else{
                this.emailsSelected = [];
            }
        },
        getCurrentState(){
            return{
                id: uid(),
                fromTime: this.fromTime,
                toTime: this.toTime,
                checkEntireDay: this.checkEntireDay,
                checkedRadio: this.restrictionRadios,
                restrictDate: this.restrictDate,
                weekDay: this.weekDay
            }
        },
        getTextFromTask(item){
            let text = 'Don\'t run tasks';
            let {   
                checkEntireDay,checkedRadio,
                fromTime,toTime,
                restrictDate,weekDay
            } = item;
            if(!checkEntireDay){
                text = text + ' between ' + fromTime +' and ' + toTime;
            }
            switch(checkedRadio){
                case 'radioEveryday':
                    text = text + ' everyday';
                    break;
                case 'radioWeekday':
                    text = text + ' on ' + weekDay;
                    break;
                case 'radioDate':
                    text = text + ' on ' + restrictDate;
                    break;
            }
            return text;
        }
    },
    computed: {
        renderText: {
            get(){
                return this.getTextFromTask(this.getCurrentState());
            }
        }
    },
    beforeUpdate() {
        let index = this.scheduledTasks.findIndex(task => task.id === this.selectedTask);
        let newTask = this.getCurrentState();
        newTask.id = this.selectedTask;
        this.scheduledTasks[index] = newTask;
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
    .grey-bg{
        background: #ccc;
    }
</style>
