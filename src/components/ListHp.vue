<template>
  <div class="container">

    <h1>{{ dataHp.title }}</h1>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="(hp, index) in dataHp.phones" :key="index">
        <div class="card h-100" @click="detail(index)">
          <img
            :src="hp.image"
            class="card-img-top m-auto w-50"
            :alt="`produk ke-${index}`"
          />
          <div class="card-body">
            <h5 class="card-title">{{ hp.phone_name }}</h5>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary" @click="AddToCart(index)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
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
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/brands/${this.$route.params.list}`
        )
        .then((response) => {
          this.dataHp = response.data.data;
        });
     
   
    },
    // async AddToCart(index) {
    //   this.$store.dispatch("InputIntoCart", {
    //     image: this.dataHp[index].image,
    //     phone_name: this.dataHp[index].phone_name,
    //   });
    // },
    detail(index) {
      // console.log("Otw detail", this.dataHp.phones[index]);
      // console.log("Slug : ", slug);
      this.$router.push(
        `/home/${this.dataHp.phones[index].slug}/${this.dataHp.phones[index].slug}`
      );
      // this.$store.dispatch("updateDetailHp", slug);
    },
  },
  mounted() {
    this.fetchDataHp();
  },
};
</script>

<style>
</style>