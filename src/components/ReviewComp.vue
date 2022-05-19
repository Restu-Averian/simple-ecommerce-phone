<template>
  <section class="my-6">
    <Input
      placeholder="Username"
      size="large"
      readonly
      v-model="namaOrang"
      style="width: 100%"
    >
      <Icon type="ios-contact" slot="prefix" />
    </Input>

    <Input
      v-model="komentarOrang"
      size="large"
      class="my-4"
      type="textarea"
      placeholder="Masukkan Komentar"
      style="width: 100%"
    />
    <!-- <div class="field">
      <p class="control has-icons-left has-icons-right">
        <textarea
          class="textarea is-info"
          style="padding-left: 35px"
          v-model="komentarOrang"
        ></textarea>

        <span class="icon is-small is-left">
          <i class="bx bx-comment"></i>
        </span>
      </p>
    </div> -->
    <vs-row class="my-5 has-text-centered">
      <Button
        size="large"
        @click="AddComment('top-center', 'danger', 2000)"
        type="primary"
        >Add Comment</Button
      >
    </vs-row>
    <section v-if="countComment === 0">
      <vs-row>
        <vs-col w="12">
          <img
            src="../assets/undraw_public_discussion_re_w9up.svg"
            alt=""
            width="208px"
          />
        </vs-col>
      </vs-row>
      <vs-row class="my-5">
        <vs-col w="12">
          <h4 class="title is-3 is-size-4-mobile">Belum ada Komentar</h4>
          <h4 class="subtitle is-6 has-text-grey-light is-size-7-mobile">
            Yuk jadi yang pertama memberikan komentar terhadap handphone ini
          </h4>
        </vs-col>
      </vs-row>
    </section>
    <section v-else-if="countComment !== 0">
      <vs-row
        v-for="(komentar, index) in AllComment"
        :key="index"
        class="pt-5 mt-5"
      >
        <vs-col :lg="1" :sm="2" :xs="3">
          <img :src="komentar.photo_profile" class="has-text-left" alt="" />
        </vs-col>
        <vs-col w="9">
          <vs-row>
            <h4 class="title is-4 mb-3">{{ komentar.userName }}</h4>
          </vs-row>
          <vs-row
            ><h6 class="subtitle is-6 has-text-left">
              {{ komentar.komentarUser }}
            </h6>
          </vs-row>
        </vs-col>
      </vs-row>
    </section>
  </section>
</template>

<script>
import gql from "graphql-tag";
const COUNT_COMMENT = gql(
  `
  query MyQuery($_eq: String!) {
  komentar_aggregate(where: {phoneName: {_eq: $_eq}}) {
    aggregate {
      count
    }
  }
}

  `
);
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
export default {
  data() {
    return {
      namaOrang: "",
      komentarOrang: "",
      AllComment: [],
      countComment: "",
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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    async CountCommentFunc() {
      let hasil = await this.$apollo.query({
        query: COUNT_COMMENT,
        variables: {
          _eq: this.$route.params.detail,
        },
      });
      console.log("hasiil count comment : ", hasil);
      this.countComment = hasil.data.komentar_aggregate.aggregate.count;
    },
    dataUser() {
      let user = JSON.parse(localStorage.getItem("dataHp"));
      this.namaOrang = user.dataHp.UserLogin.username;
    },
    async AddComment(position = null, color, duration) {
      let users = JSON.parse(localStorage.getItem("dataHp"));
      if (users) {
        if (this.komentarOrang == "") {
          this.$vs.notification({
            color,
            duration,
            progress: "auto",
            position,
            title: "Komentar Kosong",
            text: "Mohon diisi dulu inputannya agar dapat memberikan komentar",
          });
        } else {
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
          this.komentarOrang = "";
        }
      } else {
        alert("Login terlebih dahulu");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.dataUser();
    this.CountCommentFunc();
  },
};
</script>

<style>
</style>