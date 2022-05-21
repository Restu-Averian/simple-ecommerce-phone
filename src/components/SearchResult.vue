<template>
  <div class="container" style="margin: 120px auto">
    <vs-row>
      <Button
        ghost
        @click.native="$router.go(-1)"
        type="primary"
        icon="md-arrow-back"
        >Back</Button
      >
    </vs-row>
    <Divider
      ><h1 class="title is-3 is-size-5-mobile">
        {{ dataSearch.title }}
      </h1></Divider
    >
    <Alert type="error" show-icon v-if="KalauKosong !== ''">
      <p class="subtitle is-6 is-size-7-mobile">{{ KalauKosong }}</p>
    </Alert>
    <Alert type="error" show-icon v-if="kalauTimeOut !== ''">
      <h3 class="subtitle is-5 is-size-6-mobile">{{ kalauTimeOut }}</h3>
    </Alert>
    <vs-row ref="SearchData">
      <vs-col
        v-for="(hp, index) in dataSearch.phones"
        :key="index"
        vs-type="flex"
        vs-justify="space-between"
        vs-align="center"
        class="my-4 custom-li"
        :lg="3"
        :xs="6"
      >
        <Card style="width: 95%" @click.native="detail(index)">
          <div style="text-align: center">
            <img
              class="my-5"
              :src="hp.image"
              :alt="`latest-${index}`"
              style="width: 100px"
            />
            <h2 class="title mt-5 is-5 is-size-6-mobile">
              {{ hp.phone_name }}
            </h2>
          </div>
        </Card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataSearch: [],
      loading: "",
      KalauKosong: "",
      kalauTimeOut: "",
    };
  },
  methods: {
    async fetchSearch() {
      await axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/search?query=${this.$route.params.search}`
        )
        .then((result) => {
          // console.log("Resultnya : ", result.data.data);

          this.dataSearch = result.data.data;
          if (this.dataSearch.phones.length === 0) {
            this.KalauKosong = "Hasil pencarian tidak ada";
            console.log("ada ga ? ", this.KalauKosong);
          } else {
            this.KalauKosong = "";
          }
        })
        .catch((error) => {
          if (error.response.data.status === false) {
            this.KalauKosong = "";

            this.kalauTimeOut =
              "Maaf, request terhadap data terlalu banyak, mohon untuk tidak menggunakan web ini sekitar 1 menit";
          }
          console.log("awikwok:", error);
        });
    },
    detail(index) {
      this.$router.push(
        `/home/${this.dataSearch.phones[index].slug}/${this.dataSearch.phones[index].slug}`
      );
    },
  },
  mounted() {
    this.loading = this.$vs.loading({
      text: "Sedang mengambil data product, mohon tunggu sebentar...",
      target: this.$refs.SearchData,
    });
    this.fetchSearch();
    this.loading.close();
  },
  updated() {
    this.fetchSearch();
  },
};
</script>

<style>
</style>