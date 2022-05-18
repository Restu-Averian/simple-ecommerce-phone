<template>
  <div class="my-6">
    <Divider><h1 class="title is-3 is-size-4-mobile">Brands</h1></Divider>

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
        <Card
          style="width: 95%"
          @click.native="goToHp(index, brands.brand_slug)"
        >
          <div style="text-align: center">
            <h2 class="title is-3 is-size-5-mobile">{{ brands.brand_name }}</h2>
            <p class="subtitle is-5 is-size-6-mobile">
              {{ brands.device_count }} Devices
            </p>
          </div>
        </Card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col class="my-3">
        <Button type="primary" to="/brands" size="large">Show More</Button>
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