<template>
  <div class="container mx-auto" style="margin: 120px auto">
    <vs-row>
      <vs-col
        :lg="4"
        :sm="6"
        :xs="12"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        w="4"
      >
        <image-detail-hp />
      </vs-col>
      <vs-col w="8" :lg="4" :sm="6" :xs="12">
        <phone-name-detail />
      </vs-col>
    </vs-row>
    <vs-row class="mt-5 mb-3">
      <Divider
        ><h1 class="title is-3 is-size-4-mobile">
          Deskripsi dan Review
        </h1></Divider
      >
    </vs-row>
    <Tabs>
      <TabPane label="Deskripsi">
        <deskripsi-detail />
      </TabPane>
      <TabPane label="Review"> <review-comp /> </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ImageDetailHp from "../components/ImageDetailHp.vue";
import PhoneNameDetail from "../components/PhoneNameDetail.vue";
import DeskripsiDetail from "../components/DeskripsiDetail.vue";
import ReviewComp from "../components/ReviewComp.vue";

export default {
  components: {
    ImageDetailHp,
    PhoneNameDetail,
    DeskripsiDetail,
    ReviewComp,
  },
  data() {
    return {};
  },

  methods: {},
  mounted() {},
};
</script>

<style>
</style>