<template>
  <div class="container">
    <h1>Login</h1>
    <form class="text-start" @submit.prevent="LoginProcess">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Username</label>
        <input type="text" class="form-control" v-model="username" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p class="small-text">
      Haven't an account before ?
      <router-link to="/register">Register here!</router-link>
    </p>
  </div>
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
        alert("Data tidak ditemukan");
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
          photo_profile: hasilQuery.data.users[0].photo_profile,
          login: HasilChangeStatus.data.update_users.returning[0].isLogin,
        });
        alert("Berhasil Login");
        this.$router.push("/");
      }
      console.log("hasilLoginQuery: ", hasilQuery);
    },
  },
  mounted() {
    let users = localStorage.getItem("dataHp");
    if (users.length > 0) {
      //Kalau key dataHp isExist
      this.$router.push("/");
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
</style>