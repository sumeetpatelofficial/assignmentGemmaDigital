<template>
  <div>
    <div class="container">
      <Carousel />

      <div class="page-title my-4">
        <div class="title">
          <h2>Population</h2>
        </div>
        <div class="action-area">
          <b-link
            v-b-tooltip.hover
            title="Ascending"
            @click="sortData('asc')"
            :class="{ current: current == 'asc' }"
          >
            <span class="material-icons">sort</span>
            <span class="material-icons-outlined">south</span>
          </b-link>
          <b-link
            v-b-tooltip.hover
            title="Descending"
            @click="sortData('desc')"
            :class="{ current: current == 'desc' }"
          >
            <span class="material-icons">sort</span>
            <span class="material-icons-outlined">north</span></b-link
          >
        </div>
      </div>
      <b-overlay :show="show" rounded="sm">
        <div class="panel" v-for="(val, i) in dataPopulation.data" :key="i">
          <div class="panel-heading" v-b-toggle="'accordion-' + i">
            <h4>{{ val["ID Year"] }}</h4>
            <i class="collapse-handle"></i>
          </div>
          <b-collapse
            :id="'accordion-' + i"
            visible
            accordion="population-accordion"
          >
            <div class="panel-body">
              <div class="row">
                <div class="col-4">
                  <h5>Country</h5>
                  <p>Name {{ val["Nation"] }}</p>
                </div>
                <div class="col-4 text-center">
                  <h5>Population</h5>
                  <p>{{ val.Population }}</p>
                </div>
                <div class="col-4 text-right">
                  <h5>Source</h5>
                  <p>{{ dataPopulation.source[0].annotations.source_name }}</p>
                </div>
              </div>
            </div>
          </b-collapse>
        </div>
      </b-overlay>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import _ from "lodash";
import Carousel from "@/components/Carousel.vue";
@Component({
  components: {
    Carousel,
  },
})
export default class Page2 extends Vue {
  dataPopulation: any = [];
  show: any = false;
  current: any = "";
  created() {
    this.getDataFromUrl();
  }

  async getDataFromUrl() {
    this.show = true;
    await setTimeout(() => {
      axios
        .get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        )
        .then((result: any) => {
          this.dataPopulation = result.data;
          this.show = false;
        });
    }, 1500);
  }

  sortData(type: any) {
    switch (type) {
      case "asc":
        this.current = type;
        this.ascData();
        break;
      case "desc":
        this.current = type;
        this.descData();
        break;
    }
  }

  ascData() {
    return (this.dataPopulation.data = _.sortBy(
      this.dataPopulation.data,
      "ID Year"
    ));
  }

  descData() {
    return (this.dataPopulation.data = _.orderBy(
      this.dataPopulation.data,
      ["ID Year"],
      ["desc"]
    ));
  }
}
</script>

<style scoped></style>
