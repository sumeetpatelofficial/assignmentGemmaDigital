<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="page-title my-4 row">
          <div class="title col-auto">
            <h2>Population</h2>
          </div>
          <div class="action-area col-auto" v-if="showAction">
            <a
              v-b-tooltip.hover
              title="Ascending"
              @click="sortData('asc')"
              :class="{
                current: current == 'asc',
                disabled: populationList.length < 2,
              }"
            >
              <span class="material-icons">sort</span>
              <span class="material-icons-outlined">south</span>
            </a>
            <a
              v-b-tooltip.hover
              title="Descending"
              @click="sortData('desc')"
              :class="{
                current: current == 'desc',
                disabled: populationList.length < 2,
              }"
            >
              <span class="material-icons">sort</span>
              <span class="material-icons-outlined">north</span></a
            >
            <select
              v-model="filterList"
              class="custom-select"
              @change="filterListPopulation"
            >
              <option :value="null">Filter</option>
              <option
                :value="option.value"
                v-for="(option, optionKey) in FilterOption"
                :key="optionKey"
              >
                {{ option.value }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="my-4">
      <p>Total {{ populationList.length }} records found.</p>
      <div class="overlay-loading" v-if="show">
        <div class="icon-loader">
          <span class="material-icons-outlined">refresh</span>
        </div>
      </div>

      <!-- Accordion created with vuejs transition -->
      <!-- <Accordion v-if="!show">
        <Panel v-for="(val, i) in perPagePopulation" :key="i">
          <template #heading>
            <h4>{{ val["ID Year"] }}</h4>
          </template>
          <template #body>
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
          </template>
        </Panel>
      </Accordion> -->

      <!-- Custom Panel component with javascript code -->
      <template v-if="!show">
        <Panel2 v-for="(val, i) in perPagePopulation" :key="i">
          <template #heading>
            <h4>{{ val["ID Year"] }}</h4>
          </template>
          <template #body>
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
          </template>
        </Panel2>
      </template>
    </div>

    <div class="row mt-3" v-if="populationList.length > 0">
      <div class="col-12 text-center">
        <button
          size="sm"
          class="custom-button"
          @click="viewMore"
          v-if="perPage < populationList.length"
        >
          View More
        </button>
        <button
          size="sm"
          class="custom-button"
          @click="viewLess"
          v-if="
            perPagePopulation.length > perPage ||
            perPagePopulation.length == populationList.length
          "
        >
          View Less
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

// uncomment this two component to use and check preview
// import Accordion from "@/components/Accordion.vue";
// import Panel from "@/components/panel.vue";

import Panel2 from "@/components/panel2.vue";
export default {
  components: { Panel2 }, //add {Accordion, Panel} to see the result
  name: "Page3",
  data() {
    return {
      name: "this is page 3",
      dataPopulation: "",
      populationList: [],
      show: false,
      showAction: false,
      current: "", //showing current order icon highlighted
      perPage: 7,
      filterList: null,
    };
  },
  methods: {
    async getDataFromUrl() {
      this.show = true;
      await setTimeout(() => {
        axios
          .get(
            "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
          )
          .then((result) => {
            this.dataPopulation = result.data;
            this.populationList = this.dataPopulation.data;
            this.show = false;
            this.showAction = true;
          })
          .catch();
      }, 1500);
    },

    // cases to sorting data
    sortData(type) {
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
    },

    //sorting Data in ascending order
    ascData() {
      return (this.populationList = _.sortBy(this.populationList, "ID Year"));
    },

    //sorting Data in descending order
    descData() {
      return (this.populationList = _.orderBy(
        this.populationList,
        ["ID Year"],
        ["desc"]
      ));
    },

    //Filtering the list with select.
    filterListPopulation(e) {
      // debugger;
      const selectValue = e.target.value;
      if (selectValue != "") {
        this.populationList = this.dataPopulation.data;
        const filteredList = this.perPagePopulation.filter(
          (v) => v.Year == selectValue
        );
        this.populationList = filteredList;
      } else {
        this.populationList = this.dataPopulation.data;
      }
    },

    // view more button click.
    viewMore() {
      if (this.perPage > this.populationList.length);
      this.perPage = this.perPage + 3;
    },

    // can do as an improvement code
    viewLess() {
      if (this.populationList.length > this.perPage);
      this.perPage = this.perPage - 3;
    },
  },
  created() {
    this.getDataFromUrl();
  },
  computed: {
    perPagePopulation() {
      const val = this.populationList.slice(0, this.perPage);
      return val;
    },
    FilterOption() {
      var yearArray = [];
      if (this.dataPopulation.data) {
        _.forEach(this.dataPopulation.data, function (value) {
          yearArray.push({ value: value.Year });
        });
      }
      return yearArray;
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
