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
        type="password"
        password
        placeholder="Password"
      />
    </vs-row>
    <vs-row class="mt-5 mb-3 mx-auto">
      <vs-col :xs="12" :lg="2" class="mx-auto">
        <Button @click="LoginProcess" long size="large" type="primary"
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
const LOGIN_PROCESS = gql(
  `
    query MyQuery($photo_profile: String_comparison_exp!, $password: String_comparison_exp!, $userName: String_comparison_exp!) {
  users(where: {photo_profile: $photo_profile, password: $password, userName: $userName}) {
    id
    password
    photo_profile
    userName
    no_hp
    provinsi
    kota
    kecamatan
    kelurahan
    isLogin
  }
}


    `
);
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
  methods: {
    async LoginProcess() {
      let hasilQuery = await this.$apollo.query({
        query: LOGIN_PROCESS,
        variables: {
          userName: {
            _eq: this.username,
          },
          password: {
            _eq: this.password,
          },
          photo_profile: {
            _eq: this.Got_Profile.photo_profile,
          },
        },
      });
      if (hasilQuery.data.users.length == 0) {
        this.$Modal.error({
          title: "Akun tidak tersedia",
          content: "Mohon diperiksa lagi inputannya",
        });
      } else {
        let HasilChangeStatus = await this.$apollo.mutate({
          mutation: CHANGE_ISLOGIN_STATUS,
          variables: {
            _eq: hasilQuery.data.users[0].id,
          },
        });
        console.log(
          "Jalan g ya hasil change status loginnya : ",
          HasilChangeStatus
        );
        this.$store.dispatch("setLogin", {
          id: hasilQuery.data.users[0].id,
          username: hasilQuery.data.users[0].userName,
          password: hasilQuery.data.users[0].password,
          photo_profile: hasilQuery.data.users[0].photo_profile,
          no_hp: hasilQuery.data.users[0].no_hp,
          login: HasilChangeStatus.data.update_users.returning[0].isLogin,
          provinsi: hasilQuery.data.users[0].provinsi,
          kota: hasilQuery.data.users[0].kota,
          kecamatan: hasilQuery.data.users[0].kecamatan,
          kelurahan: hasilQuery.data.users[0].kelurahan,
        });
        let hasil = this.$Modal.success({
          title: "Berhasil Login",
        });
        console.log("Apa ya outputnya : ", hasil);
        this.$Modal.success({
          title: "Berhasil Login",
        });
        this.$router.push("/");
      }
      console.log("hasilLoginQuery: ", hasilQuery);
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