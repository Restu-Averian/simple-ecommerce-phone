<template>
  <nav>
    <vs-row>
      <vs-col :lg="12" :xs="6" class="has-text-left-desktop mb-3">
        <router-link exact class="title is-5 is-size-6-mobile" to="/user">
          Account Info
        </router-link>
      </vs-col>
      <vs-col :lg="12" :xs="6" class="has-text-left-desktop">
        <router-link
          exact
          class="title is-5 is-size-6-mobile mb-3"
          to="/purchase-history"
        >
          Purchase History
        </router-link>
      </vs-col>
    </vs-row>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>