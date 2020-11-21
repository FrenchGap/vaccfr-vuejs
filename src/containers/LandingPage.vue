<template>
  <v-app>
    <app-navigation :mastheadPath="mastheadImageLink" />
    <v-main transition="slide-x-transition">
      <router-view @mastHeadRequired="newMastheadImage"></router-view>
    </v-main>
    <AppFooter />
    <v-overlay
      :value="$store.state.AppState.loadingContent"
      opacity="0.8"
    >
      <v-progress-circular
        indeterminate
        color="white"
        size="100"
        width="5"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/Landingpage/AppNavigation.vue';
import AppFooter from '@/components/Landingpage/Footer.vue';
export default {
  components: { AppNavigation, AppFooter },
  name: 'LandingPageContainer',
  data() {
    return {
      mastheadImageLink: require('@/assets/media/banner_vacc_france.jpg')
    }
  },
  methods: {
    newMastheadImage(link) {
      this.mastheadImageLink = link;
    },
  },
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