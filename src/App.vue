<template>
  <v-app>
    <v-main transition="slide-x-transition">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
</style>