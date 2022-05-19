<template>
  <div class="container" style="margin: 120px auto">
    <h1>Checkout</h1>
    {{ dataUser.id }}
    <!-- Data Pengiriman -->
    <vs-row>
      <vs-col w="6">
        <vs-row
          ><h4 class="title is-4 mx-auto">
            {{ dataUser.username }}
          </h4></vs-row
        >
        <vs-row class="my-4">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
            <Button
              type="primary"
              class="has-text-centered"
              icon="md-time"
              size="large"
              :hidden="
                isEdit == false ? (hiddenBtn = true) : (hiddenBtn = false)
              "
              @click="EditData"
            >
              Edit Data</Button
            >
          </vs-col>
        </vs-row>
        <vs-row class="mt-5 mb-3">
          <Input
            v-model="noHp"
            size="large"
            :disabled="isEdit"
            placeholder="No. Handphone"
          />
        </vs-row>
        <vs-row class="mt-5 mb-3">
          <Select
            v-model="province"
            size="large"
            filterable
            :disabled="isEdit"
            placeholder="Pilih Provinsi"
            @input="SelectProvince"
          >
            <Option
              v-for="provinsi in namaProvinsi"
              :value="provinsi"
              :key="provinsi"
              >{{ provinsi }}</Option
            >
          </Select>
        </vs-row>
        <vs-row class="mt-5 mb-3">
          <Select
            v-model="city"
            size="large"
            filterable
            :disabled="isEdit"
            placeholder="Pilih Kota"
            @input="SelectCity"
            v-if="city === ''"
          >
            <Option v-for="kota in namaKota" :value="kota" :key="kota">{{
              kota
            }}</Option>
          </Select>
          <Input
            v-model="city"
            v-else-if="city !== ''"
            :disabled="isEdit"
            size="large"
            placeholder="large size"
          />
        </vs-row>

        <vs-row class="mt-5 mb-3">
          <Select
            v-model="kecamatan"
            size="large"
            filterable
            :disabled="isEdit"
            placeholder="Pilih Kecamatan"
            @input="SelectKecamatan"
            v-if="kecamatan === ''"
          >
            <Option
              v-for="kecamatan in namaKecamatan"
              :value="kecamatan"
              :key="kecamatan"
              >{{ kecamatan }}</Option
            >
          </Select>
          <Input
            v-model="kecamatan"
            v-else-if="kecamatan !== ''"
            :disabled="isEdit"
            size="large"
            placeholder="large size"
          />
        </vs-row>

        <vs-row class="mt-5 mb-3">
          <Select
            v-model="kelurahan"
            size="large"
            filterable
            :disabled="isEdit"
            placeholder="Pilih Kelurahan"
            v-if="kelurahan === ''"
          >
            <Option
              v-for="kelurahan in namaKelurahan"
              :value="kelurahan"
              :key="kelurahan"
              >{{ kelurahan }}</Option
            >
          </Select>
          <Input
            v-model="kelurahan"
            v-else-if="kelurahan !== ''"
            :disabled="isEdit"
            size="large"
            placeholder="large size"
          />
        </vs-row>
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
        <vs-row class="mt-6">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <Button
              type="primary"
              class="has-text-centered"
              icon="md-close"
              size="large"
              :hidden="
                isEdit == true ? (hiddenBtn = true) : (hiddenBtn = false)
              "
              @click="cancelUpdateData"
              ghost
            >
              Cancel Edit</Button
            >
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="6">
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
      </vs-col>
    </vs-row>
    <Button type="primary" @click.native="Proceed">Pay It</Button>
  </div>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";

const JumlahPrice = gql(
  `
query MyQuery($_eq: Int!) {
  cart_aggregate(where: {id_userName: {_eq: $_eq}}) {
    aggregate {
      sum {
        price
      }
    }
  }
}


  `
);
const GET_USER_DATA = gql(
  `
    query MyQuery($_eq: Int!) {
  users(where: {id: {_eq: $_eq}}) {
    id
    kecamatan
    kelurahan
    kota
    no_hp
    password
    photo_profile
    provinsi
    userName
  }
}

    `
);
const hapusBarang = gql(
  `
mutation MyMutation($_eq: Int!) {
  delete_cart(where: {id_userName: {_eq: $_eq}}) {
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
  cart(order_by: {id: desc}, where: {id_userName: {_eq: $_eq}}) {
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

export default {
  data() {
    return {
      listProvinsi: [],
      namaProvinsi: [],
      province: "",

      listKota: [],
      namaKota: [],
      city: "",

      listKecamatan: [],
      namaKecamatan: [],
      kecamatan: "",

      listKelurahan: [],
      namaKelurahan: [],
      kelurahan: "",

      noHp: "",
      isEdit: true,
      hiddenBtn: true,
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
            _eq: this.dataUser.id,
          };
        },
        result({ data }) {
          this.dataCheckout = data.cart;
        },
      },
    },
  },

  computed: {
    dataUser() {
      return this.$store.state.dataHp.UserLogin;
    },
  },
  methods: {
    async fetchDataUser() {
      let hasil = await this.$apollo.query({
        query: GET_USER_DATA,
        variables: {
          _eq: this.dataUser.id,
        },
      });

      let dataUser = hasil.data.users[0];
      console.log("Data User : ", dataUser);

      this.noHp = dataUser.no_hp;
      this.province = dataUser.provinsi;
      this.city = dataUser.kota;
      this.kecamatan = dataUser.kecamatan;
      this.kelurahan = dataUser.kelurahan;
    },
    EditData() {
      this.isEdit = false;

      this.noHp = "";
      this.province = "";
      this.city = "";
      this.kecamatan = "";
      this.kelurahan = "";
    },
    cancelUpdateData() {
      this.isEdit = true;
      this.fetchDataUser();
    },
    async Proceed() {
      let DataPhoneName = this.dataCheckout.map((checkout) => {
        return checkout.phone_name;
      });
      console.log(
        "Phone Name yang disimpan : ",
        this.dataCheckout.map((checkout) => {
          return checkout.phone_name;
        })
      );
      alert("Pembelian Berhasil");
      this.$apollo.mutate({
        mutation: Save_Checkout_Data,
        variables: {
          objects: {
            ekspedisi: this.jasKirChoosed,
            id_user: this.dataUser.id,
            kecamatan: this.kecamatan,
            kelurahan: this.kelurahan,
            kota: this.city,
            namaUser: this.dataUser.username,
            no_hp: this.noHp,
            ongkir: this.ongkirChoosed,
            provinsi: this.province,
            nama_product: DataPhoneName.toString(),
            TotalPrice: this.totPrice,
          },
        },
      });
      let hasil = await this.$apollo.mutate({
        mutation: hapusBarang,
        variables: {
          _eq: this.dataUser.id,
        },
      });
      console.log("Hasil : ", hasil);
      this.$router.push("/home");
    },
    async JumalahPrice() {
      let hasilHarga = await this.$apollo.query({
        query: JumlahPrice,
        variables: {
          _eq: this.dataUser.id,
        },
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

    // },
    ChooseJasKir(jaskir) {
      console.log("ongkir : ", jaskir);
      this.ongkirChoosed = jaskir.ongkir;
      this.jasKirChoosed = jaskir.jenis;
      console.log("JaskirChoosed : ", this.jasKirChoosed);
    },

    fetchListProvinsi() {
      axios
        .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
        .then((response) => {
          this.listProvinsi = response.data.provinsi;
          this.namaProvinsi = response.data.provinsi.map((result) => {
            return result["nama"];
          });
        });
    },
    fetchListKota(idProvince) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvince}`
        )
        .then((result) => {
          this.listKota = result.data.kota_kabupaten;
          this.namaKota = result.data.kota_kabupaten.map((result) => {
            return result["nama"];
          });
        });
    },
    fetchListKecamatan(idKota) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKota}`
        )
        .then((result) => {
          this.listKecamatan = result.data.kecamatan;
          this.namaKecamatan = result.data.kecamatan.map((result) => {
            return result["nama"];
          });
        });
    },
    fetchListKelurahan(idKecamatan) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`
        )
        .then((result) => {
          this.listKelurahan = result.data.kelurahan;
          this.namaKelurahan = result.data.kelurahan.map((result) => {
            return result["nama"];
          });
        });
    },
    SelectProvince(e) {
      //Isi id provinsi

      this.city = "";
      this.kecamatan = "";
      this.kelurahan = "";
      if (this.province == "") {
        this.isEmptyCity = true;
      } else {
        this.isEmptyCity = false;
        console.log("listProvinsi :", this.listProvinsi);
        let hasilFilter = this.listProvinsi.filter((dataProvince) => {
          return dataProvince.nama == e;
        });
        console.log("Hasil filter Provinsi : ", hasilFilter);
        this.fetchListKota(hasilFilter[0].id);
      }
    },
    SelectCity(e) {
      console.log("Data kota : ", e);
      this.kecamatan = "";
      this.kelurahan = "";
      if (this.city == "") {
        this.isEmptyKecamatan = true;
      } else {
        this.isEmptyKecamatan = false;

        let hasilFilterKota = this.listKota.filter((dataKota) => {
          return dataKota.nama == e;
        });
        this.fetchListKecamatan(hasilFilterKota[0].id);
      }
      //Isi id provinsi
      // this.fetchListKota(e.target.value);
    },
    SelectKecamatan(event) {
      this.kelurahan = "";
      if (this.kecamatan == "") {
        this.isEmptyKelurahan = true;
      } else {
        this.isEmptyKelurahan = false;
        let hasilFilterKecamatan = this.listKecamatan.filter(
          (dataKecamatan) => {
            return dataKecamatan.nama == event;
          }
        );
        console.log(hasilFilterKecamatan);
        this.fetchListKelurahan(hasilFilterKecamatan[0].id);
      }
    },
  },

  mounted() {
    this.fetchListProvinsi();
    this.fetchDataUser();
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