<template>
  <vs-col>
    <Modal v-model="isImageModalActive" footer-hide>
      <template #header>
        <h4 class="title is-4">
          {{ imageDetail.phone_name }}
        </h4>
      </template>
      <img
        :src="imageDetail.thumbnail"
        class="img-fluid p-2"
        alt=""
        style="width: 300px"
        @click="isImageModalActive = true"
      />
      <template #footer> </template>
    </Modal>
    <vs-row>
      <figure class="image">
        <img
          :src="imageDetail.thumbnail"
          class="img-fluid p-2"
          alt=""
          style="width: 300px"
          @click="isImageModalActive = true"
        />
      </figure>
    </vs-row>

    <vs-row>
      <Modal v-model="isImageModalThumbnailActive" footer-hide>
        <template #header>
          <h4 class="title is-4">
            {{ imageDetail.phone_name }}
          </h4>
        </template>
        <img
          :src="gambar"
          class="img-fluid border p-2 imgThumbnail"
          alt=""
          style="width: 300px"
        />
      </Modal>
      <vs-col
        v-for="(phoneImages, i) in imageDetail.phone_images"
        :key="i"
        w="3"
      >
        <figure class="image is-1by1 border mr-3 my-5">
          <img :src="phoneImages" @click="showUpModal(i)" class="border p-2" />
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
      isImageModalActive: false,
      isImageModalThumbnailActive: false,
      gambar: "",
    };
  },
  methods: {
    showUpModal(index) {
      this.isImageModalThumbnailActive = true;
      this.gambar = this.imageDetail.phone_images[index];
      console.log("Gambar yang diliat : ", this.gambar);
    },
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
.ivu-modal-body {
  text-align: center;
}
.image {
  cursor: pointer;
}
</style>