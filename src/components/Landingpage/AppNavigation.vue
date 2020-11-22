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
        :to="{ name: item.name }"
        exact
        class="d-none d-md-flex"
      >
        {{ item.title }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        text
        link
        v-if="$store.state.VatsimSSO.authenticated == false"
        :to="{ name: 'login' }"
        class="d-none d-md-flex"
      >
        SSO Login
      </v-btn>
      <v-btn
        text
        link
        v-if="$store.state.VatsimSSO.authenticated == true"
        :to="{ name: 'Dashboard.index' }"
        class="d-none d-md-flex"
      >
        {{$store.state.User.fname}} {{$store.state.User.lname}}
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            dark
            v-bind="attrs"
            v-on="on"
            class="d-xs d-md-none"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            link
            :to="{ name: item.name }"
            exact
          >
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            link
            v-if="$store.state.VatsimSSO.authenticated == false"
            :to="{ name: 'login' }"
          >
            <v-list-item-title>SSO Login</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            v-if="$store.state.VatsimSSO.authenticated == true"
            :to="{ name: 'Dashboard.index' }"
          >
            <v-list-item-title>{{$store.state.User.fname}} {{$store.state.User.lname}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
        { title: "Home", name: "Landingpage.index" },
        { title: "ATC", name: "Landingpage.ATC" },
        { title: "Pilots", name: "Landingpage.pilots" },
        { title: "Discord", name: "Landingpage.discord" },
        { title: "Feedback", name: "Landingpage.feedback" },
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