<template>
  <v-footer
    inset
    class="font-weight-medium"
  >
    <v-col
      class="text-left"
      cols="6"
    >
      {{ new Date().getFullYear() }} — <strong>Peter Paré</strong>
    </v-col>
    <v-col
      class="text-right"
      cols="6"
    >
      Version <strong>0.1 (beta)</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
}
</script>

<style>

</style>