<template>
  <div class="container">
    {{ checkout }}
    <h1>Cart</h1>
    <div class="alert alert-primary" v-if="dataCart.length === 0">
      {{ messageIfEmptyCart }}
    </div>

    <div
      class="form-check row my-5"
      v-for="(cart, index) in dataCart"
      :key="cart.id"
    >
      <div class="col-8">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="checkout"
          :checked="check"
          :value="cart.id"
          @click="AddToCheckout(cart.id)"
          required
          :id="index"
        />

        <label class="form-check-label" :for="index">
          <div class="col-3">
            <img :src="cart.image" alt="" class="w-50" />
          </div>
          <div class="col-6 text-start">
            <h3 @click="detail(index)" class="phone-name">
              {{ cart.phone_name }}
            </h3>
            <p>Kuantitas : {{ cart.quantity }}</p>
            <h4>Rp {{ cart.price }}</h4>
          </div>
        </label>
      </div>
      <div class="col-4">
        <button class="btn btn-danger" @click="deleteCart(cart.id)">
          Hapus
        </button>
      </div>
    </div>
    <button
      class="btn btn-outline-primary"
      :disabled="disabel"
      @click="ProceedToCheckout"
    >
      Proceed To Checkout
    </button>
  </div>
</template>

<script>
import gql from "graphql-tag";

const SubscriptionCart = gql(
  `
  subscription MySubscription($_eq: Int!) {
  cart(order_by: {id: desc},where: {id_userName: {_eq: $_eq}}) {
    id
    id_userName
    image
    quantity
    phone_slug
    phone_name
    price
    IsCheckout
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

const UpdateIsCheckout = gql(
  `
  mutation MyMutation($_eq: Int!, $IsCheckout: Boolean!, $_eq1: Int!) {
  update_cart(where: {id_userName: {_eq: $_eq}, id: {_eq: $_eq1}}, _set: {IsCheckout: $IsCheckout}) {
    returning {
      IsCheckout
      id
      id_userName
      image
      quantity
      price
      phone_slug
      phone_name
    }
  }
}

  `
);

// const GET_DATA_FROM_CART = gql(
//   `
//   query MyQuery($_eq: Int!, $_eq1: Int!) {
//   cart(where: {id_userName: {_eq: $_eq}, id: {_eq: $_eq1}}, order_by: {id: desc}) {
//     IsCheckout
//     id
//     id_userName
//     image
//     phone_name
//     phone_slug
//     price
//   }
// }

//   `
// );
let users = JSON.parse(localStorage.getItem("dataHp"));

export default {
  data() {
    return {
      dataCart: [],
      checkout: [],
      check: false,
      messageIfEmptyCart: "",
      disabel: true,
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
          if (data.cart.length === 0) {
            this.messageIfEmptyCart = "Masih kosong";
          } else {
            this.dataCart = data.cart;
          }
        },
      },
    },
  },

  methods: {
    GantiDisable() {
      if (this.check == false) {
        this.disabel = true;
      } else if (this.check == true) {
        this.disabel = false;
      }
    },
    ProceedToCheckout() {
      this.$router.push("/checkout");
    },
    // async IsChecked(index) {
    //   let hasilQuery = await this.$apollo.query({
    //     query: GET_DATA_FROM_CART,
    //     variables: {
    //       _eq: users.dataHp.UserLogin.id,
    //       _eq1: index,
    //     },
    //   });
    //   console.log("Hasil Query : ", hasilQuery);
    //   if (hasilQuery.data.cart[index].IsCheckout === true) {
    //     console.log("Index di true : ", index);
    //     console.log("Iko true aaa");
    //     this.check = true;
    //   } else if (hasilQuery.data.cart[index].IsCheckout === false) {
    //     console.log("Index di false : ", index);
    //     console.log("Iko falseeee aaa");
    //     this.check = false;
    //   }
    // },
    AddToCheckout(cartId) {
      console.log("id cart : ", cartId);
      let Users = JSON.parse(localStorage.getItem("dataHp"));

      if (!this.checkout.includes(cartId)) {
        this.$apollo.mutate({
          mutation: UpdateIsCheckout,
          variables: {
            _eq: Users.dataHp.UserLogin.id,
            _eq1: cartId,
            IsCheckout: true,
          },
        });

        this.check = true;
        alert(
          "Udh berhasil masuk ke checkout dan kondisi this.check adalah true"
        );
      } else {
        this.$apollo.mutate({
          mutation: UpdateIsCheckout,
          variables: {
            _eq: Users.dataHp.UserLogin.id,
            _eq1: cartId,
            IsCheckout: false,
          },
        });

        this.check = false;
        alert(
          "Udh berhasil masuk ke checkout dan kondisi this.check adalah false"
        );
      }
      console.log("Kondisi check : ", this.check);
    },

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
    if (!users) {
      alert("Belum login");
      this.$router.push("/login");
    }
  },
  updated() {
    this.GantiDisable();
  },
};
</script>

<style scoped>
.phone-name {
  cursor: pointer;
}
</style>