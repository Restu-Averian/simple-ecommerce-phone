<template>
  <div class="my-6 center">
    <Divider><h1 class="title is-3">Latests</h1></Divider>

    <vs-row>
      <vs-col
        v-for="(latests, index) in dataLatests.slice(0, 8)"
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
            <h2 class="title mt-5 is-5">{{ latests.phone_name }}</h2>
          </template>
          <template #img>
            <img
              class="my-5"
              :src="latests.image"
              :alt="`latest-${index}`"
              style="width: 100px"
            />
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
    <vs-button flat active class="mx-auto">Show More</vs-button>
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
      axios
        .get("https://api-mobilespecs.azharimm.site/v2/latest")
        .then((result) => {
          this.dataLatests = result.data.data.phones;
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

<style>
</style>