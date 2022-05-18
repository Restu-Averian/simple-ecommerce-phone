<template>
  <div class="container" style="margin: 120px auto">
    <vs-row>
      <vs-col class="has-text-left">
        <h1 class="title is-2 is-size-3-mobile">Profile</h1>
      </vs-col>
      <vs-col class="has-text-left">
        <p class="subtitle is-5 is-size-5-mobile">
          Here you can manage your account
        </p>
      </vs-col>
    </vs-row>
    <Divider />
    <vs-row class="my-5">
      <vs-col vs-align="center" :lg="5" :xs="12" class="p-5">
        <nav-in-user />
      </vs-col>

      <vs-col :lg="7" :xs="12"> <purchase-history-comp /></vs-col>
    </vs-row>
  </div>
</template>

<script>
import PurchaseHistoryComp from "../components/PurchaseHistoryComp.vue";
import NavInUser from "../components/NavInUser.vue";

export default {
  components: {
    PurchaseHistoryComp,
    NavInUser,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>