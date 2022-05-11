<template>
  <div id="app">
    <!-- {{ dataLogin.isLogin }} -->
    <nav>
      <div v-if="DataUser.login">
        <span @click="LogOut" class="btn btn-danger">Logout</span>
        <div @click="GoToUserPage">
          <p>
            Login as <img :src="DataUser.photo_profile" alt="" />
            {{ DataUser.username }}
          </p>
        </div>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link> |
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/cart">Cart</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import gql from "graphql-tag";
const CHANGE_ISLOGIN_STATUS = gql(
  `
  mutation MyMutation($_eq: Int!) {
  update_users(where: {id: {_eq: $_eq}}, _set: {isLogin: false}) {
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

let Users = JSON.parse(localStorage.getItem("dataHp"));

export default {
  data() {
    return {
      dataLogin: "",
      LoginOrNot: false,
    };
  },

  computed: {
    DataUser() {
      return this.$store.state.dataHp.UserLogin;
    },
  },
  methods: {
    GoToUserPage() {
      this.$router.push("/user");
    },

    async LogOut() {
      let hasilQueryLogout = await this.$apollo.mutate({
        mutation: CHANGE_ISLOGIN_STATUS,
        variables: {
          _eq: Users.dataHp.UserLogin.id,
        },
      });
      console.log("Kok harus di console log dulu :  ", this.DataUser);
      let keluar = confirm("Yakin ? ");
      if (keluar) {
        this.$store.dispatch("setLogin", {
          id: this.DataUser.id,
          username: this.DataUser.username,
          photo_profile: this.DataUser.photo_profile,
          login: hasilQueryLogout.data.update_users.returning[0].isLogin,
        });
        localStorage.removeItem("dataHp");
      }
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
