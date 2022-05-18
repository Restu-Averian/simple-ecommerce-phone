<template>
  <Carousel
    v-model="value3"
    :autoplay="setting.autoplay"
    :autoplay-speed="setting.autoplaySpeed"
    :dots="setting.dots"
    :radius-dot="setting.radiusDot"
    :trigger="setting.trigger"
    :arrow="setting.arrow"
    style="margin: 120px 0"
  >
    <CarouselItem v-for="(url, index) in imgCarousels" :key="index">
      <div class="demo-carousel">
        <img :src="url" alt="" style="width: 500px" />
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
        "https://fdn.gsmarena.com/imgroot/news/22/05/sony-xperia-10-iv-ifr/-1220x526/gsmarena_000.jpg",
        "https://cdn.pocket-lint.com/r/s/1201x/assets/images/161057-phones-news-vs-sony-xperia-10-iv-vs-xperia-10-iii-what-s-the-difference-image1-ig6ajxmkcy.jpg",
      ],
    };
  },
};
</script>