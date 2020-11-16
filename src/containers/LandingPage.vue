<template>
  <v-app>
    <app-navigation />
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
    <AppFooter />
  </v-app>
</template>

<script>
import AppNavigation from '../components/Landingpage/AppNavigation.vue';
import AppFooter from '../components/Landingpage/Footer.vue';
export default {
  components: { AppNavigation, AppFooter },
  name: 'LandingPageContainer'
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #000000;
  border: 0px none #ffffff;
  border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover {
  background: #343a40;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #444a50;
  border: 0px none #ffffff;
  border-radius: 0px;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>