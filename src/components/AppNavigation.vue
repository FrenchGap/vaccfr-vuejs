<template>
  <v-app-bar
    app
    flat
    color="black"
    dark
    clipped-left
  >
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-toolbar-title>French vACC</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-for="(item, index) in items"
      :key="index"
      text
      link
      :to="item.url"
    >
      {{ item.title }}
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {
  name: "AppNavigation",
  data () {
    return {
      appTitle: "French vACC",
      drawer: false,
      items: [
        { title: "Home", url: "/" },
        { title: "ATC", url: "/atc" },
        { title: "Pilots", url: "/pilots" },
        { title: "Login", url: "/login" },
      ]
    }
  }
}
</script>

<style scoped>

</style>