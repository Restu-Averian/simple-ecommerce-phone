<template>
  <Card style="width: 80%; margin: 120px auto">
    <h1 class="title is-2 is-size-3-mobile">Register</h1>
    <vs-row class="mt-5 mb-3">
      <Input
        v-model="username"
        type="text"
        size="large"
        placeholder="Username"
      />
    </vs-row>
    <vs-row class="mt-5 mb-3">
      <Input
        v-model="password"
        type="password"
        password
        placeholder="Password"
      />
    </vs-row>
    <div class="mb-2">
      <Button @click.native="generate" type="primary" ghost
        >Generate Photo Profile</Button
      >
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Preview : </label>
      <img :src="preview" alt="" />
    </div>
    <vs-row class="mt-6 mx-auto">
      <Button @click="RegisterProcess" type="primary">Register</Button>
    </vs-row>

    <p class="small-text">
      Have an account before ?
      <router-link to="/login">Login here!</router-link>
    </p>
  </Card>
</template>

<script>
import gql from "graphql-tag";
const RegisterProcc = gql(
  `
    mutation RegisterProcc($object: users_insert_input = {}) {
    insert_users_one(object: $object) {
        id
        password
        userName
    }
    }

    `
);
const GetUsers = gql(
  `
    query GetUsers($_eq: String!) {
    users(where: {userName: {_eq: $_eq}}) {
        id
        password
        userName
    }
    }

    `
);
export default {
  data() {
    return {
      username: "",
      password: "",
      listPhoto: [
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394398/List%20Photo%20Untuk%20Mini%20Project/9_dia4jd.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394397/List%20Photo%20Untuk%20Mini%20Project/8_kgsiwc.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/6_pty6od.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/7_zjvjjr.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/5_bsidfa.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/4_o9vwnq.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/3_rdgm7h.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394396/List%20Photo%20Untuk%20Mini%20Project/20_wr2ui1.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394395/List%20Photo%20Untuk%20Mini%20Project/2_fqozv3.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/19_mouk6o.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/18_byvdk0.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/17_qzp7ct.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/15_y3qwxt.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394394/List%20Photo%20Untuk%20Mini%20Project/16_kadxpq.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394393/List%20Photo%20Untuk%20Mini%20Project/1_dyelga.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/11_bqwivz.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/12_e8k0wj.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/13_imkret.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/14_rq8rq4.svg",
        "https://res.cloudinary.com/dcvolkyfb/image/upload/v1651394392/List%20Photo%20Untuk%20Mini%20Project/10_zody30.svg",
      ],
      preview: "",
    };
  },

  methods: {
    async RegisterProcess() {
      let hasilQuery = await this.$apollo.query({
        query: GetUsers,
        variables: {
          _eq: this.username,
        },
      });
      if (this.username === "" || this.password === "" || this.preview === "") {
        alert("Masih ada yang Kosong");
      } else if (hasilQuery.data.users.length === 0) {
        this.$apollo.mutate({
          mutation: RegisterProcc,
          variables: {
            object: {
              userName: this.username,
              password: this.password,
              photo_profile: this.preview,
            },
          },
        });
        alert("Berhasil Register");
        this.$router.push("/login");
      } else {
        alert("Udah ada username");
      }
    },
    generate() {
      this.preview = this.listPhoto[Math.floor(Math.random() * 20)];
    },
  },
  mounted() {
    let users = localStorage.getItem("dataHp");
    if (users.length > 0) {
      //Kalau key dataHp isExist
      this.$router.push("/");
    } else {
      this.$router.push("/register");
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>