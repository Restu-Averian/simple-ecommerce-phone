<template>
  <div class="container" style="margin: 120px auto">
    <vs-row>
      <Button
        ghost
        @click.native="$router.go(-1)"
        type="primary"
        icon="md-arrow-back"
        >Back</Button
      >
    </vs-row>
    <h1 class="title is-1">NOT FOUND</h1>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>