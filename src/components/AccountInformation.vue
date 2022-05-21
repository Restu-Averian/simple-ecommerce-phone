<template>
  <section>
    <vs-row class="mb-3">
      <vs-avatar
        badge
        size="75"
        class="mx-auto"
        style="cursor: pointer"
        @click="modalImage = true"
      >
        <img :src="dataUser.UserLogin.photo_profile" alt="" />
        <template #badge>
          <span
            ><i
              class="bx bx-pencil align-content-center"
              style="cursor: pointer"
            ></i
          ></span>
          <!-- <i class='bx bxs-bell-off' ></i> -->
        </template>
        <Modal
          v-model="modalImage"
          title="Ganti Photo Profile"
          ok-text="Ganti Photo"
          @on-ok="ChangePhoto"
          @on-cancel="cancel('Foto')"
        >
          <Row class="mb-3">
            <img :src="fotoUser" alt="" />
          </Row>
          <Row>
            <Button
              type="primary"
              @click="
                isChangePhoto = true;
                hiddenBtnChangePhoto = false;
              "
              :hidden="isChangePhoto === true ? true : false"
              >Mau ganti foto profile ?</Button
            >
            <Button
              type="primary"
              class="mr-3"
              ghost
              :hidden="hiddenBtnChangePhoto"
              @click="GeneratePhoto"
              >Generate Photo Profile</Button
            >
            <Button
              type="primary"
              ghost
              :hidden="hiddenBtnChangePhoto"
              @click="
                hiddenBtnChangePhoto = true;
                isChangePhoto = false;
              "
              >Cancel</Button
            >
          </Row>
        </Modal>
      </vs-avatar>
      <!-- <img :src="dataUser.UserLogin.photo_profile" alt="" class="mx-auto" /> -->
    </vs-row>
    <vs-row
      ><h4 class="title is-4 mx-auto my-2">
        {{ dataUser.UserLogin.username }}
        <span
          ><i
            class="bx bx-pencil align-content-center"
            @click="modal = true"
            style="cursor: pointer"
          ></i
        ></span>
        <Modal
          v-model="modal"
          title="Ganti Username"
          ok-text="Ganti Username"
          @on-ok="ChangeUserName"
          @on-cancel="cancel('Username')"
        >
          <Input
            v-model="username"
            size="large"
            placeholder="Masukkan username yang baru..."
          />
        </Modal>
      </h4>
    </vs-row>
    <vs-row>
      <Button type="text" @click="checkPass = true" class="mx-auto" size="large"
        >Change Password</Button
      >
      <Modal
        v-model="checkPass"
        title="Password Lama"
        @on-ok="checkPassword"
        ok-text="Check Password Lama"
        @on-cancel="cancel('Password')"
      >
        <Input
          :type="showPassword == true ? 'text' : 'password'"
          v-model="password"
          size="large"
          placeholder="Masukkan password yang lama"
        />
        <Checkbox v-model="showPassword" class="my-3" size="large"
          >Tampilkan Kata Sandi</Checkbox
        >
      </Modal>
      <Modal
        v-model="modalPass"
        title="Ganti Password"
        @on-ok="ChangePassword"
        ok-text="Ganti Password"
        @on-cancel="cancel('Password baru')"
      >
        <Input
          :type="showPassword == true ? 'text' : 'password'"
          v-model="passwordBaru"
          size="large"
          placeholder="Masukkan password yang baru..."
        />
        <Checkbox v-model="showPassword" class="my-3" size="large"
          >Tampilkan Kata Sandi</Checkbox
        >
      </Modal>
    </vs-row>
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
        placeholder="Pilih  Kecamatan"
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

    <vs-row class="mt-4">
      <Button
        @click="modalConfirmDeleteAcc = true"
        class="mx-auto"
        type="error"
        size="large"
        icon="ios-trash-outline"
        ghost
        >Hapus Akun</Button
      >
      <Modal v-model="modalConfirmDeleteAcc" ok-text="Hapus Akun">
        <template #header>
          <p style="color: #f60; text-align: center">
            <Icon type="ios-information-circle"></Icon>
            <span>Delete confirmation</span>
          </p>
        </template>
        <p class="mb-4 subtitle is-6 is-size-7-mobile">
          Masukkan <strong>{{ dataUser.UserLogin.username }}</strong> pada
          inputan di bawah ini
        </p>
        <Input size="large" v-model="confirmDelete" />
        <template #footer>
          <Button
            type="error"
            size="large"
            :loading="modal_loading"
            @click="del"
            >Delete</Button
          >
        </template>
      </Modal>
    </vs-row>
  </section>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";
const ChangeUserName = gql(
  `
  mutation MyMutation($userName: String!, $_eq: Int!) {
  update_users(where: {id: {_eq: $_eq}}, _set: {userName: $userName}) {
    returning {
      id
      isLogin
      userName
    }
  }
}

  `
);
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
const CHECK_PASSWORD = gql(
  `
 query MyQuery($_eq: Int!) {
  users(where: {id: {_eq: $_eq}}) {
    id
    isLogin
    kelurahan
    kecamatan
    kota
    no_hp
    password
    provinsi
    photo_profile
    userName
  }
}


  `
);
const CHANGE_PASSWORD = gql(
  `
  mutation MyMutation($password: String!, $_eq: Int!) {
  update_users(where: {id: {_eq: $_eq}}, _set: {password: $password}) {
    returning {
      id
      isLogin
      kecamatan
      kelurahan
      kota
      no_hp
      password
      photo_profile
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

const CHANGE_PHOTO_PROFILE = gql(
  `
 mutation MyMutation($photo_profile: String!, $_eq: Int!) {
  update_users(where: {id: {_eq: $_eq}}, _set: {photo_profile: $photo_profile}) {
    returning {
      id
      isLogin
      kecamatan
      kelurahan
      kota
      no_hp
      photo_profile
      password
      provinsi
      userName
    }
  }
}


  `
);

const DeleteUser = gql(
  `
  mutation MyMutation($_eq: Int!) {
  delete_users(where: {id: {_eq: $_eq}}) {
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
const DeleteUserCart = gql(
  `
mutation MyMutation($_eq: Int!) {
  delete_cart(where: {id_userName: {_eq: $_eq}}) {
    returning {
      id
      id_userName
      phone_name
      image
      quantity
      price
      phone_slug
    }
  }
}

  `
);
const DeleteUserKomentar = gql(
  `
mutation MyMutation($_eq: Int!) {
  delete_komentar(where: {id_user: {_eq: $_eq}}) {
    returning {
      id
      id_user
      jumlahDislike
      jumlahLike
      komentarUser
      phoneName
      photo_profile
      userName
    }
  }
}

  `
);
const DeleteUserCheckout = gql(
  `
mutation MyMutation($_eq: Int!) {
  delete_checkout(where: {id_user: {_eq: $_eq}}) {
    returning {
      TotalPrice
      ekspedisi
      id
      id_user
      kecamatan
      kota
      kelurahan
      namaUser
      nama_product
      no_hp
    }
  }
}

  `
);
export default {
  data() {
    return {
      modalConfirmDeleteAcc: false,
      confirmDelete: "",
      modal_loading: false,

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

      username: "",
      password: "",
      passwordBaru: "",

      modal: false,

      checkPass: false,
      modalPass: false,
      showPassword: false,

      modalImage: false,
      isChangePhoto: false,
      hiddenBtnChangePhoto: true,
      fotoUser: "",
      listPhoto: [
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394398/List%20Photo%20Untuk%20Mini%20Project/9_dia4jd.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394397/List%20Photo%20Untuk%20Mini%20Project/8_kgsiwc.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/6_pty6od.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/7_zjvjjr.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/5_bsidfa.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/4_o9vwnq.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/3_rdgm7h.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/20_wr2ui1.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394395/List%20Photo%20Untuk%20Mini%20Project/2_fqozv3.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/19_mouk6o.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/18_byvdk0.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/17_qzp7ct.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/15_y3qwxt.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/16_kadxpq.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394393/List%20Photo%20Untuk%20Mini%20Project/1_dyelga.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/11_bqwivz.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/12_e8k0wj.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/13_imkret.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/14_rq8rq4.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/10_zody30.svg",
      ],
    };
  },
  computed: {
    dataUser() {
      return this.$store.state.dataHp;
    },
  },
  methods: {
    async del() {
      this.modal_loading = true;
      if (this.confirmDelete === this.dataUser.UserLogin.username) {
        // this.modalConfirmDeleteAcc = false;

        await this.$apollo.mutate({
          mutation: DeleteUserCart,
          variables: {
            _eq: this.dataUser.UserLogin.id,
          },
        });
        await this.$apollo.mutate({
          mutation: DeleteUserKomentar,
          variables: {
            _eq: this.dataUser.UserLogin.id,
          },
        });
        await this.$apollo.mutate({
          mutation: DeleteUserCheckout,
          variables: {
            _eq: this.dataUser.UserLogin.id,
          },
        });
        await this.$apollo.mutate({
          mutation: DeleteUser,
          variables: {
            _eq: this.dataUser.UserLogin.id,
          },
        });
        this.$store.dispatch("updateLogin", false);
        localStorage.removeItem("dataHp");

        this.modal_loading = false;
        this.$Modal.success({
          title: "Akun berhasil dihapus",
        });
        this.$router.push("/login");
      } else {
        this.modal_loading = false;

        this.$Modal.error({
          title: "Akun tidak jadi dihapus",
        });
      }
    },
    GeneratePhoto() {
      let randomAngka = Math.floor(Math.random() * 20);
      this.fotoUser = this.listPhoto[randomAngka];
    },
    ChangePhoto() {
      this.$apollo.mutate({
        mutation: CHANGE_PHOTO_PROFILE,
        variables: {
          _eq: this.dataUser.UserLogin.id,
          photo_profile: this.fotoUser,
        },
      });
      this.$store.dispatch("updatePhotoProfile", this.fotoUser);
    },
    async ChangePassword() {
      let hasil = await this.$apollo.mutate({
        mutation: CHANGE_PASSWORD,
        variables: {
          _eq: this.dataUser.UserLogin.id,
          password: this.passwordBaru,
        },
      });
      let passwordBaru = hasil.data.update_users.returning[0].password;
      if (passwordBaru === this.dataUser.UserLogin.password) {
        this.$Modal.error({
          title: "Password sama",
          content: "Password sama dengan yang lama, tidak dapat ganti password",
        });
      } else {
        this.$Modal.success({
          title: "Password telah berhasil diganti",
        });
        this.$store.dispatch("updatePassword", passwordBaru);
      }
      this.passwordBaru = "";
    },
    async checkPassword() {
      let hasil = await this.$apollo.query({
        query: CHECK_PASSWORD,
        variables: {
          _eq: this.dataUser.UserLogin.id,
        },
      });
      if (hasil.data.users[0].password === this.password) {
        this.$Modal.success({
          title: "Password Benar",
        });
        this.modalPass = true;
      } else {
        this.$Modal.error({
          title: "Password salah",
        });
      }
      this.password = "";
    },
    async ChangeUserName() {
      let hasil = await this.$apollo.mutate({
        mutation: ChangeUserName,
        variables: {
          userName: this.username,
          _eq: this.dataUser.UserLogin.id,
        },
      });

      this.$store.dispatch(
        "updateUsername",
        hasil.data.update_users.returning[0].userName
      );
      this.$Modal.success({
        title: "Ganti nama berhasil",
      });
    },
    cancel(YgDiganti) {
      this.$Modal.info({
        title: `Tidak jadi ganti ${YgDiganti}`,
      });
      this.hiddenBtnChangePhoto = true;
      this.isChangePhoto = false;
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
      this.$store.dispatch("updateNoHp", this.noHp);
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
    this.username = this.dataUser.UserLogin.username;
    this.fotoUser = this.dataUser.UserLogin.photo_profile;
    let user = localStorage.getItem("dataHp");
    if (!user) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
</style>