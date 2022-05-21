<template>
  <section>
    <vs-table ref="riwayat">
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
const SUBSCRIBE_CHECKOUT_DATA = gql(
  `
 subscription MySubscription($_eq: Int!) {
  checkout(where: {id_user: {_eq: $_eq}}) {
    TotalPrice
    ekspedisi
    id
    id_user
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
  apollo: {
    $subscribe: {
      dataCheckout: {
        query: SUBSCRIBE_CHECKOUT_DATA,
        variables() {
          return {
            _eq: this.dataUser.id,
          };
        },
        async result({ data }) {
          let loading = this.$vs.loading({
            text: "Sedang mengambil data riwayat belanja, mohon tunggu sebentar...",
            target: this.$refs.riwayat,
          });
          console.log("Data Checkout : ", this.dataCheckout);
          await setTimeout(() => {
            this.dataCheckout = data.checkout;
            loading.close();
          }, 1000);
        },
      },
    },
  },
  methods: {},
  async mounted() {
    let User = JSON.parse(localStorage.getItem("dataHp"));
    if (!User) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
</style>