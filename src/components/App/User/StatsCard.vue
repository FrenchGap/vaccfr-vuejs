<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-chart-timeline-variant</v-icon>
      <span>Quick Statistics</span>
    </v-system-bar>
    <v-card-text>
      <v-simple-table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Pilot Hours</td>
            <td>{{userPilotHours}}</td>
          </tr>
          <tr>
            <td>ATC Hours</td>
            <td>{{userATCHours}}</td>
          </tr>
          <tr>
            <td>Last callsign used</td>
            <td>{{userLastCallsign}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
    <v-overlay opacity="1" absolute :value="loadingStats">
      <v-progress-circular
        indeterminate
        white
        size="100"
        width="3"
      >
        Statistics
      </v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  name: 'QuickStatsCard',
  data() {
    return {
      loadingStats: true,
      userPilotHours: "N/A",
      userATCHours: "N/A",
      userLastCallsign: "N/A",
    }
  },
  mounted() {
    this.getUserQuickStats();
  },
  methods: {
    getUserQuickStats() {
      this.$store.getters['User/fetchUserQuickStats']
      .then(() => {
        if (this.$store.state.User.ATCHours) {
          console.log();
          this.userPilotHours = this.$store.state.User.PilotHours;
          this.userATCHours = this.$store.state.User.ATCHours;
          this.userLastCallsign = this.$store.state.User.LastCallsign;
          this.loadingStats = false;
        }
      });
    }
  }
}
</script>

<style scoped></style>