<template>
  <div class="container">
    <div class="my-4">
      <Accordion>
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
      </Accordion>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import Accordion from "@/components/Accordion.vue";
import Panel from "@/components/panel.vue";
export default {
  components: { Accordion, Panel },
  name: "Page3",
  data() {
    return {
      name: "this is page 3",
      dataPopulation: "",
      populationList: [],
      show: false,
      showAction: false,
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
  },
  created() {
    this.getDataFromUrl();
  },
  computed: {
    perPagePopulation() {
      let val = this.populationList.slice(0, this.perPage);
      return val;
    },
    FilterOption() {
      var yearArray = [];
      if (this.dataPopulation.data) {
        yearArray.push({ text: "Filter", value: null });
        _.forEach(this.dataPopulation.data, function (value, key) {
          yearArray.push({ text: value.Year, value: value.Year });
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
