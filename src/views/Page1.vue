<template>
  <div class="container">
    <div class="my-5">
      <DetailCard v-for="i in 2" :key="i" :class="{'right-align': i%2 == 0}" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailCard from "@/components/DetailCard.vue";
import api from "@/api/apiService";
@Component({
  components: {
    DetailCard
  },
})
export default class Home extends Vue {
  mounted(){
    const value = api.getPopulationData();
    console.log(value.json())
  }
}
</script>
