<template>
  <div>    
    <div class="container">
      <b-link @click="ascData">asc</b-link> | <b-link @click="descData">desc</b-link>
      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Id Nation</th>
            <th>ID Year</th>
            <th>Year</th>
            <th>Population</th>
            <th>Slug Nation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="val, i in data" :key="i">
            <td>{{val['ID Nation']}}</td>
            <td>{{val['ID Year']}}</td>
            <td>{{val.Year}}</td>
            <td>{{val.Population}}</td>
            <td>{{val['Slug Nation']}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import _ from "lodash";
@Component
export default class Page2 extends Vue {
  data: any = [];
  created() {
    axios
      .get("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((result: any) => {
        this.data = result.data.data;
      });    
  }
  
  ascData(){    
    return this.data = _.sortBy(this.data, 'ID Year')
  }

  descData(){
    return this.data = _.orderBy(this.data, ['ID Year'], ['desc']);
  }
}
</script>

<style scoped></style>
