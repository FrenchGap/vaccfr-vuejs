<template>
  <v-app>
    <v-main transition="slide-x-transition">
      <router-view :key="$route.fullPath"></router-view>
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