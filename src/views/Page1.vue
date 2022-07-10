<template>
  <div class="container">
    <Carousel />
    <div class="my-md-5 my-3">
      <DetailCard
        v-for="(cardImage, card) in cardImages"
        :key="card"
        :class="{ 'right-align': card % 2 != 0 }"
        :imgSrc="cardImage.imgSrc"
        :altText="cardImage.altText"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailCard from "@/components/DetailCard.vue";
import Carousel from "@/components/Carousel.vue";
@Component({
  components: {
    DetailCard,
    Carousel,
  },
})
export default class Home extends Vue {
  cardImages: any = [
    {
      imgSrc: require("../assets/images/image4.jpg"),
      altText: "alt value",
    },
    {
      imgSrc: require("../assets/images/image5.jpg"),
      altText: "alt value",
    },
  ];
}
</script>
