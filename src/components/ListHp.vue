<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="(hp, index) in dataHp.data.phones" :key="index">
        <div class="card h-100" @click="detail(index, hp.slug)">
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
export default {
  computed: {
    dataHp() {
      return this.$store.state.dataHp.listHp.data;
    },
    dataCart() {
      return this.$store.state.dataHp.cart;
    },
  },
  methods: {
    fetchDataHp() {
      this.$store.dispatch("fetchDataHp");
    },
    async AddToCart(index) {
      this.$store.dispatch("InputIntoCart", {
        image: this.dataHp[index].image,
        phone_name: this.dataHp[index].phone_name,
      });
    },
    detail(index, slug) {
      console.log("Otw detail", this.dataHp.data.phones[index]);
      console.log("Slug : ", slug);
      this.$router.push(
        `/home/${this.dataHp.data.phones[index].brand}/${this.dataHp.data.phones[index].phone_name}`
      );
      this.$store.dispatch("updateDetailHp", slug);
    },
  },
  mounted() {
    this.fetchDataHp();
  },
};
</script>

<style>
</style>