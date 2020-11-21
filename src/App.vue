<template>
  <v-main transition="slide-x-transition">
    <router-view></router-view>
    <!-- <router-view :key="$route.fullPath"></router-view> -->
  </v-main>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
</style>