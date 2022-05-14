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
        <vs-input
          type="search"
          v-model="search"
          @keydown.enter="searchProduct(search, 'top-center', 'danger', 2000)"
          icon-after
          placeholder="Search by product name..."
          @click-icon="searchProduct(search, 'top-center', 'danger', 2000)"
        >
          <template #icon>
            <i class="bx bx-search-alt-2"></i>
          </template>
          >
        </vs-input>
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
        <vs-button @click="goTo('/login', 1)"> Login </vs-button>
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

          <vs-avatar badge-color="danger" badge-position="top-right">
            <i class="bx bx-cart"></i>

            <template #badge> {{ dataCart }} </template>
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
import gql from "graphql-tag";

const GET_CART = gql(
  `
subscription MySubscription($_eq: Int!) {
  cart(where: {id_userName: {_eq: $_eq}}) {
    IsCheckout
    id
    id_userName
    image
    phone_name
    price
    phone_slug
    quantity
  }
}



  `
);
export default {
  data() {
    return {
      dataLogin: "",
      LoginOrNot: false,
      active: "",
      search: "",
      activeSidebar: false,
      dataCart: [],
    };
  },

  computed: {
    DataUser() {
      return this.$store.state.dataHp.UserLogin;
    },
  },
  apollo: {
    $subscribe: {
      dataCart: {
        query: GET_CART,
        variables() {
          return {
            _eq: this.$store.state.dataHp.UserLogin.id,
          };
        },
        result({ data }) {
          this.dataCart = data.cart.length;
        },
      },
    },
  },
  methods: {
    searchProduct(key, position = null, color, duration) {
      if (key === "") {
        this.$vs.notification({
          color,
          duration,
          progress: "auto",
          position,
          title: "Pencarianmu masih kosong",
          text: "Mohon diisi dulu inputannya agar dapat melakukan pencarian",
        });
      }

      console.log("Search : ", key);
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
</style>