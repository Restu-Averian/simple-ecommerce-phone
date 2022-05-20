<template>
  <Card style="width: 80%; margin: 120px auto">
    <h1 class="title is-2 is-size-3-mobile">Login</h1>
    <vs-row class="mt-5 mb-3">
      <Input
        v-model="username"
        type="text"
        size="large"
        placeholder="Username"
      />
    </vs-row>
    <vs-row class="mt-5 mb-3">
      <Input
        v-model="password"
        :type="showPassword == true ? 'text' : 'password'"
        password
        placeholder="Password"
      />
      <Checkbox v-model="showPassword" class="my-3" size="large"
        >Tampilkan Kata Sandi</Checkbox
      >
    </vs-row>
    <vs-row class="mt-5 mb-3 mx-auto">
      <vs-col :xs="12" :lg="2" class="mx-auto">
        <Button
          @click="LoginProcess"
          long
          size="large"
          type="primary"
          :loading="loading"
          >Login</Button
        >
      </vs-col>
    </vs-row>

    <p class="small-text">
      Haven't an account before ?
      <router-link to="/register">Register here!</router-link>
    </p>
  </Card>
</template>

<script>
import gql from "graphql-tag";
const SubsUserData = gql(
  `
  subscription MySubscription($_eq: String!) {
  users(where: {userName: {_eq: $_eq}}) {
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

  `
);
// const LOGIN_PROCESS = gql(
//   `
//     query MyQuery($photo_profile: String_comparison_exp!, $password: String_comparison_exp!, $userName: String_comparison_exp!) {
//   users(where: {photo_profile: $photo_profile, password: $password, userName: $userName}) {
//     id
//     password
//     photo_profile
//     userName
//     no_hp
//     provinsi
//     kota
//     kecamatan
//     kelurahan
//     isLogin
//   }
// }

//     `
// );

const GOT_PHOTO_PROFILE = gql(
  `
  query MyQuery($_eq: Int!) {
  users(where: {userName: {_eq: $_eq}}) {
    id
    photo_profile
    userName
  }
}

  `
);
const CHANGE_ISLOGIN_STATUS = gql(
  `
  mutation MyMutation($_eq: Int!) {
  update_users(where: {id: {_eq: $_eq}}, _set: {isLogin: true}) {
    returning {
      id
      isLogin
      kecamatan
      kelurahan
      kota
      no_hp
      password
      provinsi
      photo_profile
      userName
    }
  }
}

  `
);
export default {
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      userData: "",
      loading: false,
    };
  },
  computed: {
    Got_Profile() {
      return this.$apollo.query({
        query: GOT_PHOTO_PROFILE,
        variables: {
          _eq: this.username,
        },
      });
    },
  },
  apollo: {
    $subscribe: {
      userData: {
        query: SubsUserData,
        variables() {
          return {
            _eq: this.username,
          };
        },
        result({ data }) {
          this.userData = data.users;
        },
      },
    },
  },
  methods: {
    async LoginProcess() {
      this.loading = true;
      if (this.userData.length == 0) {
        this.loading = false;
        this.$Modal.error({
          title: "Akun tidak tersedia",
          content: "Mohon diperiksa lagi inputannya",
        });
      } else {
        let HasilChangeStatus = await this.$apollo.mutate({
          mutation: CHANGE_ISLOGIN_STATUS,
          variables: {
            _eq: this.userData[0].id,
          },
        });
        console.log(
          "Jalan g ya hasil change status loginnya : ",
          HasilChangeStatus
        );

        this.$store.dispatch("setLogin", {
          id: this.userData[0].id,
          username: this.userData[0].userName,
          password: this.userData[0].password,
          photo_profile: this.userData[0].photo_profile,
          no_hp: this.userData[0].no_hp,
          login: HasilChangeStatus.data.update_users.returning[0].isLogin,
          provinsi: this.userData[0].provinsi,
          kota: this.userData[0].kota,
          kecamatan: this.userData[0].kecamatan,
          kelurahan: this.userData[0].kelurahan,
        });
        this.loading = false;
        this.$Modal.success({
          title: "Berhasil Login",
        });
        this.$router.push("/");
      }
      // console.log("hasilLoginQuery: ", user);
    },
  },
  mounted() {
    let users = localStorage.getItem("dataHp");
    if (users) {
      //Kalau key dataHp isExist
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>