<template>
  <b-carousel id="carousel-1" :interval="4000" controls>
    <b-carousel-slide v-for="(slide, s) in carouselList" :key="s">
      <template #img>
        <div class="content">
          <img :src="slide.imgSrc" :alt="slide.altText" srcset="" />
        </div>
      </template>
    </b-carousel-slide>
  </b-carousel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Carousel extends Vue {
  carouselList: any = [
    {
      imgSrc: require("../assets/images/image1.jpg"),
      altText: "alt value",
    },
    {
      imgSrc: require("../assets/images/image2.jpg"),
      altText: "alt value",
    },
    {
      imgSrc: require("../assets/images/image3.jpg"),
      altText: "alt value",
    },
  ];
}
</script>

<style scoped></style>
