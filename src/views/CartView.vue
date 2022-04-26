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
          <!-- <div class="card-footer">
            <button class="btn btn-primary" @click="AddToCart(index)">
              Add to Cart
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <!-- {{ dataCart }} -->
    <!-- <ApolloQuery
      :query="
        (gql) =>
          gql(
            `
        query MyQuery {
          cart {
            id
            image
            phone_name
          }
        }
        `
          )
      "
    >
      <template v-slot="{ result: { data, error } }">
        <div v-if="error">Lemes bestie, errornya : {{ error }}</div>
        <div v-else-if="data">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="cart in data.cart" :key="cart.id">
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
        <div v-else>Sabar bestie...Data lagi diambil</div>
      </template>
    </ApolloQuery> -->
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
};
</script>

<style>
</style>