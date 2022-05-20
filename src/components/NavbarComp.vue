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
          @keyup.native.enter="searchProduct('top-center', 'danger', 2000)"
        >
          <Button
            type="primary"
            slot="append"
            icon="ios-search"
            @click.native="searchProduct('top-center', 'danger', 2000)"
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
              <p @click="LogOut">Logout</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <!-- <b-navbar-item tag="div">
        <div class="navbar-menu">
          <div class="navbar-end">
            <b-dropdown
              position="is-bottom-left"
              append-to-body
              aria-role="menu"
            >
              <template #trigger>
                <vs-avatar circle>
                  <img :src="DataUser.photo_profile" alt="" />
                </vs-avatar>
              </template>

              <b-dropdown-item custom aria-role="menuitem">
                Logged as <b>{{ DataUser.username }}</b>
              </b-dropdown-item>
              <hr class="dropdown-divider" />

              <b-dropdown-item
                value="home"
                :active="active === 3"
                @click="goTo('/', 3)"
                aria-role="menuitem"
              >
                <i class="bx bx-home-alt"></i>
                Home
              </b-dropdown-item>
              <b-dropdown-item
                value="account"
                :active="active === 4"
                @click="goTo('/user', 4)"
                aria-role="menuitem"
              >
                <i class="bx bx-user"></i>
                Account
              </b-dropdown-item>

              <b-dropdown-item
                value="logout"
                @click="LogOut"
                aria-role="menuitem"
              >
                <i class="bx bx-log-out"></i>
                Logout
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </b-navbar-item> -->
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
      v-if="DataUser === ''"
    >
      <vs-sidebar-item id="home" v-model="active" to="/login">
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
        Login
      </vs-sidebar-item>
    </vs-sidebar>
    <vs-sidebar v-model="active" :open.sync="activeSidebar" v-else>
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

      <template #footer>
        <Button type="error" @click.native="LogOut" long ghost>Log Out</Button>
        <!-- <vs-row justify="space-between">
          <vs-avatar>
            <img :src="DataUser.photo_profile" alt="" />
          </vs-avatar>

          <vs-avatar
            badge-color="danger"
            badge-position="top-right"
            @click="goTo('/cart')"
          >
            <i class="bx bx-cart"></i>

            <template #badge> {{ dataCart }} </template>
          </vs-avatar>
        </vs-row> -->
      </template>
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
      modal: false,
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
    searchProduct(position = null, color, duration) {
      if (this.search === "") {
        this.$vs.notification({
          color,
          duration,
          progress: "auto",
          position,
          title: "Pencarianmu masih kosong",
          text: "Mohon diisi dulu inputannya agar dapat melakukan pencarian",
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

    async LogOut() {
      console.log("Kok harus di console log dulu :  ", this.DataUser);
      let keluar = confirm("Yakin ? ");
      if (keluar) {
        this.$store.dispatch("setLogin", {
          id: this.DataUser.id,
          username: this.DataUser.username,
          photo_profile: this.DataUser.photo_profile,
          login: false,
        });
        localStorage.removeItem("dataHp");
        this.$router.push("/");
      }
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