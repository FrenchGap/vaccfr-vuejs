<template>
  <v-parallax
    :src="mastheadPath"
    class="masthead"
    dark
    max-height="500px"
  >
    <v-app-bar
      absolute
      flat
      color="black"
      dark
      height="80px"
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-side-icon>
        <v-img :src="logoPath" width="220px"></v-img>
      </v-toolbar-side-icon>

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
  </v-parallax>
</template>

<script>
export default {
  name: "AppNavigation",
  props: {
    mastheadPath: {
      required: true,
      default: require('../../assets/media/banner_vacc_france.jpg')
    }
  },
  data () {
    return {
      appTitle: "French vACC",
      drawer: false,
      items: [
        { title: "Home", url: "/" },
        { title: "ATC", url: "/atc" },
        { title: "Pilots", url: "/pilots" },
        { title: "Discord", url: "/discord" },
        { title: "Feedback", url: "/Feedback" },
        { title: "Login", url: "/login" },
      ],
      logoPath: require('../../assets/vaccfr.png'),
    }
  }
}
</script>

<style scoped>
</style>