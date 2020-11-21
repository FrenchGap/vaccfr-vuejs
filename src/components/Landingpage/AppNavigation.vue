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
        link
        v-if="$store.state.VatsimSSO.authenticated == false"
        :to="{ name: 'login' }"
      >
        Login
      </v-btn>
      <v-btn
        text
        link
        v-if="$store.state.VatsimSSO.authenticated == true"
        :to="{ name: 'Dashboard.index' }"
      >
        {{$store.state.User.fname}} {{$store.state.User.lname}}
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
      default: require('@/assets/media/banner_vacc_france.jpg')
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
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>