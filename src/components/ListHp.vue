<template>
  <div class="container" style="margin: 120px 0px">
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
      ><h1 class="title is-3 is-size-4-mobile">{{ dataHp.title }}</h1></Divider
    >
    <vs-row ref="listHp">
      <vs-col
        v-for="(hp, index) in dataHp.phones"
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
      dataHp: [],
    };
  },
  methods: {
    fetchDataHp() {
      let loading = this.$vs.loading({
        text: "Sedang mengambil data barang, mohon tunggu sebentar...",
        target: this.$refs.listHp,
      });
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/brands/${this.$route.params.list}`
        )
        .then((response) => {
          this.dataHp = response.data.data;
          loading.close();
        });
    },

    detail(index) {
      this.$router.push(
        `/home/${this.dataHp.phones[index].slug}/${this.dataHp.phones[index].slug}`
      );
    },
  },
  mounted() {
    this.fetchDataHp();
  },
};
</script>

<style>
</style>