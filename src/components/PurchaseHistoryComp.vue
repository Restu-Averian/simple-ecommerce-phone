<template>
  <section>
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> Nama Product </vs-th>
          <vs-th> No. Handphone</vs-th>
          <vs-th> Alamat</vs-th>
          <vs-th> Ekspedisi</vs-th>
          <vs-th> Ongkir</vs-th>
          <vs-th> Total Harga</vs-th>
          <vs-th> Status</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(checkout, i) in dataCheckout" :data="checkout">
          <vs-td>
            {{ checkout.nama_product }}
          </vs-td>
          <vs-td>
            {{ checkout.no_hp }}
          </vs-td>
          <vs-td>
            {{ checkout.provinsi }}, {{ checkout.kota }},
            {{ checkout.kecamatan }}, {{ checkout.kelurahan }}
          </vs-td>
          <vs-td>
            {{ checkout.ekspedisi }}
          </vs-td>
          <vs-td> Rp {{ checkout.ongkir }} </vs-td>
          <vs-td> Rp {{ checkout.TotalPrice }} </vs-td>
          <vs-td v-html="checkout.status"> </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </section>
</template>

<script>
import gql from "graphql-tag";
const GET_CHECKOUT_DATA = gql(
  `
  query MyQuery($_eq: Int!) {
  checkout(where: {id_user: {_eq: $_eq}}, order_by: {id: desc}) {
    TotalPrice
    ekspedisi
    kecamatan
    kelurahan
    kota
    namaUser
    nama_product
    no_hp
    ongkir
    provinsi
    status
  }
}

  `
);

export default {
  data() {
    return {
      dataCheckout: [],
      status: [],
      classStatus: "",
    };
  },
  computed: {
    dataUser() {
      return this.$store.state.dataHp.UserLogin;
    },
  },
  methods: {
    async fetchDataCheckout() {
      let hasil = await this.$apollo.query({
        query: GET_CHECKOUT_DATA,
        variables: {
          _eq: this.dataUser.id,
        },
      });
      this.dataCheckout = hasil.data.checkout;
      console.log("Data Checkout : ", this.dataCheckout);
    },
  },
  async mounted() {
    await this.fetchDataCheckout();
    let User = JSON.parse(localStorage.getItem("dataHp"));
    if (!User) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
</style>