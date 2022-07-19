<template>
  <div>
    <div class="container">
      <Carousel></Carousel>

      <div class="row">
        <div class="col-12">
          <div class="page-title my-4 row">
            <div class="title col-auto">
              <h2>Population</h2>
            </div>
            <div class="action-area col-auto" v-if="showAction">
              <b-link
                v-b-tooltip.hover
                title="Ascending"
                :disabled="populationList.length < 2"
                @click="sortData('asc')"
                :class="{ current: current == 'asc' }"
              >
                <span class="material-icons">sort</span>
                <span class="material-icons-outlined">south</span>
              </b-link>
              <b-link
                v-b-tooltip.hover
                title="Descending"
                :disabled="populationList.length < 2"
                @click="sortData('desc')"
                :class="{ current: current == 'desc' }"
              >
                <span class="material-icons">sort</span>
                <span class="material-icons-outlined">north</span></b-link
              >
              <b-form-select
                v-model="filterList"
                :options="FilterOption"
                @change="filterListPopulation"
              ></b-form-select>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <b-overlay
            :show="show"
            variant="transparent"
            rounded="sm"
            style="min-height: 100px"
          >
            <p>Total {{ populationList.length }} records found.</p>
            <div class="panel" v-for="(val, i) in perPagePopulation" :key="i">
              <div class="panel-heading" v-b-toggle="'accordion-' + i">
                <h4>{{ val["ID Year"] }}</h4>
                <i class="collapse-handle"></i>
              </div>
              <b-collapse
                :id="'accordion-' + i"
                :visible="i === 0"
                accordion="population-accordion"
              >
                <div class="panel-body">
                  <div class="body-area">
                    <div class="row">
                      <div class="col-md-4 mb-md-0 mb-3">
                        <h5>Country</h5>
                        <p>Name : #{{ val["Nation"] }}</p>
                      </div>
                      <div class="col-md-4 text-md-center mb-md-0 mb-3">
                        <h5>Population</h5>
                        <p>{{ val.Population }}</p>
                      </div>
                      <div class="col-md-4 text-md-right mb-md-0">
                        <h5>Source</h5>
                        <p>
                          {{ dataPopulation.source[0].annotations.source_name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </b-overlay>
        </div>
      </div>

      <div class="row mt-3" v-if="populationList.length > 0">
        <div class="col-12 text-center">
          <b-button
            size="sm"
            @click="viewMore"
            v-if="perPage < populationList.length"
            >View More</b-button
          >
          <b-button
            size="sm"
            @click="viewLess"
            v-if="
              perPagePopulation.length > perPage ||
              perPagePopulation.length == populationList.length
            "
            >View Less</b-button
          >
        </div>
      </div>
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
  dataPopulation: any = "";
  populationList: any = [];
  optionsFilter = this.FilterOption;
  show: any = false;
  showAction: any = false; //show sorting & filter only if data received
  current: any = ""; //showing current order icon highlighted
  perPage = 4;
  filterList: any = null;

  // created hook
  created() {
    this.getDataFromUrl();
  }

  // receiving data from end point with axios (fetch call.)
  async getDataFromUrl() {
    this.show = true;
    await setTimeout(() => {
      axios
        .get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        )
        .then((result: any) => {
          this.dataPopulation = result.data;
          this.populationList = this.dataPopulation.data;
          this.show = false;
          this.showAction = true;
        })
        .catch();
    }, 1500);
  }

  // generate Filter option from endpoint.
  get FilterOption() {
    var yearArray: any = [];
    if (this.dataPopulation.data) {
      yearArray.push({ text: "Filter", value: null });
      _.forEach(this.dataPopulation.data, function (value, key) {
        yearArray.push({ text: value.Year, value: value.Year });
      });
    }
    return yearArray;
  }

  // cases to sorting data
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
      default:
        break;
    }
  }

  //sorting Data in ascending order
  ascData() {
    return (this.populationList = _.sortBy(this.populationList, "ID Year"));
  }

  //sorting Data in descending order
  descData() {
    return (this.populationList = _.orderBy(
      this.populationList,
      ["ID Year"],
      ["desc"]
    ));
  }

  //Filtering the list with select.
  filterListPopulation(e: any) {
    if (e != null) {
      this.populationList = this.dataPopulation.data;
      const filteredList = this.perPagePopulation.filter(
        (v: any) => v.Year == e
      );
      this.populationList = filteredList;
    } else {
      this.populationList = this.dataPopulation.data;
    }
  }

  // paginating list form data list
  get perPagePopulation() {
    let val = this.populationList.slice(0, this.perPage);
    return val;
  }

  // view more button click.
  viewMore() {
    if (this.perPage > this.populationList.length) return;
    this.perPage = this.perPage + 3;
  }

  // can do as an improvement code
  viewLess() {
    if (this.populationList.length > this.perPage) return;
    this.perPage = this.perPage - 3;
  }
}
</script>

<style scoped></style>
