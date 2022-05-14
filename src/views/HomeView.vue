<template>
  <div class="container">
    <carousel-comp />
    <list-brands />
    <latest-hp />
    <top-by-interest />
  </div>
</template>

<script>
import ListBrands from "@/components/ListBrands.vue";
import LatestHp from "@/components/LatestHp.vue";
import TopByInterest from "@/components/TopByInterest.vue";
import CarouselComp from "@/components/CarouselComp.vue";
export default {
  components: {
    ListBrands,
    LatestHp,
    TopByInterest,
    CarouselComp,
  },
};
</script>

<style>
</style>