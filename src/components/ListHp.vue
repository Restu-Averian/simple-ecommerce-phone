<template>
  <div class="container">
    <h2>{{ $route.params.list }}</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="(hp, index) in dataHp" :key="index">
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
// import gql from "graphql-tag";
// const ADD_TO_CART = gql(
//   `
// mutation MyMutation($objects: [cart_insert_input!]!) {
//   insert_cart(objects: $objects) {
//     returning {
//       id
//       image
//       phone_name
//     }
//   }
// }

//   `
// );
export default {
  computed: {
    dataHp() {
      return this.$store.state.dataHp.listHp.data.data.phones;
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
      // let a = await this.$apollo.mutate({
      //   mutation: ADD_TO_CART,
      //   variables: {
      //     objects: {
      //       image: this.dataHp[index].image,
      //       phone_name: this.dataHp[index].phone_name,
      //     },
      //   },
      // });
      this.$store.dispatch(
        "InputIntoCart",
        {
          image: this.dataHp[index].image,
          phone_name: this.dataHp[index].phone_name,
        }

        // a.data.insert_cart.returning[0]
      );
      // console.log("hasil mutate add : ", a.data.insert_cart.returning[0]);
      // console.log(a);
    },
    detail(index, slug) {
      console.log(this.dataHp[index].phone_name);
      console.log("Slug : ", slug);
      this.$router.push(
        `/home/${this.dataHp[index].brand}/${this.dataHp[index].phone_name}`
      );
      this.$store.dispatch("fetchDetailHp", slug);
    },
  },
  mounted() {
    this.fetchDataHp();
  },
};
</script>

<style>
</style>