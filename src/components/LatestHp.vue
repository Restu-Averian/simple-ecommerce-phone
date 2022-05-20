<template>
  <div class="my-6 center">
    <Divider><h1 class="title is-3 is-size-4-mobile">Latests</h1></Divider>
    <h3 class="subtitle is-5 is-size-6-mobile">{{ kalauError }}</h3>
    <vs-row ref="contentLatest">
      <vs-col
        v-for="(latests, index) in dataLatests.slice(0, 8)"
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
              :src="latests.image"
              :alt="`latest-${index}`"
              style="width: 100px"
            />
            <h2 class="title mt-5 is-5 is-size-6-mobile">
              {{ latests.phone_name }}
            </h2>
          </div>
        </Card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col class="my-3">
        <Button type="primary" to="/Latest" size="large">Show More</Button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataLatests: [],
      kalauError: "",
    };
  },
  methods: {
    fetchDataLatests() {
      let loading = this.$vs.loading({
        text: "Sedang mengambil data Latest Hp, mohon tunggu sebentar",
        target: this.$refs.contentLatest,
      });
      axios
        .get("https://api-mobilespecs.azharimm.site/v2/latest")
        .then((result) => {
          this.dataLatests = result.data.data.phones;
          loading.close();
        })
        .catch((error) => {
          if (error.response.data.status == false) {
            this.kalauError =
              "Maaf, request terhadap data terlalu banyak, mohon untuk tidak menggunakan web ini sekitar 1 menit";
          }
          console.log("Error : ", error.response.data);
        });
    },
    detail(index) {
      console.log("tes : ", this.dataLatests);
      this.$router.push(
        `/home/${this.dataLatests[index].slug}/${this.dataLatests[index].slug}`
      );
    },
    goTo(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    this.fetchDataLatests();
  },
};
</script>

<style>
</style>