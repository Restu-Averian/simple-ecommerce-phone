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
import axios from "axios";
export default {
  data() {
    return {
      dataBrands: [],
    };
  },

  methods: {
    fetchAPIBrands() {
      axios
        .get("https://api-mobilespecs.azharimm.site/v2/brands")
        .then((response) => {
          this.dataBrands = response.data.data;
        });
      // this.$store.dispatch("fetchBrands");
    },
    goToHp(index, slug) {
      console.log("Slug : ", slug);
      console.log("index : ", index);
      // console.log("dasda", this.dataBrands[index].brand_slug);
      this.$router.push(`/home/${this.dataBrands[index].brand_slug}`);
      // this.$store.dispatch("updateDataHp", slug);
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