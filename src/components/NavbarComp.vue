<template>
  <div class="center">
    <vs-navbar
      fixed
      shadow
      padding-scroll
      v-model="active"
      rightCollapsed
      shadowScroll
      class="px-3"
    >
      <template #left>
        <Button
          type="primary"
          class="mr-3"
          ghost
          @click="activeSidebar = !activeSidebar"
          icon="ios-menu"
          shape="circle"
        ></Button>
      </template>
      <template>
        <Input
          placeholder="Search Product..."
          style="width: auto"
          size="large"
          class="mr-3"
          v-model="search"
          @keyup.native.enter="searchProduct"
        >
          <Button
            type="primary"
            slot="append"
            icon="ios-search"
            @click.native="searchProduct"
          ></Button>
        </Input>
      </template>
      <template #right v-if="DataUser.login">
        <Button
          size="large"
          icon="ios-cart-outline"
          type="primary"
          shape="circle"
          @click.native="goTo('/cart')"
          ghost
        ></Button>

        <Dropdown trigger="click">
          <vs-avatar>
            <img :src="DataUser.photo_profile" alt="" />
          </vs-avatar>

          <DropdownMenu slot="list">
            <DropdownItem>
              <p @click="GoToUserPage">Account Information</p>
            </DropdownItem>
            <DropdownItem>
              <p @click="modalLogout = true">Logout</p>
            </DropdownItem>
            <Modal v-model="modalLogout">
              <template #header>
                <p style="color: #f60; text-align: center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>Logout Konfirmasi</span>
                </p>
              </template>
              <p class="subtitle is=5">Apakah kamu yakin untuk keluar ?</p>
              <template #footer>
                <Button type="error" @click="LogOut" ghost>Logout</Button>
              </template>
            </Modal>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template #right v-else>
        <Button type="primary" @click="goTo('/login', 1)" size="large"
          >Login</Button
        >
      </template>
    </vs-navbar>
    <vs-sidebar
      v-model="active"
      :open.sync="activeSidebar"
      v-if="DataUser.login"
    >
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item id="home" v-model="active" to="/">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item id="cart" v-model="active" to="/cart">
        <template #icon>
          <i class="bx bx-cart"></i>
        </template>
        Cart
      </vs-sidebar-item>

      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-group"></i>
            </template>
            Account
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item id="Account" to="/user" v-model="active">
          <template #icon>
            <i class="bx bx-user"></i>
          </template>
          Account Information
        </vs-sidebar-item>
        <vs-sidebar-item id="twitter" to="/purchase-history">
          <template #icon>
            <i class="bx bx-history"></i>
          </template>
          Purchase History
        </vs-sidebar-item>
      </vs-sidebar-group>

      <Button type="error" @click.native="modalLogout = true" long ghost
        >Log Out</Button
      >
      <Modal v-model="modalLogout">
        <template #header>
          <p style="color: #f60; text-align: center">
            <Icon type="ios-information-circle"></Icon>
            <span>Logout Konfirmasi</span>
          </p>
        </template>
        <p class="subtitle is=5">Apakah kamu yakin untuk keluar ?</p>
        <template #footer>
          <Button type="error" @click="LogOut" ghost>Logout</Button>
        </template>
      </Modal>
      <template #footer> </template>
    </vs-sidebar>
    <vs-sidebar v-model="active" :open.sync="activeSidebar" v-else>
      <vs-sidebar-item id="home" v-model="active" to="/">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item id="login" v-model="active" to="/login">
        <template #icon>
          <i class="bx bx-log-in-circle"></i>
        </template>
        Login
      </vs-sidebar-item>
      <vs-sidebar-item id="register" v-model="active" to="/register">
        <template #icon>
          <i class="bx bx-registered"></i>
        </template>
        Register
      </vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dataLogin: "",
      active: "",
      search: "",
      dataSearch: [],
      activeSidebar: false,
      dataCart: [],
      value1: "",
      data1: [],
      name: "",
      selected: null,
      modalLogout: false,
    };
  },

  computed: {
    DataUser() {
      if (this.$store.state.dataHp.UserLogin === "") {
        console.log("data user : ");
      }
      return this.$store.state.dataHp.UserLogin;
    },
  },
  // apollo: {
  //   $subscribe: {
  //     dataCart: {
  //       query: GET_CART,
  //       variables() {
  //         return {
  //           _eq: this.$store.state.dataHp.UserLogin.id,
  //         };
  //       },
  //       result({ data }) {
  //         if (this.$store.state.dataHp.UserLogin === "") {
  //           console.log("kalau blm ada ");
  //         } else {
  //           this.dataCart = data.cart.length;
  //         }
  //       },
  //     },
  //   },
  // },
  methods: {
    searchProduct() {
      if (this.search === "") {
        this.$Modal.error({
          title: "Pencarianmu masih kosong",
          content: "Mohon diisi dulu inputannya agar dapat melakukan pencarian",
        });
      } else {
        axios
          .get(
            `https://api-mobilespecs.azharimm.site/v2/search?query=${this.search}`
          )
          .then((result) => {
            this.dataSearch = result.data.data.phones;
            console.log("hasil search : ", this.dataSearch);
          });
        this.$router.push(`/search/${this.search}`);
        this.search = "";
      }
    },
    goTo(path) {
      console.log("path : ", path);
      this.$router.push(path);
    },
    GoToUserPage() {
      this.$router.push("/user");
      console.log("clicked");
    },

    LogOut() {
      console.log("Kok harus di console log dulu :  ", this.DataUser);
      this.$store.dispatch("updateLogin", false);
      localStorage.removeItem("dataHp");
      this.$router.push("/");
      this.modalLogout = false;
    },
  },
};
</script>

<style scoped>
.vs-input {
  width: 300px;
}
vs-avatar {
  cursor: pointer;
}
input {
  border: 1px solid red;
}
.control.has-icons-left .input,
.control.has-icons-left .select select {
  padding-left: 0.5em;
}
</style>