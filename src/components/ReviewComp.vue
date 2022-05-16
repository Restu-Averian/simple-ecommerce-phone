<template>
  <section class="my-6">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input is-info"
          type="text"
          placeholder="Username"
          readonly
          v-model="namaOrang"
        />
        <span class="icon is-small is-left">
          <i class="bx bx-user"></i>
        </span>
      </p>
    </div>
    <div class="field">
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
    </div>
    <vs-row class="my-5 has-text-centered">
      <vs-button @click="AddComment">Add Comment</vs-button>
    </vs-row>

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
</template>

<script>
import gql from "graphql-tag";
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
      tes: "",
      formInline: {
        user: "",
        password: "",
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
      },
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
    dataUser() {
      let user = JSON.parse(localStorage.getItem("dataHp"));
      this.namaOrang = user.dataHp.UserLogin.username;
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
        this.komentarOrang = "";
      } else {
        alert("Login terlebih dahulu");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.dataUser();
  },
};
</script>

<style>
</style>