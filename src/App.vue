<template>
  <div id="app">
    <nav>
      <div v-if="LoginOrNot == true">
        <span @click="LogOut" class="btn btn-danger">Logout</span>
        <p>Login as {{ dataLogin }}</p>
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
export default {
  data() {
    return {
      LoginOrNot: false,
      dataLogin: "",
    };
  },
  computed: {},

  methods: {
    userLogin() {
      let user = localStorage.getItem("dataHp");
      let dataUser = JSON.parse(user);
      if (dataUser !== null) {
        //Udh Login
        this.dataLogin = dataUser.dataHp.UserLogin.username;
        this.LoginOrNot = true;
      } else {
        // Blum Login
        this.LoginOrNot = false;
        console.log("it's null");
      }
      console.log(dataUser);
    },
    LogOut() {
      let keluar = confirm("Yakin dek ? ");
      if (keluar) {
        localStorage.removeItem("dataHp");
      } else {
        alert("Bacot luwh dek");
      }
    },
  },
  mounted() {
    this.userLogin();
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
