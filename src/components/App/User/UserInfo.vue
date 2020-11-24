<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-account-plus</v-icon>
      <span>User info</span>
    </v-system-bar>
    <v-card-text>
      <v-simple-table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Discord Account</td>
            <td>{{discordAccount}}</td>
          </tr>
          <tr>
            <td>ATC status</td>
            <td>{{atcStatus}}</td>
          </tr>
          <tr>
            <td>Staff status</td>
            <td>{{staffStatus}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
    <v-overlay opacity="1" absolute :value="loadingInfo">
      <v-progress-circular
        indeterminate
        white
        size="100"
        width="3"
      >
        User Info
      </v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  name: "UserInfoCard",
  data() {
    return {
      loadingInfo: true,
      discordAccount: "N/A",
      atcStatus: "N/A",
      staffStatus: "N/A",
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.loadingInfo = false;
    }
  }
}
</script>

<style scoped></style>