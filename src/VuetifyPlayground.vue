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
            <v-card style="overflow: hidden;">
                <v-snackbar
                    v-model="snackbar.model"
                    color="info"
                    left bottom
                    absolute
                    :timeout="2000"
                    >
                    {{snackbar.message}}                   
                </v-snackbar>
                <v-tabs
                    v-model="tab.tabs"
                    centered
                    slider-color="blue"
                    ripple
                    @change="onTabChange"
                    >
                    <v-tab
                        v-for="item in tab.tabItems"
                        :key="item"
                        ripple
                    >
                    {{item}}
                    </v-tab>
                </v-tabs>
                <!-- style="background: red;"-->
                
                <v-tabs-items 
                    v-model="tab.tabs">
                    <!-- Schedule Tab -->
                    <v-tab-item>          
                        <v-container fill-height grid-list-md >
                            <v-layout row wrap style="margin-top: -7px;">                                
                                <!-- date picker -->
                                <v-flex xs6>    
                                    <v-menu
                                        ref="menuDate"
                                        v-model="restriction.menuDate"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="restriction.scheduleDate "
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="restriction.scheduleDate "
                                            label="Pick Date"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker 
                                            v-model="restriction.scheduleDate " 
                                            :min="new Date().toISOString().substr(0, 10)"
                                            no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="restriction.menuDate = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.menuDate.save(restriction.scheduleDate )">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex> 
                                <!-- time picker -->
                                <v-flex xs6>    
                                    <v-menu
                                        ref="menuTime"
                                        v-model="restriction.menuTime"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="restriction.scheduleTime"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="restriction.scheduleTime"
                                            label="Pick Time"
                                            prepend-icon="access_time"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-if="restriction.menuTime"
                                            v-model="restriction.scheduleTime"
                                            full-width
                                            @click:minute="$refs.menuTime.save(restriction.scheduleTime)"
                                            ></v-time-picker>
                                    </v-menu>
                                </v-flex> 
                                 <!-- divider -->                               
                                <v-flex xs12>  
                                    <v-divider></v-divider>
                                </v-flex>
                                <!-- time restriction toggle -->
                                <v-layout row>  
                                    <v-flex xs8 grow align-self-center ml-1>
                                        <v-switch 
                                            @change="onRestrictionSwitchChange"
                                            v-model="restriction.switch" 
                                            color="primary" 
                                            label="Time Restriction"
                                            ></v-switch>
                                    </v-flex>
                                    <v-spacer></v-spacer>
                                    <v-flex text-lg-right align-self-center mb-2>
                                        <v-btn
                                            :disabled="!restriction.switch"
                                            color="primary"
                                            @click="onAddClick"
                                            >
                                            + Add New
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                                                <!-- expansion panel -->
                                <v-expansion-panel
                                    v-model="tab.expansionRestriction"
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
                                                    <template v-for="(task) in restriction.scheduledTasks">
                                                        <v-list-tile
                                                            ripple
                                                            :class="task.id === restriction.selectedTask? 'grey-bg':''"
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
                                                :disabled="!restriction.switch"
                                                v-model="restriction.radio" 
                                                :mandatory="true"
                                                @change="onRestrictionRadioChange">
                                                <!-- task between picker -->                                                             
                                                <v-layout row style="margin-top: -35px;" >   
                                                    <v-flex align-self-center grow style="margin-left: 2px;">
                                                        Don't run tasks between 
                                                    </v-flex> 
                                                    <v-flex xs2 align-self-center>                                                                       
                                                        <v-select
                                                            v-model="restriction.fromTime"
                                                            :items="restriction.timeIntervals"
                                                            :disabled="!restriction.switch || restriction.checkEntireDay"
                                                        ></v-select>
                                                    </v-flex>                                     
                                                    <v-flex xs1 align-self-center text-lg-center>
                                                        and 
                                                    </v-flex>    
                                                    <v-flex xs2 align-self-center>                                                                       
                                                        <v-select
                                                            v-model="restriction.toTime"
                                                            :items="restriction.timeIntervals"
                                                            :disabled="!restriction.switch || restriction.checkEntireDay"
                                                        ></v-select>
                                                    </v-flex>        
                                                    <v-flex xs3 text-lg-right ml-3 align-self-center mt-1>
                                                        <v-checkbox 
                                                            @change="onCheckEntireDayChange"
                                                            :disabled="restriction.radio==='radioEveryday' ? true:false"
                                                            v-model="restriction.checkEntireDay" 
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
                                                            :disabled="restriction.radio==='radioWeekday' ? false:true"
                                                            v-model="restriction.restrictDay"
                                                            :items="restriction.weekDays"
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
                                                            v-model="restriction.menuRestrictDate"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            :return-value.sync="restriction.restrictDate"
                                                            lazy
                                                            transition="scale-transition"
                                                            offset-y
                                                            full-width
                                                            min-width="290px"
                                                        >
                                                            <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                :disabled="restriction.radio==='radioDate' ? false:true"
                                                                v-model="restriction.restrictDate"
                                                                append-icon="event"
                                                                readonly
                                                                v-on="on"
                                                            ></v-text-field>
                                                            </template>
                                                            <v-date-picker 
                                                                v-model="restriction.restrictDate" 
                                                                :min="new Date().toISOString().substr(0, 10)"
                                                                no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat color="primary" @click="restriction.menuRestrictDate = false">Cancel</v-btn>
                                                            <v-btn flat color="primary" @click="$refs.menuRestrictDate.save(restriction.restrictDate)">OK</v-btn>
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
                            <v-layout row wrap style="margin: -20px 0 -23px 0;">
                                <v-flex xs6 >
                                <v-select
                                    v-model="taskProperties.priority"
                                    :items="taskProperties.priorityItems"
                                    label="Priority"
                                ></v-select>
                                </v-flex>
                                <v-flex xs6>                       
                                <v-select
                                    v-model="taskProperties.maxParallelTask"
                                    label="Max tasks run in parallel"
                                    value="2"
                                    :items=Array.from(Array(10).keys())
                                ></v-select>
                                </v-flex>
                                <v-flex xs6>
                                    <v-textarea
                                        box
                                        height="80"
                                        v-model="taskProperties.actionName"
                                        label="Configure Action Name"
                                        value="DISCOVER TABLES"
                                    ></v-textarea>
                                    </v-flex>
                                    <v-flex xs6>                          
                                    <v-select
                                        v-model="taskProperties.restartAttempt"
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
                        <v-container fill-height grid-list-md>
                            <v-layout row wrap >
                                <v-flex xs12 style="margin: -25px 0 -10px 0;">
                                    <v-switch 
                                        v-model="notification.switch" 
                                        color="blue" 
                                        label="Send Notification"
                                        @change="onNotificationSwitchChange" 
                                        ></v-switch>
                                </v-flex>                                    
                                <v-radio-group  
                                    @change="onNotificationRadioChange"
                                    :disabled="!notification.switch" 
                                    v-model="notification.radio" 
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
                                                label="At every given hour" 
                                                value="radioHour"
                                                ></v-radio>
                                        </v-flex> 
                                        <v-flex xs2 align-self-center >                                                                       
                                            <v-select
                                                v-model="notification.hour"
                                                :items=Array.from(Array(10).keys())
                                                :disabled="notification.radio !=='radioHour'"
                                            ></v-select>
                                        </v-flex>   
                                    </v-layout>             
                                    <v-flex xs12 style="margin: -20px 0;">
                                        <v-radio 
                                            label="When activity is complete" 
                                            value="radioComplete"></v-radio>
                                    </v-flex>
                                </v-radio-group>
                                <v-flex xs12>
                                    <v-expansion-panel
                                        v-model="tab.expansionEmailList"
                                        expand
                                        >
                                        <v-expansion-panel-content>
                                            <v-card 
                                                height="250" 
                                                class="scroll-y">
                                                <v-list-tile>                                                    
                                                    <v-list-tile-action>
                                                        <v-checkbox 
                                                            :disabled="!notification.switch" 
                                                            v-model="notification.checkAllEmail"
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
                                                    v-for="(item, index) in notification.emails">
                                                    <v-divider
                                                    :key="['divides'+index]"
                                                    ></v-divider>
                                                    <v-list-tile
                                                        :key="index"
                                                        >                                                    
                                                        <v-list-tile-action>
                                                            <v-checkbox 
                                                                :disabled="!notification.switch" 
                                                                v-model="notification.recipients"
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
                                            </v-card>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer><v-btn
                        color="primary"
                        flat
                        :disabled="tab.tabs === 0"
                        @click="onBackClick"
                        >
                        Back
                    </v-btn>
                    <v-btn
                        color="green"
                        flat
                        @click="onActionClick"
                        >
                        {{tab.tabButtonName}}
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
            tab: null,
            dialog: true,
            snackbar: null,
            restriction: null,
            taskProperties: null,
            notification: null
        }
    },
    methods: {
        // events
        onTabChange(){
            if(this.tab.tabs === 2){
                this.tab.tabButtonName = "Done";
            }else{
                this.tab.tabButtonName = "Next";
            }
        },
        onNotificationRadioChange(){
            switch (this.notification.radio) {
                case 'radioComplete':
                    this.tab.expansionEmailList = [true];  
                    this.notification.hour = null;   
                    this.notification.recipients = this.notification.emails;   
                    this.notification.checkAllEmail = true;            
                    break;
                case 'radioFail':
                    this.tab.expansionEmailList = [false];  
                    this.notification.hour = null;    
                    this.notification.recipients = [];
                    this.notification.checkAllEmail = false;                            
                    break;
                case 'radioHour':
                    this.tab.expansionEmailList = [false];
                    this.notification.hour = 1;      
                    this.notification.recipients = [];
                    this.notification.checkAllEmail = false;   
                    break;
            }
        },
        onRestrictionRadioChange(){   
            switch(this.restriction.radio){
                case 'radioEveryday':
                    this.restriction.checkEntireDay = false;
                    this.restriction.fromTime = '23:00';
                    this.restriction.toTime = '09:00';
                    this.restriction.restrictDay = null;
                    this.restriction.restrictDate = null;
                    break;
                case 'radioWeekday':
                    this.restriction.restrictDay = 'Sunday';
                    this.restriction.restrictDate = null;
                    break;
                case 'radioDate':
                    this.restriction.restrictDate = new Date().toISOString().substr(0, 10);
                    this.restriction.restrictDay = null;
                    break;
            }
        },
        onRestrictionSwitchChange(){
            this.tab.expansionRestriction = [this.restriction.switch];
        },
        onNotificationSwitchChange(){
            this.notification.radio = 'radioFail';
            this.notification.hour = null;
            this.tab.expansionEmailList = [false];
        },
        onCheckAllEmailChange(){
            this.selectAllEmails();
        },
        onCheckEntireDayChange(){ 
            let {checkEntireDay} = this.restriction;   
            !checkEntireDay ? this.restriction.fromTime = '23:00': this.restriction.fromTime = null;
            !checkEntireDay ? this.restriction.toTime = '09:00': this.restriction.toTime = null;
        },
        onTileClick(item){ 
            this.restriction.selectedTask = item.id;    
            let {checkEntireDay,checkedRadio,fromTime,
                toTime,restrictDate,restrictDay
            } = item;
            this.restriction.checkEntireDay = checkEntireDay;
            this.restriction.radio=checkedRadio;
            this.restriction.fromTime=fromTime;
            this.restriction.toTime=toTime;
            this.restriction.restrictDate=restrictDate;
            this.restriction.restrictDay=restrictDay;
        },
        onIconClick(item){
            this.removeTaskById(item.id);
        },
        onAddClick(){
            this.restriction.scheduledTasks = [this.getCurrentState(), ...this.restriction.scheduledTasks];
        },
        onActionClick(){
            if(this.tab.tabs === 2){
                this.submit();
            }else{
                this.next();
            }
        },
        onBackClick(){
            const active = parseInt(this.tab.tabs)
            this.tab.tabs = (active - 1)
            this.onTabChange();
        },

        // functions 
        getTaskById(id){
            return this.restriction.scheduledTasks.filter(e => id === e.id)[0];
        },
        removeTaskById(id){
            this.restriction.scheduledTasks = this.restriction.scheduledTasks.filter(e => id !== e.id);
        },
        next(){
            const active = parseInt(this.tab.tabs)
            switch(active){
                case 0:
                    if(this.restriction.switch){
                        if(this.getTaskById(this.restriction.selectedTask) === undefined){
                            this.snackbar.model = true;
                            if(this.restriction.scheduledTasks.length <= 0){
                                this.snackbar.message = 'Please add a configuration!';
                            }else{
                                this.snackbar.message = 'Please select a configuration!';
                            }
                            return;
                        }
                    }
                    break;
                case 1:
                    break;
                case 2:
                    break;
            }
            this.tab.tabs = (active < 2 ? active + 1 : 0)
            this.onTabChange();
        },        
        submit(){
            let data ={
                schedule: {
                    timeRestriction: this.restriction.switch ? {
                        allRestrictions: this.restriction.scheduledTasks,
                        selectedRestriction: this.getTaskById(this.restriction.selectedTask)
                    } : null,
                    scheduleDate : this.restriction.scheduleDate ,
                    scheduleTime: this.restriction.scheduleTime 
                },
                taskProperties: {
                    priority: this.taskProperties.priority.toLowerCase(),
                    maxParallelTask: this.taskProperties.maxParallelTask,
                    actionName: this.taskProperties.actionName,
                    restartAttempt: this.taskProperties.restartAttempt
                },
                notification: this.notification.switch ? 
                this.getCurrentNotification() : null
            }
            this.dialog = false;
            this.initState();
            this.emitToParent(data);
        },    
        getCurrentNotification(){
            switch (this.notification.radio) {
                case 'radioComplete':
                    return {
                        type: 'complete',
                        data:{
                            recipients: this.notification.recipients
                        }
                    }
                case 'radioFail':
                    return {
                        type: 'fail',
                        data: null
                    }
                case 'radioHour':                    
                    return {
                        type: 'hour',
                        data:{
                            hourCount: this.notification.hour
                        }
                    }
            }
        }, 
        selectAllEmails(){
            if(this.notification.checkAllEmail){
                this.notification.recipients = this.notification.emails;
            }
            else{
                this.notification.recipients = [];
            }
        },
        getCurrentState(){
            let {fromTime, toTime, checkEntireDay, 
                radio, restrictDate, restrictDay
            } = this.restriction;
            return{
                id: uid(),
                fromTime,
                toTime,
                restrictDay,
                restrictDate,
                checkEntireDay,
                checkedRadio: radio
            }
        },
        getTextFromTask(item){
            let text = 'Don\'t run tasks';
            let {   
                checkEntireDay,checkedRadio,
                fromTime,toTime,
                restrictDate,restrictDay
            } = item;
            if(!checkEntireDay){
                text = text + ' between ' + fromTime +' and ' + toTime;
            }
            switch(checkedRadio){
                case 'radioEveryday':
                    text = text + ' everyday';
                    break;
                case 'radioWeekday':
                    text = text + ' on ' + restrictDay;
                    break;
                case 'radioDate':
                    text = text + ' on ' + restrictDate;
                    break;
            }
            return text;
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
        // emit
        emitToParent (data) {
            this.$emit('dataFromSchedule', data);
        },
        //init
        initState(){
            let id = uid();
            this.tab = {                
                tabs: 0,
                tabButtonName: 'Next',
                expansionEmailList: [false],
                expansionRestriction: [false],
                tabItems: ["Schedule","Task Properties", "Notification"]
            }
            this.restriction = {
                scheduleDate : new Date().toISOString().substring(0, 10),
                scheduleTime: new Date().toISOString().substring(11, 16),
                switch: false,
                radio: 'radioEveryday',
                checkEntireDay: false,
                restrictDate: null,
                fromTime: '23:00',
                toTime: '09:00',
                restrictDay: null,
                menuDate: false, 
                menuTime: false,
                menuRestrictDate: false,
                selectedTask: id,
                scheduledTasks: [{
                    id: id,
                    fromTime: "23:00",
                    toTime: "09:00",
                    restrictDay: null,
                    restrictDate: null,
                    checkEntireDay: false,
                    checkedRadio: "radioEveryday",
                }],
                weekDays: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                timeIntervals: this.getHourIntervals(),
            }
            this.taskProperties = {                
                priority: 'Normal',
                restartAttempt: 0,
                maxParallelTask: 2,
                actionName: 'CONFIGURE ACTION',
                priorityItems: ["Very High","High", "Normal", "Low", "Very Low", "Background"],
            }
            this.notification = {
                switch: false,  
                radio: 'radioFail',       
                hour: null,
                recipients: [],
                checkAllEmail: false,
                emails: ['thi.that@globalids.com', 'this.hat@globalids.com', 'tis.hat@globalids.com',
                        'ths.that@globalids.com', 'this.tat@globalids.com', 'this.that@globalis.com',
                        'tis.that@globalids.com', 'this.tht@globalids.com', 'this.that@globalid.com',
                        'his.that@globalids.com', 'this.tha@globalids.com', 'this.that@globalds.com']
            }
            this.snackbar = {
                model: false,
                message: 'Hey I am a snackbar'
            }
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
        let index = this.restriction.scheduledTasks.findIndex(task => task.id === this.restriction.selectedTask);
        let newTask = this.getCurrentState();
        newTask.id = this.restriction.selectedTask;
        this.restriction.scheduledTasks[index] = newTask;
    },
    created(){
        this.initState();
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
