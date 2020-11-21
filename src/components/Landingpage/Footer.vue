<template>
  <v-footer
    color="black lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        color="white"
        text
        rounded
        class="my-2"
        :to="{ name: link.name }"
      >
        {{ link.text }}
      </v-btn>
      <v-col
        class="black lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} - <strong>Peter Paré</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "LandingpageFooter",
  data() {
    return {
      links: [
        { text: "Policies", name: "Landingpage.policies" },
        { text: "Staff roster", name: "Dashboard.index" },
        { text: "Contact", name: "Landingpage.contact" },
      ]
    }
  }
}
</script>

<style>

</style>