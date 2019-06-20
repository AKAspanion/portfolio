<template>
    <div class="">
      <v-expand-transition >
        <div v-if="!open">
          <v-card >
            <v-card-text>show
              show<br>
              show
              show<br>
              show<br>
              show<br>
              show<br>
            </v-card-text>
            <v-card-actions>            
              <v-btn @click="open = !open">
                Toggle
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-expand-transition>
      <child-component v-model="open"></child-component>
    </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';
export default {  
  components: {
    ChildComponent
  },
  methods:{
  },
    data(){
      return{
        open: false
      }
    }

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
    .shift{
      margin-top: 5px;
      transition: .5s;
    }
    .rotate{
      transform: rotate(-45deg);
    }
</style>
