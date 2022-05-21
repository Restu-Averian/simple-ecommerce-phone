<template>
  <section>
    <Divider><h1 class="title is-3 is-size-4-mobile">Brands</h1></Divider>
    <Alert type="error" show-icon v-if="kalauError !== ''">
      <h3 class="subtitle is-5 is-size-6-mobile">{{ kalauError }}</h3>
    </Alert>
    <vs-row ref="contentBrands">
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
      <vs-row>
        <vs-col class="my-3">
          <Button type="primary" to="/brands" size="large">Show More</Button>
        </vs-col>
      </vs-row>
    </vs-row>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataBrands: [],
      kalauError: "",
    };
  },

  methods: {
    fetchAPIBrands() {
      let loading = this.$vs.loading({
        text: "Fetching brands data",
        target: this.$refs.contentBrands,
      });
      axios
        .get("https://api-mobilespecs.azharimm.site/v2/brands")
        .then((response) => {
          this.dataBrands = response.data.data;
          loading.close();
        })
        .catch((error) => {
          if (error.response.data.status == false) {
            this.kalauError =
              "Maaf, request terhadap data terlalu banyak, mohon untuk tidak menggunakan web ini sekitar 1 menit";
          } else {
            this.kalauError = "";
          }
          console.log("Error : ", error.response.data);
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