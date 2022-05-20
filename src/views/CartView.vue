<template>
  <div class="container" style="margin: 120px auto">
    <h1 class="title is-3 is-size-4-mobile">Cart</h1>
    <cart-component />
  </div>
</template>

<script>
import CartComponent from "../components/CartComponent.vue";

export default {
  components: {
    CartComponent,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
.phone-name {
  cursor: pointer;
}
</style>