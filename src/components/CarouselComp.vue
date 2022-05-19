<template>
  <Carousel
    v-model="value3"
    :autoplay="setting.autoplay"
    :autoplay-speed="setting.autoplaySpeed"
    :dots="setting.dots"
    :radius-dot="setting.radiusDot"
    :trigger="setting.trigger"
    :arrow="setting.arrow"
    style="margin: 120px 0 60px"
  >
    <CarouselItem
      v-for="(url, index) in imgCarousels"
      :key="index"
      @click.native="goTo(index)"
      class="carouselImage"
    >
      <div class="demo-carousel">
        <img :src="url" alt="" />
      </div>
    </CarouselItem>
  </Carousel>
</template>

<script>
export default {
  data() {
    return {
      value3: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: "inside",
        radiusDot: false,
        trigger: "click",
        arrow: "hover",
      },
      imgCarousels: [
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1652895391/List%20Photo%20Untuk%20Mini%20Project/Carousel_1_sucna3.png",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1652927007/List%20Photo%20Untuk%20Mini%20Project/Carousel_2_xy58ty.png",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1652927007/List%20Photo%20Untuk%20Mini%20Project/Carousel_3_tzebcw.png",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1652927006/List%20Photo%20Untuk%20Mini%20Project/Carousel_4_zjsng3.png",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1652927009/List%20Photo%20Untuk%20Mini%20Project/Carousel_5_u3qcoc.png",
      ],
    };
  },
  methods: {
    goTo(index) {
      if (index === 0) {
        this.$router.push(
          "home/xiaomi_redmi_note_10_pro_max-10770/xiaomi_redmi_note_10_pro_max-10770"
        );
      } else if (index === 1) {
        this.$router.push("home/vivo_x80_pro-11407/vivo_x80_pro-11407");
      } else if (index === 2) {
        this.$router.push(
          "home/infinix_note_12_vip-11527/infinix_note_12_vip-11527"
        );
      } else if (index === 3) {
        this.$router.push(
          "home/zte_axon_40_ultra-11510/zte_axon_40_ultra-11510"
        );
      } else if (index === 4) {
        this.$router.push("home/vivo_iqoo_z6_pro-11501/vivo_iqoo_z6_pro-11501");
      }
    },
  },
};
</script>
<style>
.carouselImage {
  cursor: pointer;
}
</style>