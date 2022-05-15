<template>
  <div style="margin: 120px 0px">
    <Divider><h1 class="title is-3">Brands</h1></Divider>

    <vs-row>
      <vs-col
        v-for="(brands, index) in dataBrands"
        :key="index"
        vs-type="flex"
        vs-justify="space-between"
        vs-align="center"
        class="my-5 custom-li"
        :lg="4"
        :sm="6"
        :xs="12"
      >
        <vs-card
          class="mx-auto"
          style="width: 220px"
          @click="goToHp(index, brands.brand_slug)"
        >
          <template #title>
            <h1 class="title is-3">{{ brands.brand_name }}</h1>
          </template>

          <template #text>
            <p class="subtitle is-5">{{ brands.device_count }} Devices</p>
          </template>
          <template #interactions>
            <vs-button danger icon>
              <i class="bx bx-heart"></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <i class="bx bx-chat"></i>
              <span class="span"> 54 </span>
            </vs-button>
          </template>
        </vs-card>
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