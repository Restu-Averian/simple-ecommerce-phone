<template>
  <div class="my-4">
    <h2>List Brands</h2>
    <ul class="list-group">
      <li
        class="list-group-item custom-li"
        v-for="(brands, index) in dataBrands"
        :key="index"
        @click="goToHp(index, brands.brand_slug)"
      >
        {{ brands.brand_name }} ( {{ brands.device_count }} )
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    dataBrands() {
      return this.$store.state.dataHp.brands.data.data;
    },
  },
  methods: {
    fetchAPIBrands() {
      this.$store.dispatch("fetchBrands");
    },
    goToHp(index, slug) {
      console.log("Slug : ", slug);
      console.log("index : ", index);
      this.$router.push(`/home/${this.dataBrands[index].brand_name}`);
      this.$store.dispatch("fetchDataHp", slug);
    },
  },
  mounted() {
    this.fetchAPIBrands();
  },
};
</script>

<style scoped>
.custom-li {
  cursor: pointer;
}
</style>