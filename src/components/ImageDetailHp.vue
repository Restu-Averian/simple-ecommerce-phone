<template>
  <vs-col>
    <vs-row>
      <figure class="image">
        <img
          :src="imageDetail.thumbnail"
          class="border p-2"
          alt=""
          style="width: 300px"
        />
      </figure>
    </vs-row>

    <vs-row>
      <vs-col
        v-for="(phoneImages, i) in imageDetail.phone_images"
        :key="i"
        w="3"
      >
        <figure class="image is-1by1 border mr-3 my-5">
          <img :src="phoneImages" class="border p-2" />
        </figure>
      </vs-col>
    </vs-row>
  </vs-col>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      imageDetail: [],
    };
  },
  methods: {
    fetchDataDetail() {
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/${this.$route.params.detail}`
        )
        .then((response) => {
          console.log("hasil imageDetail: ", response);
          this.imageDetail = response.data.data;
        });
    },
  },
  mounted() {
    this.fetchDataDetail();
  },
};
</script>

<style>
</style>