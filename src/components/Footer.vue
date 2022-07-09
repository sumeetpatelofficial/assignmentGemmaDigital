<template>
  <div class="footer">
    <div class="container">
      <div class="row mb-3">
        <div class="col-12">
          <h4>Company Name</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="i in 4" :key="i">
          <h5 class="heading">Lorem Ipsum</h5>
          <div class="links">
            <b-link v-for="j in 4" :key="j"> Lorem Ipsum </b-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style scoped></style>
