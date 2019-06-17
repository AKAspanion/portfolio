<template>
    <div class="">
        <v-container class="elevation-1">
        <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
                class="elevation-1"
        >
        <v-tab
            v-for="n in 3"
            :key="n"
            ripple
        >
        </v-tab>
        <v-spacer></v-spacer>
        <v-icon @click="panel = [!panel[0]]; active=2; icon='mail'" :class="panel[0]? 'rotate':''">add</v-icon>
        <v-tab-item
        
        >
            <v-expansion-panel
                v-model="panel"
                focusable
                expand
        
                class="elevation-0"
                >
                  <v-expansion-panel-content>
                    <v-container fluid fill-height grid-list-lg>
                      
                    <v-layout row wrap>
                        <v-flex xs6>
                          <v-text-field label="id" solo elevation=10 clearable success></v-text-field>
                        </v-flex>
                        <v-flex xs6>

                          <v-text-field label="id" solo  ></v-text-field>
                        </v-flex>
                        
                        <v-flex xs12>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn ma-0 color="primary">Hey</v-btn>
                          </v-card-actions>
                        </v-flex>
                    </v-layout>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-divider ></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="desserts"        
                    :class="panel[0]? 'shift':''"
                >
                    <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                    </template>
                </v-data-table>
        </v-tab-item>
        <v-tab-item>
            This
        </v-tab-item>
        <v-tab-item>
            This 2
        </v-tab-item>
        </v-tabs>
        </v-container>
    </div>
</template>

<script>
export default {
  methods:{
    onCLick(){
      console.log(this.$refs.dataT);
    }
  },
    data(){
        return{
          icon: 'person',
            panel: [true],
            headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
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
