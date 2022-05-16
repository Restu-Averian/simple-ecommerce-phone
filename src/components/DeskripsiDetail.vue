<template>
  <section class="my-6">
    <vs-row class="my-4" justify="space-between">
      <vs-col w="4">
        <h2 class="title is-4 has-text-info has-text-left">Released Date</h2>
      </vs-col>
      <vs-col w="3">
        <vs-row
          v-for="(rdate, i) in dataDetail.specifications[1].specs"
          :key="i"
        >
          <vs-col w="12">
            <h4 class="title is-5 has-text-left mb-3">{{ rdate.key }}</h4>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="5">
        <vs-row
          v-for="(rdate, i) in dataDetail.specifications[1].specs"
          :key="i"
          ><vs-col w="12">
            <p class="subtitle is-6 mb-3">
              {{ rdate.val[0] }}
            </p>
          </vs-col></vs-row
        >
      </vs-col>
    </vs-row>

    <!-- Platform -->
    <Divider />

    <vs-row class="my-5 mx-auto has-text-centered" justify="space-between">
      <vs-col w="4">
        <h2 class="title is-4 has-text-info has-text-left">Platform</h2>
      </vs-col>
      <vs-col w="3">
        <vs-row
          v-for="(jdlPlatform, i) in dataDetail.specifications[4].specs"
          :key="i"
        >
          <vs-col w="12">
            <h4 class="title is-5 has-text-left mb-3">{{ jdlPlatform.key }}</h4>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="5">
        <vs-row
          v-for="(platform, i) in dataDetail.specifications[4].specs"
          :key="i"
        >
          <vs-col w="12">
            <p class="subtitle is-6 mb-3">
              {{ platform.val[0] }}
            </p>
          </vs-col></vs-row
        >
      </vs-col>
    </vs-row>

    <!-- Memory -->
    <Divider />

    <vs-row class="my-5 mx-auto has-text-centered" justify="space-between">
      <vs-col w="4">
        <h2 class="title is-4 has-text-info has-text-left">Memory</h2>
      </vs-col>
      <vs-col w="3">
        <vs-row
          v-for="(jdlMemory, i) in dataDetail.specifications[5].specs"
          :key="i"
        >
          <vs-col w="12">
            <h4 class="title is-5 has-text-left mb-3">{{ jdlMemory.key }}</h4>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="5">
        <vs-row
          v-for="(memory, i) in dataDetail.specifications[5].specs"
          :key="i"
        >
          <vs-col w="12">
            <p class="subtitle is-6 mb-3">
              {{ memory.val[0] }}
            </p>
          </vs-col></vs-row
        >
      </vs-col>
    </vs-row>

    <!-- Main Camera -->
    <Divider />

    <vs-row class="my-5 mx-auto has-text-centered" justify="space-between">
      <vs-col w="4">
        <h2 class="title is-4 has-text-info has-text-left">Main Camera</h2>
      </vs-col>
      <vs-col w="3">
        <vs-row
          v-for="(jdlMainCamera, i) in dataDetail.specifications[6].specs"
          :key="i"
        >
          <vs-col w="12">
            <h4 class="title is-5 has-text-left mb-3">
              {{ jdlMainCamera.key }}
            </h4>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="5">
        <vs-row
          v-for="(mainCamera, i) in dataDetail.specifications[6].specs"
          :key="i"
        >
          <vs-col w="12">
            <p class="subtitle is-6 mb-3">
              {{ mainCamera.val[0] }}
            </p>
          </vs-col></vs-row
        >
      </vs-col>
    </vs-row>

    <!-- Selfie Camera  -->
    <Divider />

    <vs-row class="my-5 mx-auto has-text-centered" justify="space-between">
      <vs-col w="4">
        <h2 class="title is-4 has-text-info has-text-left">Selfie Camera</h2>
      </vs-col>
      <vs-col w="3">
        <vs-row
          v-for="(jdlSelfieCamera, i) in dataDetail.specifications[7].specs"
          :key="i"
        >
          <vs-col w="12">
            <h4 class="title is-5 has-text-left mb-3">
              {{ jdlSelfieCamera.key }}
            </h4>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="5">
        <vs-row
          v-for="(selfieCamera, i) in dataDetail.specifications[7].specs"
          :key="i"
        >
          <vs-col w="12">
            <p class="subtitle is-6 mb-3">
              {{ selfieCamera.val[0] }}
            </p>
          </vs-col></vs-row
        >
      </vs-col>
    </vs-row>

    <!-- Display -->
    <Divider />

    <vs-row class="my-5 mx-auto has-text-centered" justify="space-between">
      <vs-col w="4">
        <h2 class="title is-4 has-text-info has-text-left">Display</h2>
      </vs-col>
      <vs-col w="3">
        <vs-row
          v-for="(jdlDisplay, i) in dataDetail.specifications[3].specs"
          :key="i"
        >
          <vs-col w="12">
            <h4 class="title is-5 has-text-left mb-3">
              {{ jdlDisplay.key }}
            </h4>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="5">
        <vs-row
          v-for="(display, i) in dataDetail.specifications[3].specs"
          :key="i"
        >
          <vs-col w="12">
            <p class="subtitle is-6 mb-3">
              {{ display.val[0] }}
            </p>
          </vs-col></vs-row
        >
      </vs-col>
    </vs-row>

    <!-- Battery -->
    <Divider />

    <vs-row class="my-5 mx-auto has-text-centered" justify="space-between">
      <vs-col w="4">
        <h2 class="title is-4 has-text-info has-text-left">Battery</h2>
      </vs-col>
      <vs-col w="3">
        <vs-row
          v-for="(jdlBattery, i) in dataDetail.specifications[11].specs"
          :key="i"
        >
          <vs-col w="12">
            <h4 class="title is-5 has-text-left mb-3">
              {{ jdlBattery.key }}
            </h4>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="5">
        <vs-row
          v-for="(battery, i) in dataDetail.specifications[11].specs"
          :key="i"
        >
          <vs-col w="12">
            <p class="subtitle is-6 mb-3">
              {{ battery.val[0] }}
            </p>
          </vs-col></vs-row
        >
      </vs-col>
    </vs-row>

    <!-- Network -->
    <Divider />

    <vs-row class="my-5 mx-auto has-text-centered" justify="space-between">
      <vs-col w="4">
        <h2 class="title is-4 has-text-info has-text-left">Network</h2>
      </vs-col>
      <vs-col w="3">
        <vs-row
          v-for="(jdlNetwork, i) in dataDetail.specifications[0].specs"
          :key="i"
        >
          <vs-col w="12">
            <h4 class="title is-5 has-text-left mb-3">
              {{ jdlNetwork.key }}
            </h4>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="5">
        <vs-row
          v-for="(network, i) in dataDetail.specifications[0].specs"
          :key="i"
        >
          <vs-col w="12">
            <p class="subtitle is-6 mb-3">
              {{ network.val[0] }}
            </p>
          </vs-col></vs-row
        >
      </vs-col>
    </vs-row>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataDetail: [],
    };
  },
  methods: {
    fetchDataDetail() {
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/${this.$route.params.detail}`
        )
        .then((response) => {
          console.log("hasil : ", response.data.data);
          this.dataDetail = response.data.data;
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