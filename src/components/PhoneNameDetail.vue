<template>
  <vs-col>
    <vs-row class="mb-3">
      <h1 class="title is-1 is-size-3-mobile has-text-left">
        {{ dataDetail.phone_name }}
      </h1>
    </vs-row>

    <!-- Harga -->
    <vs-row class="my-5">
      <!-- Kalau tidak ada array 12 -->
      <h3
        v-if="!dataDetail.specifications[12]"
        :disabled="(disabel = true)"
        class="subtitle is-3 is-size-4-mobile"
      ></h3>

      <!-- Kalau ada array 12, namun tidak ada price -->
      <p
        v-else-if="
          Object.assign({}, ...dataDetail.specifications[12].specs).key !==
          'Price'
        "
        :disabled="(disabel = true)"
      ></p>

      <!-- Kalau mata uang rupee -->
      <h3
        v-else-if="
          Object.assign(
            {},
            ...dataDetail.specifications[12].specs
          ).val[0].includes('₹')
        "
        class="subtitle is-3 is-size-4-mobile"
      >
        Rp
        {{
          Object.assign({}, ...dataDetail.specifications[12].specs)
            .val[0].slice(1)
            .replaceAll(",", "") *
          180 *
          quantity
        }}
      </h3>

      <!-- Kalau mata uang eur
          Kalau ada array 12 -->
      <h3
        v-else-if="
          Object.assign(
            {},
            ...dataDetail.specifications[12].specs
          ).val[0].includes('EUR')
        "
        class="subtitle is-3 is-size-4-mobile"
      >
        Rp
        {{
          Object.assign(
            {},
            ...dataDetail.specifications[12].specs
          ).val[0].slice(5, -3) *
          14000 *
          quantity
        }}
      </h3>

      <!-- Kalau mata uang C
          Kalau ada array 12 -->
      <h3
        v-else-if="
          Object.assign(
            {},
            ...dataDetail.specifications[12].specs
          ).val[0].includes('$')
        "
        class="subtitle is-3 is-size-4-mobile"
      >
        Rp
        {{
          Object.assign(
            {},
            ...dataDetail.specifications[12].specs
          ).val[0].slice(1, 5) *
          14400 *
          quantity
        }}
      </h3>

      <!-- Kalau mata uang Rp
          Kalau ada array 12 -->
      <h3
        v-else-if="
          Object.assign(
            {},
            ...dataDetail.specifications[12].specs
          ).val[0].includes('Rp')
        "
        class="subtitle is-3 is-size-4-mobile"
      >
        Rp
        {{
          Object.assign({}, ...dataDetail.specifications[12].specs)
            .val[0].slice(-9, -1)
            .replaceAll(",", "") *
          14400 *
          quantity
        }}
      </h3>

      <p v-else :disabled="(disabel = true)"></p>
      <!-- <h3 class="subtitle is-3 is-size-4-mobile">Rp 24999000</h3> -->
    </vs-row>

    <!-- Btn Quantity -->
    <vs-row style="margin-left: -20px">
      <vs-button @click="decrement" style="position: relative; left: 20px"
        >-</vs-button
      >
      <vs-input v-model="quantity" type="number" readonly />
      <vs-button @click="increment" style="position: relative; right: 20px"
        >+</vs-button
      >
    </vs-row>

    <!-- Btn Cart -->
    <vs-row class="my-5" vs-type="flex" vs-justify="center">
      <vs-button @click="AddToCart" style="padding: 2px 8px; font-size: 16px"
        >Add to Cart</vs-button
      >
    </vs-row>
  </vs-col>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";

const ADD_CART = gql(
  `
  mutation MyMutation($objects: [cart_insert_input!] = {}) {
  insert_cart(objects: $objects) {
    returning {
      id_userName
      id
      phone_slug
      phone_name
      quantity
      price
      user {
        userName
      }
    }
  }
}

  `
);
export default {
  data() {
    return {
      quantity: 1,
      dataDetail: [],
    };
  },
  methods: {
    fetchDataDetail() {
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/${this.$route.params.detail}`
        )
        .then((response) => {
          console.log("hasil : ", response);
          this.dataDetail = response.data.data;
        });
    },
    async AddToCart() {
      let Users = JSON.parse(localStorage.getItem("dataHp"));

      //Check login or not
      if (Users) {
        if (!this.dataDetail.specifications[12]) {
          // alert("Barang kosong");
          this.disabel = true;
        } else {
          let TotalHarga;
          if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("₹")
          ) {
            TotalHarga =
              Object.assign({}, ...this.dataDetail.specifications[12].specs)
                .val[0].slice(1)
                .replaceAll(",", "") *
              180 *
              this.quantity;
          } else if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("EUR")
          ) {
            TotalHarga =
              Object.assign(
                {},
                ...this.dataDetail.specifications[12].specs
              ).val[0].slice(5, -3) *
              14000 *
              this.quantity;
          } else if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("$")
          ) {
            TotalHarga =
              Object.assign(
                {},
                ...this.dataDetail.specifications[12].specs
              ).val[0].slice(1, 5) *
              14400 *
              this.quantity;
          } else if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("C$")
          ) {
            TotalHarga =
              Object.assign(
                {},
                ...this.dataDetail.specifications[12].specs
              ).val[0].slice(1, 5) *
              14400 *
              this.quantity;
          } else if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("Rp")
          ) {
            TotalHarga =
              Object.assign({}, ...this.dataDetail.specifications[12].specs)
                .val[0].slice(-9, -1)
                .replaceAll(",", "") *
              14400 *
              this.quantity;
          }

          console.log("Total harga : ", TotalHarga);
          let hasilAddCart = await this.$apollo.mutate({
            mutation: ADD_CART,
            variables: {
              objects: {
                id_userName: Users.dataHp.UserLogin.id,
                phone_slug: this.$route.params.detail,
                image: this.dataDetail.thumbnail,
                quantity: this.quantity,
                phone_name: this.dataDetail.phone_name,
                price: TotalHarga,
              },
            },
          });
          console.log("Hasil Add to Cart : ", hasilAddCart);
          alert("Berhasil masukkan ke cart");
        }
      } else {
        alert("Login terlebih dahulu");
        this.$router.push("/login");
      }
    },
    decrement() {
      if (this.quantity <= 1) {
        alert("Tidak bisa 0");
      } else {
        this.quantity -= 1;
      }
    },
    increment() {
      if (this.quantity >= 90) {
        alert("Melebihi stock");
      } else {
        this.quantity += 1;
      }
    },
  },
  mounted() {
    this.fetchDataDetail();
  },
};
</script>

<style >
.vs-input {
  text-align: center;
}
</style>