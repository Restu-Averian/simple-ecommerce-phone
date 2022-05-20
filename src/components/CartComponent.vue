<template>
  <section class="my-5" ref="contentCart">
    <template v-if="countCart === 0">
      <vs-row>
        <vs-col w="12">
          <img
            src="../assets/undraw_empty_cart_co35.svg"
            alt=""
            width="208px"
          />
        </vs-col>
      </vs-row>
      <vs-row class="my-5">
        <vs-col w="12">
          <h4 class="title is-3 is-size-4-mobile">Cart Kosong</h4>
          <h4 class="subtitle is-6 has-text-grey-light is-size-7-mobile">
            Yuk mulai berbelanja bisa dengan klik tombol di bawah
          </h4>
          <Button type="primary" to="/brands">Mulai Belanja</Button>
        </vs-col>
      </vs-row>
    </template>
    <template v-else-if="countCart !== 0">
      <vs-row
        v-for="(cart, index) in dataCart"
        :key="cart.id"
        align="center"
        justify="space-around"
        class="mb-6"
      >
        <vs-col :lg="3" :xs="2" class="ml-2">
          <img :src="cart.image" alt="" class="img-fluid" />
        </vs-col>
        <vs-col :lg="4" :xs="5" class="has-text-left">
          <vs-row @click.native="detail(index)" class="productName mb-3">
            <vs-col w="12">
              <h3 class="title is-3 is-size-5-mobile">
                {{ cart.phone_name }}
              </h3>
            </vs-col>
          </vs-row>

          <vs-row class="mb-3">
            <vs-col w="12">
              <h4 class="subtitle is-5 is-size-7-mobile">
                Rp {{ (totalPrice[index] = cart.price * cart.quantity) }}
                <Button
                  @click.native="ChangePrice(index)"
                  size="small"
                  type="primary"
                  ghost
                  >Change
                </Button>
              </h4>
            </vs-col>
          </vs-row>

          <vs-row>
            <vs-col :lg="6" :xs="12">
              <Input v-model="cart.quantity" readonly class="has-text-centred">
                <template #prepend>
                  <Button
                    icon="md-remove"
                    @click.native="decrement(index)"
                    size="small"
                  ></Button>
                </template>
                <template #append>
                  <Button
                    icon="md-add"
                    @click.native="increment(index)"
                    size="small"
                  ></Button>
                </template>
              </Input>
            </vs-col>
          </vs-row>
        </vs-col>
        <vs-col :lg="3" :xs="3">
          <vs-row>
            <vs-col w="12">
              <Button
                size="large"
                type="error"
                @click.native="deleteCart(cart.id)"
                icon="ios-trash-outline"
                ghost
                :loading="loadingHapus"
              ></Button>
              <!-- <Modal v-model="modalConfirmDeleteProduct" ok-text="Hapus Akun">
                <template #header>
                  <p style="color: #f60; text-align: center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>Delete confirmation</span>
                  </p>
                </template>
                <p class="subtitle is-6 is-size-7-mobile">
                  Apabila produk dihapus, tidak dapat dikembalikan lagi
                  {{ cart.id }}
                </p>
                <template #footer>
                  <Button
                    type="error"
                    size="large"
                    :loading="loadingHapus"
                    @click="deleteCart(cart.id)"
                    >Delete</Button
                  >
                </template>
              </Modal> -->
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
      <Button type="primary" @click.native="ProceedToCheckout"
        >Proceed to Checkout</Button
      >
    </template>
  </section>
</template>

<script>
import gql from "graphql-tag";
const Count_Cart_Data = gql(
  `
 subscription MySubscription($_eq: Int!) {
  cart_aggregate(where: {id_userName: {_eq: $_eq}}) {
    aggregate {
      count
    }
  }
}


  `
);
const SubscriptionCart = gql(
  `
 subscription MySubscription($_eq: Int!) {
  cart(where: {id_userName: {_eq: $_eq}}, order_by: {id: asc}) {
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
  mutation MyMutation($_eq: Int!) {
  delete_cart(where: {id: {_eq: $_eq}}) {
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

export default {
  data() {
    return {
      dataCart: [],
      totalPrice: [],
      countCart: "",
      loadingHapus: false,
      modalConfirmDeleteProduct: false,
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
            _eq: this.dataUser.id,
          };
        },
        result({ data }) {
          setTimeout(() => {
            this.dataCart = data.cart;
          }, 1000);
        },
      },
      countCart: {
        query: Count_Cart_Data,
        variables() {
          return {
            _eq: this.dataUser.id,
          };
        },
        result({ data }) {
          this.countCart = data.cart_aggregate.aggregate.count;
        },
      },
    },
  },

  methods: {
    decrement(index) {
      if (this.dataCart[index].quantity === 1) {
        this.$Modal.error({
          title: "Tidak bisa 0",
          content: "Quantity yang dimasukkan tidak bisa lebih kecil dari 1",
        });

        // });
      } else {
        this.dataCart[index].quantity -= 1;
      }
    },
    increment(index) {
      if (this.dataCart[index].quantity >= 90) {
        this.$Modal.error({
          title: "Melebihi Stock",
          content: "Maaf quantity yang kamu masukkan melebihi stock",
        });
      } else {
        this.dataCart[index].quantity += 1;
      }
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
    async deleteCart(index) {
      console.log("Yang aku klik skarang : ", index);
      this.loadingHapus = true;

      let hasil = await this.$apollo.mutate({
        mutation: DELETE_CART,
        variables: {
          _eq: index,
        },
      });
      console.log("Hasil : ", hasil);
      this.loadingHapus = false;
    },
  },
  mounted() {
    let user = localStorage.getItem("dataHp");
    if (!user) {
      this.$router.push("/login");
    }
    let loading = this.$vs.loading({
      text: "Sedang mengambil data cart, mohon tunggu sebentar...",
      target: this.$refs.contentCart,
    });
    setTimeout(() => {
      this.dataCart;
      loading.close();
    }, 1200);
  },
};
</script>

<style scoped>
.productName {
  cursor: pointer;
}
.vs-input {
  text-align: center;
}
</style>