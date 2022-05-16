<template>
  <div class="center">
    <vs-navbar
      fixed
      shadow
      padding-scroll
      hideScroll
      v-model="active"
      shadowScroll
      class="px-3"
    >
      <template #left>
        <vs-button @click="activeSidebar = !activeSidebar" flat icon>
          <i class="bx bx-menu"></i>
        </vs-button>
      </template>
      <template>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input is-info"
              type="search"
              v-model="search"
              @keydown.enter="searchProduct('top-center', 'danger', 2000)"
              placeholder="Search by product name..."
              @click-icon="searchProduct('top-center', 'danger', 2000)"
            />

            <span class="icon is-small is-right">
              <i class="bx bx-search-alt-2"></i>
            </span>
          </p>
        </div>
      </template>
      <template #right v-if="DataUser.login">
        <vs-avatar
          badge-color="danger"
          @click="goTo('/cart')"
          badge-position="top-right"
          class="mr-3"
        >
          <i class="bx bx-cart"></i>
          <template #badge> {{ dataCart }} </template>
        </vs-avatar>
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
        <vs-button
          @click="goTo('/login', 1)"
          style="padding: 2px 6px; font-size: 18px"
        >
          Login
        </vs-button>
      </template>
    </vs-navbar>

    <vs-sidebar v-model="active" :open.sync="activeSidebar">
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item id="home" v-model="active" to="/">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
        Home
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
            <i class="bx bxl-instagram"></i>
          </template>
          Account Information
        </vs-sidebar-item>
        <vs-sidebar-item id="twitter">
          <template #icon>
            <i class="bx bxl-twitter"></i>
          </template>
          Purchase History
        </vs-sidebar-item>
      </vs-sidebar-group>

      <template #footer>
        <vs-row justify="space-between">
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
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
// import gql from "graphql-tag";
import axios from "axios";

// const GET_CART = gql(
//   `
// subscription MySubscription($_eq: Int!) {
//   cart(where: {id_userName: {_eq: $_eq}, user: {isLogin: {_eq: true}}}) {
//     IsCheckout
//     id
//     id_userName
//     image
//     phone_name
//     price
//     phone_slug
//     quantity
//   }
// }

//   `
// );
export default {
  data() {
    return {
      dataLogin: "",
      LoginOrNot: false,
      active: "",
      search: "",
      dataSearch: [],
      activeSidebar: false,
      dataCart: [],
      value1: "",
      data1: [],
      name: "",
      selected: null,
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