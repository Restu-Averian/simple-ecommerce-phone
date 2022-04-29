<template>
  <div class="container">
    {{ $route.params.detail }}
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
      <div class="col-9 text-start">
        <div class="judulHp">
          <h2>{{ dataDetail.phone_name }}</h2>
          <button class="btn btn-light disabled">
            {{ dataDetail.brand }}
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

    <!-- Komentar -->
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

      {{ dataKomentar }}
      


      <ul class="list-group text-start">

        <li
          class="list-group-item"
          v-for="(comment, index) in AllComment"
          :key="index"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              {{ comment.id }}
              <h4 class="fw-bold">{{ comment.userName }}</h4>
              <p>{{ comment.komentarUser }}</p>
            </div>
            <div>
              <i
                class="fa-solid fa-thumbs-up pointer"
                id="pointer-like"
                @click="AddLike(comment.id)"
              ></i>
              {{ comment.jumlahLike }}
              <i
                class="fa-solid fa-thumbs-down pointer pointer-dislike"
                @click="AddDislike(comment.id)"
              ></i>
              {{ comment.jumlahDislike }}
            </div>
          </div>
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
    jumlahDislike
    jumlahLike
    komentarUser
    phoneName
    userName
  }
}

  `
);

const ADD_LIKE_DISLIKE = gql(
  `
  mutation MyMutation($id: Int!, $_inc: komentar_inc_input!) {
  update_komentar_by_pk(pk_columns: {id: $id}, _inc: $_inc) {
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
    };
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
 

  
    async AddComment() {
      // Validasi untuk nama yg sama blum fix

      let a = await this.$apollo.mutate({

        mutation: ADD_COMMENT,
        variables: {
          object: {
            komentarUser: this.komentarOrang,
            phoneName: this.dataDetail.phone_name,
            userName: this.namaOrang,
          },
        },
      });
      console.log("hasil mutate", a);
      this.namaOrang = "";
      this.komentarOrang = "";
    },
   
   

    //Process of Like
    async AddLike(index) {
      if (this.LikeOrNot === false) {
        this.LikeOrNot = true;
        let hasilMutation = await this.$apollo.mutate({
          mutation: ADD_LIKE_DISLIKE,
          variables: {
            id: index,
            _inc: {
              jumlahLike: 1,
            },
          },
        });

        //Save into LocalStorage
        this.$store.commit("setLike", [
          {
            id: hasilMutation.data.update_komentar_by_pk.id,
            like: this.LikeOrNot,
          },
        ]);
        console.log("Hasil mutation Add like ", hasilMutation);
      } else if (this.LikeOrNot === true) {
        this.LikeOrNot = false;

        let hasilMutation = await this.$apollo.mutate({
          mutation: ADD_LIKE_DISLIKE,
          variables: {
            id: index,
            _inc: {
              jumlahLike: -1,
            },
          },
        });
        this.$store.commit("setLike", [
          {
            id: hasilMutation.data.update_komentar_by_pk.id,
            like: this.LikeOrNot,
          },
        ]);

        console.log("Hasil mutation Add like ", hasilMutation);
      }
      console.log(this.LikeOrNot);
    },


  mounted() {
    this.fetchDataDetail();
    this.GetKomentar();

    // Process of Dislike
    async AddDislike(index) {
      if (this.DislikeOrNot === false) {
        this.DislikeOrNot = true;
        let hasilMutation = await this.$apollo.mutate({
          mutation: ADD_LIKE_DISLIKE,
          variables: {
            id: index,
            _inc: {
              jumlahDislike: 1,
            },
          },
        });

        //Save into LocalStorage
        this.$store.commit("setDislike", [
          {
            id: hasilMutation.data.update_komentar_by_pk.id,
            dislike: this.DislikeOrNot,
          },
        ]);

        console.log("Hasil mutation Add like ", hasilMutation);
      } else if (this.DislikeOrNot === true) {
        this.DislikeOrNot = false;

        let hasilMutation = await this.$apollo.mutate({
          mutation: ADD_LIKE_DISLIKE,
          variables: {
            id: index,
            _inc: {
              jumlahDislike: -1,
            },
          },
        });
        //Save into LocalStorage
        this.$store.commit("setDislike", [
          {
            id: hasilMutation.data.update_komentar_by_pk.id,
            dislikelike: this.DislikeOrNot,
          },
        ]);

        console.log("Hasil mutation Add like ", hasilMutation);
      }
      console.log(this.LikeOrNot);
    },

  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>