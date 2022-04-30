<template>
  <div class="container">
    <h1>Cart</h1>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="(cart, index) in dataCart" :key="index">
        <button class="btn btn-danger" @click="deleteCart(index)">Hapus</button>
        <div class="card h-100">
          <img
            :src="cart.image"
            class="card-img-top m-auto w-50"
            :alt="`produk ke-${cart.id}`"
          />
          <div class="card-body">
            <h5 class="card-title">{{ cart.phone_name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dataCart() {
      return this.$store.state.dataHp.cart;
    },
  },
  methods: {
    deleteCart(index) {
      this.$store.dispatch("deleteCart", index);
    },
  },
  mounted() {
    let users = localStorage.getItem("dataHp");
    if (users) {
      this.$router.push("/cart");
    } else {
      alert("Belum login");
      this.$router.push("/login");
    }
  },
};
</script>

<style>
</style>