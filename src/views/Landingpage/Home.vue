<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-card
                elevation="3"
              >
                <v-card-title>Welcome to the French vACC</v-card-title>
                <v-card-text>
                  The French vACC is the French community for virtual pilots and controllers on the VATSIM Network. VATSIM is a network for virtual flight simulation enthusiasts, which connects virtual air traffic controllers with virtual pilots. The French vACC provides virtual air traffic control services over metropolitan France on VATSIM, and trains new pilots on phraseology, procedures and particularities of flying on the network. We also maintain and develop air traffic control procedures, in line with the real world, and we train virtual air traffic controllers to provide realistic services to pilots. Overall, we are a community of aviation fans, and seek to exchange knowledge on our favourite topics. Join us now to begin your virtual pilot/ATC career!
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card
            elevation="3"
            :loading="false"
          >
            <v-card-title>Online ATC</v-card-title>
            <v-card-subtitle>(Last updated: {{lastUpdatedATCTimestamp}})</v-card-subtitle>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Online since</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in onlineATCList" :key="index">
                    <td>{{ item.callsign }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.rating }}</td>
                    <td>{{ item.livesince }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
            <v-overlay opacity="1" absolute :value="loadingOnlineATC">
              <v-progress-circular indeterminate white>

              </v-progress-circular>
            </v-overlay>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card
            elevation="3"
          >
            <v-card-title>ATC Booking</v-card-title>
            <v-card-subtitle>Monday 16th of Novembre</v-card-subtitle>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>x</td>
                    <td>x</td>
                    <td>x</td>
                    <td>x</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      onlineATCList: {},
      loadingOnlineATC: true,
      lastUpdatedATCTimestamp: "--:--z",
    }
  },
  mounted() {
    this.$emit('mastHeadRequired', require('@/assets/media/banner_vacc_france.jpg'));
    this.fetchOnlineATC();
  },
  methods: {
    async fetchOnlineATC() {
      this.onlineATCList = this.$store.dispatch('VatsimData/updateOnlineATC')
      .then(() => {
        this.onlineATCList = this.$store.getters['VatsimData/getOnlineATCList'];
        this.lastUpdatedATCTimestamp = this.$store.getters['VatsimData/getOnlineATCListUpdateTime'];
        this.loadingOnlineATC = false;
      });
    },
  }
}
</script>

<style lang="scss">

</style>