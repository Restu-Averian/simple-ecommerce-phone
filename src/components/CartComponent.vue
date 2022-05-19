<template>
  <section class="my-5">
    <vs-row v-for="(cart, index) in dataCart" :key="index" class="mb-3">
      <vs-col w="3">
        <img :src="cart.image" alt="" />
      </vs-col>
      <vs-col w="6" class="has-text-left">
        <vs-row @click.native="detail(index)" class="productName">
          <vs-col w="12">
            <h3 class="title is-3">{{ cart.phone_name }}</h3>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col w="6">
            <Input v-model="cart.quantity" class="has-text-centred">
              <template #prepend>
                <Button
                  icon="md-remove"
                  @click.native="decrement(index, 'top-center', 'danger', 2000)"
                ></Button>
              </template>
              <template #append>
                <Button icon="md-add" @click.native="increment(index)"></Button>
              </template>
            </Input>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="3">
        <vs-row>
          <vs-col w="12">
            <h4 class="title is-4">
              Rp {{ (totalPrice[index] = cart.price * cart.quantity) }}
            </h4>
            <Button @click.native="ChangePrice(index)">Change Price</Button>
          </vs-col>
          <vs-col w="12">
            <Button
              size="large"
              type="error"
              @click.native="deleteCart(cart.id)"
              icon="ios-trash-outline"
              ghost
            ></Button>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <Button type="primary" @click.native="ProceedToCheckout"
      >Add Checkout</Button
    >
  </section>
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

const UpdatePrice = gql(
  `
    mutation MyMutation($price: Int!, $_eq: Int!, $_eq1: Int!, $quantity: Int!) {
  update_cart(where: {id_userName: {_eq: $_eq}, id: {_eq: $_eq1}}, _set: {price: $price, quantity: $quantity}) {
    returning {
      id
      id_userName
      image
      phone_name
      phone_slug
      price
      quantity
    }
  }
}


    `
);
let users = JSON.parse(localStorage.getItem("dataHp"));

export default {
  data() {
    return {
      dataCart: [],
      totalPrice: [],
    };
  },
  computed: {
    dataUser() {
      return this.$store.state.dataHp.UserLogin;
    },
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
          this.dataCart = data.cart;
        },
      },
    },
  },

  methods: {
    decrement(index, position = null, color, duration) {
      if (this.dataCart[index].quantity === 1) {
        this.$vs.notification({
          color,
          duration,
          progress: "auto",
          position,
          title: "Tidak bisa 0",
          text: "Quantity yang dimasukkan tidak bisa lebih kecil dari 1",
        });
      } else {
        let qty = (this.dataCart[index].quantity -= 1);
        console.log("Quantity dikurangi : ", qty);
      }
    },
    increment(index) {
      let qty = (this.dataCart[index].quantity += 1);

      console.log("Quantity ditambah : ", qty);
    },
    async ChangePrice(cartId) {
      console.log("dataCart : ", this.dataCart[cartId]);
      console.log("dataCart : ", this.dataCart[cartId]);
      console.log("price : ", this.totalPrice);
      console.log("Data User : ", this.dataUser.id);
      let hasilQuery = await this.$apollo.mutate({
        mutation: UpdatePrice,
        variables: {
          price: this.totalPrice[cartId],
          _eq: this.dataUser.id,
          _eq1: this.dataCart[cartId].id,
          quantity: this.dataCart[cartId].quantity,
        },
      });
      console.log("Hasil ganti harga : ", hasilQuery);
    },
    ProceedToCheckout() {
      this.$router.push("/checkout");
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
};
</script>

<style scoped>
.productName {
  cursor: pointer;
}
</style>