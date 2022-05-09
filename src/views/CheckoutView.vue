<template>
  <div class="container">
    <h1>Checkout</h1>
    <div class="row text-start">
      <!-- Data Pengiriman -->
      <div class="col-7">
        <form action="" @submit.prevent="Proceed">
          <div class="mb-4">
            <label for="nama" class="form-label">Nama</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              placeholder="Nama"
              readonly
              v-model="namaUser"
            />
          </div>

          <div class="mb-4">
            <label for="noHp" class="form-label">Nomor Hp</label>
            <input
              type="number"
              class="form-control"
              id="noHp"
              placeholder="Nomor Handphone"
              v-model="noHp"
              required
            />
          </div>

          <!-- Data Provinsi -->
          <div class="mb-4">
            <label for="dataProvinsi" class="form-label">Data Provinsi</label>
            <input
              list="provinsi"
              @input="SelectProvince"
              class="form-control"
              v-model="province"
              required
            />
            <datalist type="text" id="provinsi">
              <option
                v-for="provinsi in listProvinsi"
                :key="provinsi.id"
                :value="provinsi.nama"
              ></option>
            </datalist>
          </div>
          <!-- Data Kota -->
          <div class="mb-4">
            <label for="dataKota" class="form-label">Data Kota</label>
            <input
              list="city"
              @input="SelectCity"
              class="form-control"
              :readonly="isEmptyCity"
              v-model="city"
              required
            />
            <datalist type="text" id="city">
              <option
                v-for="kota in listKota"
                :key="kota.id"
                :value="kota.nama"
              >
                {{ kota.nama }}
              </option>
            </datalist>
          </div>

          <!-- Data Kecamatan -->
          <div class="mb-4">
            <label for="dataKecamatan" class="form-label">Data Kecamatan</label>
            <input
              list="kecamatan"
              @input="SelectKecamatan"
              class="form-control"
              :readonly="isEmptyKecamatan"
              v-model="kecamatan"
              required
            />
            <datalist type="text" id="kecamatan">
              <option
                v-for="kecamatan in listKecamatan"
                :key="kecamatan.id"
                :value="kecamatan.nama"
              >
                {{ kecamatan.nama }}
              </option>
            </datalist>
          </div>

          <!-- Data Kelurahan -->
          <div class="mb-4">
            <label for="dataKelurahan" class="form-label">Data Kelurahan</label>
            <input
              list="kelurahan"
              class="form-control"
              :readonly="isEmptyKelurahan"
              v-model="kelurahan"
              required
            />
            <datalist type="text" id="kelurahan">
              <option
                v-for="kelurahan in listKelurahan"
                :key="kelurahan.id"
                :value="kelurahan.nama"
              >
                {{ kelurahan.nama }}
              </option>
            </datalist>
          </div>

          <div class="mb-4">
            <div
              class="form-check"
              v-for="(jasaKirim, index) in jasKir"
              :key="index"
            >
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                v-model="jasKirChoosed"
                :value="jasaKirim.jenis"
                :id="index"
                required
                @click="ChooseJasKir(jasaKirim)"
              />
              <label class="form-check-label" :for="index">
                <h4>{{ jasaKirim.jenis }}</h4>
                <p>Rp {{ jasaKirim.ongkir }}</p>
              </label>
            </div>
          </div>
          <div class="mt-5">
            <input type="submit" class="btn btn-primary" value="Pay it" />
          </div>
        </form>
      </div>

      <!-- Informasi Barang -->
      <div class="col-5 shadow p-3 m-auto">
        <div
          class="row m-auto mb-5"
          v-for="checkout in dataCheckout"
          :key="checkout.id"
        >
          <div class="col">
            <img :src="checkout.image" alt="Gambar" width="150px" />
          </div>
          <div class="col">
            <h4>{{ checkout.phone_name }}</h4>
            <h6>Rp {{ checkout.price }}</h6>
          </div>
        </div>

        <!-- Jenis Ongkir -->
        <div class="row">
          <div class="col">
            <p>Jenis Ongkir :</p>
          </div>
          <div class="col">
            {{ jasKirChoosed }}
          </div>
        </div>

        <!-- Harga Ongkir -->
        <div class="row">
          <div class="col">
            <p>Biaya Ongkir :</p>
          </div>
          <div class="col">+ Rp {{ ongkirChoosed }}</div>
        </div>

        <!-- Total Harga -->
        <div class="row">
          <div class="col">
            <p>Total :</p>
          </div>
          <div class="col text-center">
            <h4 class="fw-bold">Rp {{ totPrice }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";

// const GET_DATA_FROM_CART = gql(
//   `
//  query MyQuery($_eq: Int!) {
//   cart(where: {IsCheckout: {_eq: true}, id_userName: {_eq: $_eq}}, order_by: {id: desc}) {
//     IsCheckout
//     id
//     id_userName
//     image
//     phone_name
//     phone_slug
//     price
//     quantity
//   }
// }

//   `
// );
const JumlahPrice = gql(
  `
  query MyQuery {
  cart_aggregate(where: {IsCheckout: {_eq: true}}) {
    aggregate {
      sum {
        price
      }
    }
  }
}

  `
);

const hapusBarang = gql(
  `
mutation MyMutation($_eq: Int!) {
  delete_cart(where: {IsCheckout: {_eq: true}, id_userName: {_eq: $_eq}}) {
    returning {
      IsCheckout
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

const Save_Checkout_Data = gql(
  `
 mutation MyMutation($objects: [checkout_insert_input!] = {}) {
  insert_checkout(objects: $objects) {
    returning {
      TotalPrice
      ekspedisi
      id
      id_user
      kecamatan
      kelurahan
      kota
      namaUser
      no_hp
      ongkir
      provinsi
      nama_product
    }
  }
}



  `
);

const SubscriptionCart = gql(
  `
  subscription MySubscription($_eq: Int!) {
  cart(order_by: {id: desc}, where: {id_userName: {_eq: $_eq}, IsCheckout: {_eq: true}}) {
    IsCheckout
    id
    id_userName
    image
    phone_name
    phone_slug
    price
    quantity
  }
}



  `
);
let Users = JSON.parse(localStorage.getItem("dataHp"));

export default {
  data() {
    return {
      listProvinsi: [],
      province: "",

      listKota: [],
      city: "",

      listKecamatan: [],
      kecamatan: "",

      listKelurahan: [],
      kelurahan: "",

      noHp: "",

      isEmptyCity: true,
      isEmptyKecamatan: true,
      isEmptyKelurahan: true,

      jasKir: [
        {
          jenis: "JNT",
          ongkir: 34000,
        },
        {
          jenis: "Si Cepat",
          ongkir: 35000,
        },
      ],
      dataCheckout: [],
      ongkirChoosed: "",
      price: "",
      totPrice: "",

      jasKirChoosed: "",
    };
  },

  apollo: {
    $subscribe: {
      dataCart: {
        query: SubscriptionCart,
        variables() {
          return {
            _eq: Users.dataHp.UserLogin.id,
          };
        },
        result({ data }) {
          this.dataCheckout = data.cart;
        },
      },
    },
  },

  computed: {
    namaUser() {
      let user = JSON.parse(localStorage.getItem("dataHp"));
      return user.dataHp.UserLogin.username;
    },
  },
  methods: {
    Proceed() {
      let DataPhoneName = this.dataCheckout.map((checkout) => {
        return checkout.phone_name;
      });
      console.log(
        "Phone Name yang disimpan : ",
        this.dataCheckout.map((checkout) => {
          return checkout.phone_name;
        })
      );
      let SaveIt = confirm("Simpan data untuk pembelian selanjutnya ? ");
      if (SaveIt) {
        console.log("Iyah");
        this.$apollo.mutate({
          mutation: Save_Checkout_Data,
          variables: {
            objects: {
              ekspedisi: this.jasKirChoosed,
              id_user: Users.dataHp.UserLogin.id,
              kecamatan: this.kecamatan,
              kelurahan: this.kelurahan,
              kota: this.city,
              namaUser: Users.dataHp.UserLogin.username,
              no_hp: this.noHp,
              ongkir: this.ongkirChoosed,
              provinsi: this.province,
              nama_product: DataPhoneName.toString(),
              TotalPrice: this.totPrice,
            },
          },
        });
      } else {
        alert("Pembelian berhasil");
      }

      this.$apollo.mutate({
        mutation: hapusBarang,
        variables: {
          _eq: Users.dataHp.UserLogin.id,
        },
      });
      this.$router.push("/home");
    },
    async JumalahPrice() {
      let hasilHarga = await this.$apollo.query({
        query: JumlahPrice,
      });
      console.log(
        "Jumlah harga : ",
        hasilHarga.data.cart_aggregate.aggregate.sum.price
      );
      this.price = hasilHarga.data.cart_aggregate.aggregate.sum.price;
    },
    TotalPrice() {
      this.totPrice = this.price + this.ongkirChoosed;
      console.log("Total Price : ", this.totPrice);
    },
    // async GetCart() {
    //   let hasil = await this.$apollo.query({
    //     query: GET_DATA_FROM_CART,
    //     variables: {
    //       _eq: Users.dataHp.UserLogin.id,
    //     },
    //   });
    //   console.log("haha : ", hasil);
    //   let hasilfilter = hasil.data.cart.filter((dataCart) => {
    //     return dataCart;
    //   });
    //   console.log("Hasil Filter : ", hasilfilter);
    //   this.dataCheckout = hasilfilter;
    // },
    ChooseJasKir(jaskir) {
      console.log("ongkir : ", jaskir);
      this.ongkirChoosed = jaskir.ongkir;
      this.jasKirChoosed = jaskir.jenis;
      console.log("JaskirChoosed : ", this.jasKirChoosed);
    },

    fetchListProvinsi() {
      axios
        .get("http://dev.farizdotid.com/api/daerahindonesia/provinsi")
        .then((response) => {
          this.listProvinsi = response.data.provinsi;
        });
    },
    fetchListKota(idProvince) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvince}`
        )
        .then((result) => {
          this.listKota = result.data.kota_kabupaten;
        });
    },
    fetchListKecamatan(idKota) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKota}`
        )
        .then((result) => {
          this.listKecamatan = result.data.kecamatan;
        });
    },
    fetchListKelurahan(idKecamatan) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`
        )
        .then((result) => {
          this.listKelurahan = result.data.kelurahan;
        });
    },
    SelectProvince(e) {
      //Isi id provinsi

      console.log(this.listProvinsi);
      if (this.province == "") {
        this.isEmptyCity = true;
        this.city = "";
      } else {
        this.isEmptyCity = false;
        let hasilFilter = this.listProvinsi.filter((data) => {
          return data.nama == e.target.value;
        });
        this.fetchListKota(hasilFilter[0].id);
      }
    },
    SelectCity(e) {
      console.log("Data kota : ", e.target.value);
      if (this.city == "") {
        this.isEmptyKecamatan = true;
        this.kecamatan = "";
      } else {
        this.isEmptyKecamatan = false;

        let hasilFilterKota = this.listKota.filter((dataKota) => {
          return dataKota.nama == e.target.value;
        });
        this.fetchListKecamatan(hasilFilterKota[0].id);
      }
      //Isi id provinsi
      // this.fetchListKota(e.target.value);
    },
    SelectKecamatan(event) {
      if (this.kecamatan == "") {
        this.isEmptyKelurahan = true;
        this.kelurahan = "";
      } else {
        this.isEmptyKelurahan = false;
        let hasilFilterKecamatan = this.listKecamatan.filter(
          (dataKecamatan) => {
            return dataKecamatan.nama == event.target.value;
          }
        );
        console.log(hasilFilterKecamatan);
        this.fetchListKelurahan(hasilFilterKecamatan[0].id);
      }
    },
  },

  mounted() {
    this.fetchListProvinsi();
    let user = localStorage.getItem("dataHp");
    if (!user) {
      alert("Login dulu");
      this.$router.push("/login");
    }

    this.JumalahPrice();
  },
  updated() {
    this.TotalPrice();
  },
};
</script>

<style>
</style>