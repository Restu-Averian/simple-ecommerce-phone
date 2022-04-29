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
      <!-- <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(komentar, index) in dataKomentar.data.komentar"
          :key="index"
        >
          <p>User : {{ komentar.userName }}</p>
          <p>Komentar : {{ komentar.komentar }}</p>
        </li>
      </ul> -->
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
const GET_KOMENTAR = gql(
  `
  query GetKomentar {
  komentar {
    id
    komentar
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
      dataKomentar: [],
      dataDetail: [],
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
    AddComment() {
      this.$apollo.mutate({
        mutation: ADD_COMMENT,
        variables: {
          object: {
            komentar: this.komentarOrang,
            phoneName: this.dataDetail.phone_name,
            userName: this.namaOrang,
          },
        },
      });
      this.namaOrang = "";
      this.komentarOrang = "";
    },
    async GetKomentar() {
      this.dataKomentar = await this.$apollo.query({
        query: GET_KOMENTAR,
      });
      console.log("hasil query", this.dataKomentar);
    },
  },

  mounted() {
    this.fetchDataDetail();
    this.GetKomentar();
  },
};
</script>

<style>
</style>