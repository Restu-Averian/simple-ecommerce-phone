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
          <!-- <h1>
            {{
              dataDetail.specifications[12].specs[1].val[0].replaceAll(
                "About",
                ""
              )
            }}
          </h1> -->
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
              <!-- <td>{{ dataDetail.specifications[0].specs[0].key }}</td> -->
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

      <!-- {{ komentar }} -->
      <ul class="list-group text-start">
        <li
          class="list-group-item"
          v-for="(comment, index) in ListKomentar"
          :key="index"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h4 class="fw-bold">{{ comment.userName }}</h4>
              <p>{{ comment.komentarUser }}</p>
            </div>
            <div>
              <i class="fa-solid fa-thumbs-up" @click="AddLike(index)"></i>
              {{ countLike }}
              <i class="fa-solid fa-thumbs-down" @click="AddDislike"></i>
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
const GET_KOMENTAR = gql(
  `
 query GetKomentar {
  komentar {
    id
    jumlahLike
    jumlahDislike
    komentarUser
    phoneName
    userName
  }
}
  `
);
const ADD_LIKE = gql(
  `
  mutation MyMutation($id: Int!) {
  update_komentar_by_pk(pk_columns: {id: $id}) {
    id
    
  }
}


  `
);
export default {
  data() {
    return {
      namaOrang: "",
      komentarOrang: "",
      ListKomentar: [],
      pesanKalauKosong: "Belum ada review",
      countLike: 0,
    };
  },
  computed: {
    dataDetail() {
      console.log(this.$store.state.dataHp.hp.data.data);
      return this.$store.state.dataHp.hp.data.data;
    },
  },

  methods: {
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

    async dataKomentar() {
      let hasilQuery = await this.$apollo.query({
        query: GET_KOMENTAR,
      });
      this.ListKomentar = hasilQuery.data.komentar;

      console.log("List Komentar : ", this.ListKomentar);

      let hasilFilter = this.ListKomentar.filter((dataKomen) => {
        console.log(dataKomen);

        return dataKomen.phoneName == this.dataDetail.phone_name;
      });
      this.ListKomentar = hasilFilter;
    },
    onCommentAdded(previousResult, { subscriptionData }) {
      const newResult = {
        messagesComment: [...previousResult.todos],
      };
      newResult.messagesComment.push(subscriptionData.data.komentar);
      console.log(subscriptionData);
      return newResult;
    },
    async AddLike(index) {
      let hasilMutation = await this.$apollo.mutate({
        mutation: ADD_LIKE,
        variables: {
          id: index,
        },
      });
      console.log("Hasil mutation Add like ", hasilMutation);
    },
    AddDislike() {
      this.countDislike++;
    },
  },
  mounted() {
    this.dataKomentar();
  },
};
</script>

<style>
</style>