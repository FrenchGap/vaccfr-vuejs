<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-link</v-icon>
      <span>Quick links</span>
    </v-system-bar>
    <v-card-text>
      <v-row
        align-content="center"
      >
        <v-col
          cols="12"
          v-for="(link, index) in links"
          :key="index"
        >
          <v-btn
            outlined
            color="black"
            :to="{ name: link.route }"
            exact
            block
          >
            <v-icon
              left
            >
              {{link.icon}}
            </v-icon>
            {{link.title}}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UserQuickLinks",
  data() {
    return {
      links: [
        { "title": "My Settings", "icon": "mdi-cog", "route": "Dashboard.profile.settings" },
        { "title": "My Statistics", "icon": "mdi-chart-areaspline", "route": "Dashboard.profile.stats" },
        { "title": "My GDPR data", "icon": "mdi-scale-balance", "route": "Dashboard.profile.gdprdata" },
      ]
    }
  }
}
</script>

<style>

</style>