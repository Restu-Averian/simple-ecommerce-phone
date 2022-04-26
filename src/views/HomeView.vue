<template>
  <div class="container">
    <list-brands />
    <latest-hp />
    <top-by-interest />
    <top-by-fans />
  </div>
</template>

<script>
import ListBrands from "@/components/ListBrands.vue";
import LatestHp from "@/components/LatestHp.vue";
import TopByFans from "@/components/TopByFans.vue";
import TopByInterest from "@/components/TopByInterest.vue";
export default {
  components: {
    ListBrands,
    LatestHp,
    TopByFans,
    TopByInterest,
  },
};
</script>

<style>
</style>