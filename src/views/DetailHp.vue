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

          <!-- Kalau tidak ada array 12 -->
          <h3
            v-if="!dataDetail.specifications[12]"
            :disabled="(disabel = true)"
          ></h3>

          <!-- Kalau ada array 12, namun tidak ada price -->
          <p
            v-else-if="
              Object.assign({}, ...dataDetail.specifications[12].specs).key !==
              'Price'
            "
            :disabled="(disabel = true)"
          ></p>

          <!-- Kalau mata uang rupee -->
          <h3
            v-else-if="
              Object.assign(
                {},
                ...dataDetail.specifications[12].specs
              ).val[0].includes('₹')
            "
          >
            Rp
            {{
              Object.assign({}, ...dataDetail.specifications[12].specs)
                .val[0].slice(1)
                .replaceAll(",", "") *
              180 *
              quantity
            }}
          </h3>

          <!-- Kalau mata uang eur -->
          <!-- Kalau ada array 12 -->
          <h3
            v-else-if="
              Object.assign(
                {},
                ...dataDetail.specifications[12].specs
              ).val[0].includes('EUR')
            "
          >
            Rp
            {{
              Object.assign(
                {},
                ...dataDetail.specifications[12].specs
              ).val[0].slice(5, -3) *
              14000 *
              quantity
            }}
          </h3>

          <!-- Kalau mata uang C -->
          <!-- Kalau ada array 12 -->
          <h3
            v-else-if="
              Object.assign(
                {},
                ...dataDetail.specifications[12].specs
              ).val[0].includes('$')
            "
          >
            Rp
            {{
              Object.assign(
                {},
                ...dataDetail.specifications[12].specs
              ).val[0].slice(1, 5) *
              14400 *
              quantity
            }}
          </h3>

          <!-- Kalau mata uang Rp -->
          <!-- Kalau ada array 12 -->
          <h3
            v-else-if="
              Object.assign(
                {},
                ...dataDetail.specifications[12].specs
              ).val[0].includes('Rp')
            "
          >
            Rp
            {{
              Object.assign({}, ...dataDetail.specifications[12].specs)
                .val[0].slice(-9, -1)
                .replaceAll(",", "") *
              14400 *
              quantity
            }}
          </h3>

          <p v-else :disabled="(disabel = true)"></p>
        </div>
        <div class="addToCart">
          <!-- Kalau informasi g ada -->
          <div v-if="disabel == true" class="alert alert-danger">
            Maaf, barang tidak bisa dibeli karena stok habis
          </div>

          <!-- Kalau informasi ada -->
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
            v-else
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
            <button
              class="btn btn-primary m-5"
              :disabled="disabel"
              @click="AddToCart()"
            >
              Add to Cart
            </button>
          </div>
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
          readonly
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
      <div
        class="row text-start mb-5"
        v-for="(komentar, index) in AllComment"
        :key="index"
      >
        <div class="col-1">
          <img :src="komentar.photo_profile" alt="" />
        </div>
        <div class="col-9">
          <h3>{{ komentar.userName }}</h3>
          <p>{{ komentar.komentarUser }}</p>
        </div>
      </div>
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
    komentarUser
    phoneName
    userName
    photo_profile
    id_user
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
    id_user
    photo_profile

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
      price
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
      AllComment: [],
      quantity: 1,
      disabel: false,
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
    dataUser() {
      let user = JSON.parse(localStorage.getItem("dataHp"));
      this.namaOrang = user.dataHp.UserLogin.username;
    },
    fetchDataDetail() {
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/${this.$route.params.detail}`
        )
        .then((response) => {
          console.log("hasil : ", response);
          this.dataDetail = response.data.data;
        });
    },

    decrement() {
      if (this.quantity <= 1) {
        alert("Tidak bisa 0");
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
    KalauTidakAdaHarga() {
      if (
        Object.assign({}, ...this.dataDetail.specifications[12].specs).key ==
        "Colors"
      ) {
        this.disabel = true;
      }
    },
    async AddToCart() {
      let Users = JSON.parse(localStorage.getItem("dataHp"));

      //Check login or not
      if (Users) {
        if (!this.dataDetail.specifications[12]) {
          // alert("Barang kosong");
          this.disabel = true;
        } else {
          let TotalHarga;
          if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("₹")
          ) {
            TotalHarga =
              Object.assign({}, ...this.dataDetail.specifications[12].specs)
                .val[0].slice(1)
                .replaceAll(",", "") *
              180 *
              this.quantity;
          } else if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("EUR")
          ) {
            TotalHarga =
              Object.assign(
                {},
                ...this.dataDetail.specifications[12].specs
              ).val[0].slice(5, -3) *
              14000 *
              this.quantity;
          } else if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("$")
          ) {
            TotalHarga =
              Object.assign(
                {},
                ...this.dataDetail.specifications[12].specs
              ).val[0].slice(1, 5) *
              14400 *
              this.quantity;
          } else if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("C$")
          ) {
            TotalHarga =
              Object.assign(
                {},
                ...this.dataDetail.specifications[12].specs
              ).val[0].slice(1, 5) *
              14400 *
              this.quantity;
          } else if (
            Object.assign(
              {},
              ...this.dataDetail.specifications[12].specs
            ).val[0].includes("Rp")
          ) {
            TotalHarga =
              Object.assign({}, ...this.dataDetail.specifications[12].specs)
                .val[0].slice(-9, -1)
                .replaceAll(",", "") *
              14400 *
              this.quantity;
          }

          console.log("Total harga : ", TotalHarga);
          let hasilAddCart = await this.$apollo.mutate({
            mutation: ADD_CART,
            variables: {
              objects: {
                id_userName: Users.dataHp.UserLogin.id,
                phone_slug: this.$route.params.detail,
                image: this.dataDetail.thumbnail,
                quantity: this.quantity,
                phone_name: this.dataDetail.phone_name,
                price: TotalHarga,
              },
            },
          });
          console.log("Hasil Add to Cart : ", hasilAddCart);
          alert("Berhasil masukkan ke cart");
        }
      } else {
        alert("Login terlebih dahulu");
        this.$router.push("/login");
      }
    },
    async AddComment() {
      let users = JSON.parse(localStorage.getItem("dataHp"));
      if (users) {
        let a = await this.$apollo.mutate({
          mutation: ADD_COMMENT,
          variables: {
            object: {
              photo_profile: users.dataHp.UserLogin.photo_profile,
              id_user: users.dataHp.UserLogin.id,
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
    this.dataUser();
  },
};
</script>

<style>
</style>