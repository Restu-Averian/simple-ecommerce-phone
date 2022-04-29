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
    query LoginProcess($userName: String_comparison_exp!, $password: String_comparison_exp!) {
    users(where: {userName: $userName, password: $password}) {
        id
        password
        userName
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
        },
      });
      if (hasilQuery.data.users.length === 0) {
        alert("Data tidak ditemukan");
      } else {
        // console.log("Hasil Query after Login : ", hasilQuery.data.users[0].id);
        this.$store.commit("setUserLogin", {
          id: hasilQuery.data.users[0].id,
          username: hasilQuery.data.users[0].userName,
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