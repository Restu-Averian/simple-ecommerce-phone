<template>
  <section>
    <vs-row
      ><img :src="dataUser.UserLogin.photo_profile" alt="" class="mx-auto"
    /></vs-row>
    <vs-row
      ><h4 class="title is-4 mx-auto">
        {{ dataUser.UserLogin.username }}
      </h4></vs-row
    >
    <vs-row class="my-4">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <Button
          type="primary"
          class="has-text-centered"
          icon="md-time"
          size="large"
          :hidden="isEdit == false ? (hiddenBtn = true) : (hiddenBtn = false)"
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

    <vs-row class="mt-6">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <Button
          type="primary"
          class="has-text-centered"
          icon="md-time"
          size="large"
          @click="UpdateData"
          :hidden="isEdit == true ? (hiddenBtn = true) : (hiddenBtn = false)"
        >
          Update Data</Button
        >
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <Button
          type="primary"
          class="has-text-centered"
          icon="md-close"
          size="large"
          :hidden="isEdit == true ? (hiddenBtn = true) : (hiddenBtn = false)"
          @click="cancelUpdateData"
          ghost
        >
          Cancel Edit</Button
        >
      </vs-col>
    </vs-row>
  </section>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";
const UpdateData = gql(
  `
    mutation MyMutation($_set: users_set_input = {}, $_eq: Int!) {
  update_users(where: {id: {_eq: $_eq}}, _set: $_set) {
    returning {
      id
      kecamatan
      kelurahan
      kota
      password
      no_hp
      photo_profile
      provinsi
      userName
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
    };
  },
  computed: {
    dataUser() {
      return this.$store.state.dataHp;
    },
  },
  methods: {
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
    UpdateData() {
      this.$apollo.mutate({
        mutation: UpdateData,
        variables: {
          _eq: this.dataUser.UserLogin.id,
          _set: {
            kecamatan: this.kecamatan,
            kelurahan: this.kelurahan,
            kota: this.city,
            password: this.dataUser.UserLogin.password,
            no_hp: this.noHp,
            photo_profile: this.dataUser.UserLogin.photo_profile,
            provinsi: this.province,
            userName: this.dataUser.UserLogin.username,
          },
        },
      });
      this.$store.dispatch("updateProvinsi", this.province);
      this.$store.dispatch("updateKota", this.city);
      this.$store.dispatch("updateKecamatan", this.kecamatan);
      this.$store.dispatch("updateKelurahan", this.kelurahan);
      this.isEdit = true;
      console.log("Testing Data : ", this.kecamatan);
    },
    async fetchDataUser() {
      let hasil = await this.$apollo.query({
        query: GET_USER_DATA,
        variables: {
          _eq: this.dataUser.UserLogin.id,
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
    fetchListProvinsi() {
      axios
        .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
        .then((response) => {
          this.listProvinsi = response.data.provinsi;
          this.namaProvinsi = response.data.provinsi.map((result) => {
            return result["nama"];
          });
          // console.log("List Provinsi : ", this.listProvinsi);
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
  },
  async mounted() {
    this.fetchListProvinsi();
    await this.fetchDataUser();
    console.log("ada ", this.city);
    let user = localStorage.getItem("dataHp");
    if (!user) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
</style>