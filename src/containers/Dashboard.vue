<template>
  <v-app>
    <NavigationBar :pageTitle="pageTitleDefault" />
    <v-main transition="slide-x-transition" class="pt-0 pl-5">
      <router-view @pageTitleValue="setPageTitle" />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavigationBar from "../components/App/NavigationBar";
import Footer from "../components/App/Footer";

export default {
  name: "DashboardContainer",
  components: {
    NavigationBar,
    Footer,
  },
  data() {
    return {
      pageTitleDefault: "",
    }
  },
  methods: {
    setPageTitle(title) {
      this.pageTitleDefault = title;
    }
  }
}
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