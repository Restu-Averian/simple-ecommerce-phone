<template>
  <div class="container">
    <h1>Cart</h1>
    <div class="row my-5" v-for="(cart, index) in dataCart" :key="cart.id">
      <div class="col-3">
        <img :src="cart.image" alt="" class="w-50" />
      </div>

      <div class="col-6 text-start">
        <h3 @click="detail(index)" class="phone-name">{{ cart.phone_name }}</h3>
        <p>Kuantitas : {{ cart.quantity }}</p>
        <h4>Rp {{ cart.price }}</h4>
      </div>
      <div class="col-3">
        <button class="btn btn-danger" @click="deleteCart(cart.id)">
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const SubscriptionCart = gql(
  `
  subscription MySubscription($_eq: Int!) {
  cart(where: {id_userName: {_eq: $_eq}}) {
    id
    id_userName
    image
    quantity
    phone_slug
    phone_name
    price
  }
}


  `
);
const DELETE_CART = gql(
  `
  mutation MyMutation($id: Int!) {
  delete_cart_by_pk(id: $id) {
    id_userName
  }
}

  `
);
let users = JSON.parse(localStorage.getItem("dataHp"));

export default {
  data() {
    return {
      dataCart: [],
    };
  },

  apollo: {
    $subscribe: {
      dataCart: {
        query: SubscriptionCart,
        variables() {
          return {
            _eq: users.dataHp.UserLogin.id,
          };
        },
        result({ data }) {
          console.log(data.cart);
          this.dataCart = data.cart;
        },
      },
    },
  },
  methods: {
    detail(index) {
      console.log(this.dataCart[index]);

      this.$router.push(
        `/home/${this.dataCart[index].phone_slug}/${this.dataCart[index].phone_slug}`
      );
    },
    deleteCart(index) {
      let a = confirm("Yakin untuk hapus ?");
      if (a) {
        this.$apollo.mutate({
          mutation: DELETE_CART,
          variables: {
            id: index,
          },
        });
      }
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

<style scoped>
.phone-name {
  cursor: pointer;
}
</style>