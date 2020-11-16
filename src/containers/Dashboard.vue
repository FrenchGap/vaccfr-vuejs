<template>
  <v-app>
    <NavigationBar />
    <v-main transition="slide-x-transition">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "../components/App/NavigationBar";

export default {
  name: "DashboardContainer",
  components: {
    NavigationBar
  },
}
</script>

<style>

</style>