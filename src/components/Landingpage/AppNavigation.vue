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

      <router-link :to="{ name: 'Landingpage.index' }">
        <v-img :src="require('@/assets/vaccfr.png')" width="220px" />
      </router-link>

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

      <v-btn
        text
        v-if="authenticationStatus() == 'login'"
        @click="authenticateProcess()"
      >
        Login
      </v-btn>
      <v-btn
        text
        v-if="authenticationStatus() == 'authed'"
        link
        :to="{ name: 'Dashboard.index' }"
      >
        My Dashboard
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
      ],
      logStatus: this.authenticationStatus(),
    }
  },
  mounted() {

  },
  methods: {
    authenticationStatus() {
      if (localStorage.getItem('user') == undefined) {
        return "login";
      } else {
        return "authed";
      }
    },

    authenticateProcess() {
      this.$store.dispatch('VatsimSSO/authenticateUser');
    },
  }
}
</script>

<style scoped>
</style>