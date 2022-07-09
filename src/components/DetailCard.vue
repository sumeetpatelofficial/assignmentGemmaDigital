<template>
  <div class="detail-card">
    <div class="detail-card-content">
      <h3 class="title">Lorem ipsum</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
      </p>
      <b-button variant="secondary" squared>Lorem ipsum</b-button>
    </div>
    <div class="detail-card-imagebox">
      <div class="box">
        <div class="content">
          <img :src="imgSrc" :alt="altText" srcset="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DetailCard extends Vue {
  @Prop() imgSrc: any;
  @Prop() altText: any;
}
</script>

<style scoped></style>
