<template>
  <div class="container">
    <div class="row my-4">
      <img
        :src="user.photo_profile"
        alt="Image-profile"
        class="m-auto"
        style="width: 200px"
      />
      <h4 class="fw-bold">{{ user.username }}</h4>
    </div>
    <div class="row">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Profile
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Riwayat Pembelian
          </button>
        </li>
      </ul>

      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active text-start"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div class="mt-5 mb-3">
            <label for="" class="form-label">No. Handphone</label>
            <input type="number" name="" id="" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Provinsi</label>
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
          <div class="mb-3">
            <label for="" class="form-label">Kota</label>
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
          <div class="mb-3">
            <label for="" class="form-label">Kecamatan</label>
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
          <div class="mb-3">
            <label for="" class="form-label">Kelurahan</label>
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
          <div class="my-5">
            <button class="btn btn-primary" @click="UpdateData">
              Update Data
            </button>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <table>
            <tr>
              <th>No</th>
            </tr>
            <tr>
              <td>1</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
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
    };
  },
  computed: {
    user() {
      return Users.dataHp.UserLogin;
    },
  },
  methods: {
    UpdateData() {
      this.$apollo.mutate({
        mutation: UpdateData,
        variables: {
          _eq: Users.dataHp.UserLogin.id,
          _set: {
            kecamatan: this.kecamatan,
            kelurahan: this.kelurahan,
            kota: this.city,
            password: Users.dataHp.UserLogin.password,
            no_hp: this.noHp,
            photo_profile: Users.dataHp.UserLogin.photo_profile,
            provinsi: this.province,
            userName: Users.dataHp.UserLogin.username,
          },
        },
      });
      console.log("Testing Data : ", this.kecamatan);
    },
    async fetchDataUser() {
      let hasil = await this.$apollo.query({
        query: GET_USER_DATA,
        variables: {
          _eq: Users.dataHp.UserLogin.id,
        },
      });
      let dataUser = hasil.data.users[0];
      this.noHp = dataUser.no_hp;
      this.province = dataUser.provinsi;
      this.city = dataUser.kota;
      this.kecamatan = dataUser.kecamatan;
      this.kelurahan = dataUser.kelurahan;
      console.log("Hasil Fetch Data : ", hasil);
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
        this.kecamatan = "";
        this.kelurahan = "";
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
        this.kelurahan = "";
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
    this.fetchDataUser();
    console.log("haha : ", this.$store.state.dataHp.UserLogin.login);
    if (this.$store.state.dataHp.UserLogin.login === undefined) {
      alert("Login dulu");
      this.$router.push("/login");
    } else if (this.$store.state.dataHp.UserLogin.login === true) {
      console.log(Users);
    }
    // if (!Users) {
    //   this.$router.push("/login");
    // }
  },
};
</script>

<style>
</style>