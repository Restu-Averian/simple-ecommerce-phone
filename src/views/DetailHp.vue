<template>
  <div class="container mx-auto" style="margin: 120px auto">
    <vs-row>
      <vs-col
        :lg="4"
        :sm="6"
        :xs="12"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        w="4"
      >
        <image-detail-hp />
      </vs-col>
      <vs-col w="8" :lg="4" :sm="6" :xs="12">
        <phone-name-detail />
      </vs-col>
    </vs-row>
    <vs-row class="mt-5 mb-3">
      <Divider
        ><h1 class="title is-3 is-size-4-mobile">
          Deskripsi dan Review
        </h1></Divider
      >
    </vs-row>
    <Tabs>
      <TabPane label="Deskripsi">
        <deskripsi-detail />
      </TabPane>
      <TabPane label="Review"> <review-comp /> </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ImageDetailHp from "../components/ImageDetailHp.vue";
import PhoneNameDetail from "../components/PhoneNameDetail.vue";
import DeskripsiDetail from "../components/DeskripsiDetail.vue";
import ReviewComp from "../components/ReviewComp.vue";
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
  components: {
    ImageDetailHp,
    PhoneNameDetail,
    DeskripsiDetail,
    ReviewComp,
  },
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