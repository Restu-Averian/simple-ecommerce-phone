<template>
  <div class="container" style="margin: 120px auto">
    <vs-row>
      <Button
        ghost
        @click.native="$router.go(-1)"
        type="primary"
        icon="md-arrow-back"
        >Back</Button
      >
    </vs-row>
    <h1>Checkout</h1>

    <vs-row class="my-3">
      <!-- Data Pengiriman -->
      <vs-col :lg="6" :xs="12" class="mt-5 p-2">
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
            type="number"
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
            placeholder="Pilih Kota"
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
            placeholder="Pilih Kecamatan"
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
            placeholder="Pilih Kelurahan"
          />
        </vs-row>

        <vs-row class="mt-5 mb-6">
          <vs-col>
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
        <vs-row>
          <Divider>
            <h4 class="title is-4 is-size-5-mobile">
              Pemilihan Jasa Pengiriman
            </h4>
          </Divider>
          <vs-col w="6" class="has-text-left">
            <RadioGroup v-model="jasKirChoosed" vertical>
              <Radio
                :label="`${jasaKirim.jenis} (${jasaKirim.ongkir})`"
                v-for="(jasaKirim, index) in jasKir"
                :key="index"
                @click.native="ChooseJasKir(jasaKirim)"
                class="subtitle is-6 is-size-7-mobile"
              ></Radio>
            </RadioGroup>
          </vs-col>
          <Divider />
        </vs-row>
      </vs-col>
      <vs-col :lg="6" :xs="12" class="mt-5 p-2">
        <!-- Informasi Barang -->
        <Card style="width: 100%" ref="LoadingFetchProduct">
          <template #title> Informasi Produk </template>
          <vs-row
            v-for="checkout in dataCheckout"
            :key="checkout.id"
            class="mb-5"
            align="center"
            justify="center"
          >
            <vs-col w="6">
              <img :src="checkout.image" alt="Gambar" class="img-fluid w-50" />
            </vs-col>
            <vs-col w="6" class="has-text-left">
              <h4 class="title is-4 is-size-5-mobile">
                {{ checkout.phone_name }}
              </h4>
              <h5 class="subtitle is-5 is-size-6-mobile">
                Rp {{ checkout.price }}
              </h5>
              <h6 class="subtitle is-6 is-size-7-mobile">
                Kuantitas : {{ checkout.quantity }}
              </h6>
            </vs-col>
          </vs-row>
          <Divider />
          <vs-row class="has-text-left">
            <vs-col :lg="6" :xs="12">
              <h4 class="mb-4">
                Jenis Ongkir :
                <span class="subtitle is-6 is-size-7-mobile">
                  {{ jasKirChoosed }}</span
                >
              </h4>
              <h4>
                Biaya Ongkir : + Rp
                <span class="subtitle is-6 is-size-7-mobile">
                  {{ ongkirChoosed }}</span
                >
              </h4>
            </vs-col>
          </vs-row>
          <Divider />
          <vs-row class="has-text-left">
            <vs-col :lg="6" :xs="12">
              <h4>
                Total :
                <span class="title is-4">Rp {{ totPrice }}</span>
              </h4>
            </vs-col>
          </vs-row>
          <Button
            type="primary"
            @click.native="modalSaveData = true"
            long
            class="mt-6 mb-3"
            >Pay It</Button
          >
          <Modal
            v-model="modalSaveData"
            title="Konfirmasi Simpan Data Baru"
            ok-text="Simpan"
          >
            <template #header>
              <p style="text-align: center">
                <Icon type="ios-information-circle"></Icon>
                <span>Konfirmasi Simpan Data</span>
              </p>
            </template>
            <p class="subtitle is-6 is-size-7-mobile">
              Apakah data pada form akan dipakai untuk berikutnya ?
            </p>

            <template #footer>
              <Button
                @click="tidakSimpan"
                ghost
                type="primary"
                :loading="loadingNotSaved"
                >Tidak Simpan</Button
              >
              <Button @click="Proceed" :loading="loadingSaved" type="primary"
                >Simpan data</Button
              >
            </template>
          </Modal>
        </Card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import axios from "axios";

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
const Update_Data_User = gql(
  `
  mutation MyMutation($kecamatan: String!, $kelurahan: String!, $kota: String!, $no_hp: String!, $provinsi: String = "", $_eq: Int!) {
  update_users(where: {id: {_eq: $_eq}}, _set: {kecamatan: $kecamatan, kelurahan: $kelurahan, kota: $kota, no_hp: $no_hp, provinsi: $provinsi}) {
    returning {
      id
      isLogin
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
}

  `
);

export default {
  data() {
    return {
      loadingSaved: false,
      loadingNotSaved: false,
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
      modalSaveData: false,
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
        async result({ data }) {
          const loading = this.$vs.loading({
            target: this.$refs.LoadingFetchProduct,
            text: "Sedang mengambil data barang, mohon ditunggu sebentar...",
          });
          await setTimeout(() => {
            this.dataCheckout = data.cart;
            loading.close();
          }, 1000);
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
    async tidakSimpan() {
      this.loadingNotSaved = true;

      let DataPhoneName = this.dataCheckout.map((checkout) => {
        return checkout.phone_name;
      });
      console.log("Phone Name yang disimpan : ", DataPhoneName);
      this.loadingNotSaved = false;
      this.modalSaveData = false;

      this.$Modal.success({
        title: "Pembelian Berhasil",
        content:
          "Silahkan cek riwayat pembelian untuk melihat status barang yang kamu beli",
      });
      let simpanCheckout = await this.$apollo.mutate({
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
      console.log("Hasil simpan : ", simpanCheckout);
      this.$router.push("/home");
    },
    async Proceed() {
      this.loadingSaved = true;
      let DataPhoneName = this.dataCheckout.map((checkout) => {
        return checkout.phone_name;
      });
      console.log("Phone Name yang disimpan : ", DataPhoneName);
      let hasilUpdate = await this.$apollo.mutate({
        mutation: Update_Data_User,
        variables: {
          kecamatan: this.kecamatan,
          kelurahan: this.kelurahan,
          kota: this.city,
          no_hp: this.noHp,
          provinsi: this.province,
          _eq: this.dataUser.id,
        },
      });
      console.log("Iya, hasil mutatenya : ", hasilUpdate);
      this.loadingSaved = false;
      this.modalSaveData = false;

      this.$Modal.success({
        title: "Pembelian Berhasil",
        content:
          "Silahkan cek riwayat pembelian untuk melihat status barang yang kamu beli",
      });

      this.$store.dispatch("updateNoHp", this.noHp);
      this.$store.dispatch("updateProvinsi", this.province);
      this.$store.dispatch("updateKota", this.city);
      this.$store.dispatch("updateKecamatan", this.kecamatan);
      this.$store.dispatch("updateKelurahan", this.kelurahan);

      let simpanCheckout = await this.$apollo.mutate({
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
      console.log("Hasil simpan : ", simpanCheckout);
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