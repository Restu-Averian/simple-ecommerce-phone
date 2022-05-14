<template>
  <div class="my-6">
    <Divider><h1 class="title is-3">Brands</h1></Divider>
    <vs-row>
      <vs-col
        v-for="(brands, index) in dataBrands.slice(0, 6)"
        :key="index"
        vs-type="flex"
        vs-justify="space-between"
        vs-align="center"
        class="my-5 custom-li"
        :lg="4"
        :xs="6"
      >
        <div @click="goToHp(index, brands.brand_slug)">
          <h4 class="title is-3">
            {{ brands.brand_name }}
          </h4>
          <p class="subtitle is-5">{{ brands.device_count }} Devices</p>
        </div>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col>
        <vs-button active flat class="mx-auto">Show More</vs-button>
      </vs-col>
    </vs-row>
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
    },
    goToHp(index, slug) {
      console.log("Slug : ", slug);
      console.log("index : ", index);
      this.$router.push(`/home/${this.dataBrands[index].brand_slug}`);
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