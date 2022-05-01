<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="col">
          <div class="row">
            <img
              :src="dataDetail.thumbnail"
              alt=""
              style="width: 200px"
              class="border m-auto"
            />
          </div>
          <div class="row">
            <div
              class="col border m-auto"
              v-for="(imgPhone, index) in dataDetail.phone_images"
              :key="index"
            >
              <img :src="imgPhone" alt="" width="100px" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-5 text-start">
        <div class="judulHp">
          <h2>{{ dataDetail.phone_name }}</h2>
          <button class="btn btn-light disabled">
            {{ dataDetail.brand }}
          </button>
        </div>
        <div class="addToCart">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button @click="decrement" class="btn btn-outline-primary">
              -
            </button>
            <input
              type="number"
              v-model="quantity"
              readonly
              class="text-center"
            />
            <button @click="increment" class="btn btn-outline-primary">
              +
            </button>
          </div>
          <button class="btn btn-primary m-5" @click="AddToCart()">
            Add to Cart
          </button>
        </div>
        <div class="deskripsi my-3">
          <h4>Deskripsi</h4>
          <table class="table table-hover">
            <tr>
              <th>Storage</th>
              <td>{{ dataDetail.storage }}</td>
            </tr>
            <tr>
              <th>Dimension</th>
              <td>{{ dataDetail.dimension }}</td>
            </tr>
            <tr>
              <th>OS</th>
              <td>{{ dataDetail.os }}</td>
            </tr>
            <tr>
              <th>Specification</th>
              <td
                v-for="(spec, index) in dataDetail.specifications"
                :key="index"
              >
                <tr>
                  <td>{{ spec.title }}</td>
                </tr>
                <tr v-for="(detSpecs, index) in spec.specs" :key="index">
                  <td>
                    {{ detSpecs.key }}
                  </td>
                  <td>
                    {{ detSpecs.val }}
                  </td>
                </tr>
              </td>
            </tr>
            <tr>
              <th>Released Date</th>
              <td>{{ dataDetail.release_date }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="row my-5">
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1"
          ><i class="fa-regular fa-user"></i
        ></span>
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="namaOrang"
        />
      </div>
      <div class="input-group">
        <span class="input-group-text"
          ><i class="fa-regular fa-comment"></i
        ></span>
        <textarea
          class="form-control"
          placeholder="Masukkan komentar"
          aria-label="With textarea"
          v-model="komentarOrang"
        ></textarea>
      </div>
      <div class="input-group my-4">
        <button class="btn btn-outline-primary" @click="AddComment">
          Kirim komentar
        </button>
      </div>
      <ul class="list-group text-start">
        <li
          class="list-group-item"
          v-for="(komentar, index) in AllComment"
          :key="index"
        >
          <p>User : {{ komentar.userName }}</p>
          <p>Komentar : {{ komentar.komentarUser }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import axios from "axios";
const ADD_COMMENT = gql(
  `
  mutation AddComment($object: komentar_insert_input = {}) {
  insert_komentar_one(object: $object) {
    id
    komentar
    phoneName
    userName
  }
}

  `
);

const SubscriptionComment = gql(
  `
  subscription SubscriptionComment($_eq: String!) {
  komentar(order_by: {userName: asc}, where: {phoneName: {_eq: $_eq}}) {
    id
    jumlahDislike
    jumlahLike
    komentarUser
    phoneName
    userName
  }
}
  `
);
const ADD_CART = gql(
  `
  mutation MyMutation($objects: [cart_insert_input!] = {}) {
  insert_cart(objects: $objects) {
    returning {
      id_userName
      id
      phone_slug
      phone_name
      quantity
      user {
        userName
      }
    }
  }
}

  `
);
export default {
  data() {
    return {
      namaOrang: "",
      komentarOrang: "",
      dataDetail: [],
      pesanKalauKosong: "Belum ada review",
      LikeOrNot: false,
      DislikeOrNot: false,
      AllComment: [],
      quantity: 0,
    };
  },
  apollo: {
    $subscribe: {
      AllComment: {
        query: SubscriptionComment,
        variables() {
          return {
            _eq: this.$route.params.detail,
          };
        },
        result({ data }) {
          this.AllComment = data.komentar;
        },
      },
    },
  },
  methods: {
    fetchDataDetail() {
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/${this.$route.params.detail}`
        )
        .then((response) => {
          this.dataDetail = response.data.data;
        });
    },
    decrement() {
      if (this.quantity <= 0) {
        alert("Tidak bisa kecil dari 0");
      } else {
        this.quantity -= 1;
      }
    },
    increment() {
      if (this.quantity >= 90) {
        alert("Melebihi stock");
      } else {
        this.quantity += 1;
      }
    },
    AddToCart() {
      let Users = JSON.parse(localStorage.getItem("dataHp"));

      if (Users) {
        if (this.quantity == 0) {
          alert("Masih 0");
        } else {
          this.$apollo.mutate({
            mutation: ADD_CART,
            variables: {
              objects: {
                id_userName: Users.dataHp.UserLogin.id,
                phone_slug: this.$route.params.detail,
                image: this.dataDetail.thumbnail,
                quantity: this.quantity,
                phone_name: this.dataDetail.phone_name,
              },
            },
          });
          alert("Berhasil masukkan ke cart");
        }
      } else {
        alert("Login terlebih dahulu");
        this.$router.push("/login");
      }
    },
    async AddComment() {
      let users = localStorage.getItem("dataHp");

      if (users) {
        let a = await this.$apollo.mutate({
          mutation: ADD_COMMENT,
          variables: {
            object: {
              komentarUser: this.komentarOrang,
              phoneName: this.$route.params.detail,
              userName: this.namaOrang,
            },
          },
        });
        console.log("hasil mutate", a);
        this.namaOrang = "";
        this.komentarOrang = "";
      } else {
        alert("Login terlebih dahulu");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.fetchDataDetail();
  },
};
</script>

<style>
</style>