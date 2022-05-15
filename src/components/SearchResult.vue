<template>
  <div class="container" style="margin: 120px auto">
    <Divider
      ><h1 class="title is-3">{{ dataSearch.title }}</h1></Divider
    >

    <vs-row>
      <vs-col
        v-for="(hp, index) in dataSearch.phones"
        :key="index"
        vs-type="flex"
        vs-justify="space-between"
        vs-align="center"
        class="my-4 custom-li"
        :lg="3"
        :sm="6"
        :xs="12"
      >
        <vs-card style="width: 220px" class="mx-auto" @click="detail(index)">
          <template #text>
            <h2 class="title mt-5 is-5">{{ hp.phone_name }}</h2>
          </template>
          <template #img>
            <img
              class="my-5"
              :src="hp.image"
              :alt="`latest-${index}`"
              style="width: 100px"
            />
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
      dataSearch: [],
    };
  },
  methods: {
    fetchSearch() {
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/search?query=${this.$route.params.search}`
        )
        .then((result) => {
          // console.log("Resultnya : ", result.data.data);
          this.dataSearch = result.data.data;
        });
    },
    detail(index) {
      this.$router.push(
        `/home/${this.dataSearch.phones[index].slug}/${this.dataSearch.phones[index].slug}`
      );
    },
  },
  mounted() {
    this.fetchSearch();
  },
  updated() {
    this.fetchSearch();
  },
};
</script>

<style>
</style>