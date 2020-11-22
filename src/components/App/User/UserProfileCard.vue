<template>
  <v-card
    elevation="3"
  >
    <v-system-bar color="black" dark>
      <v-icon>mdi-account</v-icon>
      <span>Profile</span>
    </v-system-bar>
    <v-card-title>
      <v-avatar
        color="transparent"
        size="100"
      >
        <v-img
          src="@/assets/media/app/default_upp.png"
        >

        </v-img>
      </v-avatar>
      <div class="text-h5 ml-3">
        {{ getUserFullName() }}
      </div>
    </v-card-title>
    <v-card-text>
      <v-divider></v-divider>
      <v-simple-table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Vatsim ID</td>
            <td>{{ userCID }}</td>
          </tr>
          <tr>
            <td>Controller Rating</td>
            <td>{{ userControllerRating }}</td>
          </tr>
          <tr>
            <td>Pilot Rating</td>
            <td>{{ userPilotRating }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
    <v-overlay opacity="1" absolute :value="loadingProfile">
      <v-progress-circular
        indeterminate
        white
        size="100"
        width="3"
      >
        Profile
      </v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  name: 'UserProfileCard',
  data() {
    return {
      loadingProfile: true,
      userCID: "",
      userControllerRating: "",
      userPilotRating: "",
    }
  },
  mounted() {

  },
  methods: {
    getUserFullName() {
      var username = `${this.$store.state.User.fname} ${this.$store.state.User.lname}`;
      if (username != null) {
        this.userCID = this.$store.state.User.vatsim_id;
        this.userControllerRating = `${this.$store.state.User.ATCrank_short} (${this.$store.state.User.ATCrank_long})`;
        this.userPilotRating = this.$store.state.User.PilotRank;
        this.loadingProfile = false
      }
      return username
    }
  }
}
</script>

<style>

</style>