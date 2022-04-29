<template>
  <div class="container">
    <h1>Register</h1>
    <form class="text-start" @submit.prevent="RegisterProcess">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Username</label>
        <input type="text" class="form-control" v-model="username" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <p class="small-text">
      Have an account ? <router-link to="/login">Login here!</router-link>
    </p>
  </div>
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
      if (hasilQuery) {
        alert("Username telah ada");
      } else {
        this.$apollo.mutate({
          mutation: RegisterProcc,
          variables: {
            object: {
              userName: this.username,
              password: this.password,
            },
          },
        });

        alert("Berhasil Register");
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>