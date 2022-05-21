<template>
  <div style="margin: 120px auto" class="container">
    <vs-row>
      <Button
        ghost
        @click.native="$router.go(-1)"
        type="primary"
        icon="md-arrow-back"
        >Back</Button
      >
    </vs-row>
    <Divider><h1 class="title is-3">Latests</h1></Divider>
    <vs-row ref="contentLatest">
      <vs-col
        v-for="(latests, index) in dataLatests"
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataLatests: [],
    };
  },
  methods: {
    fetchDataLatests() {
      let loading = this.$vs.loading({
        text: "Sedang mengambil data Latest Hp, mohon tunggu sebentar...",
        target: this.$refs.contentLatest,
      });
      axios
        .get("https://api-mobilespecs.azharimm.site/v2/latest")
        .then((result) => {
          this.dataLatests = result.data.data.phones;
          loading.close();
        });
    },
    detail(index) {
      console.log("tes : ", this.dataLatests);
      this.$router.push(
        `/home/${this.dataLatests[index].slug}/${this.dataLatests[index].slug}`
      );
    },
  },
  mounted() {
    this.fetchDataLatests();
  },
};
</script>