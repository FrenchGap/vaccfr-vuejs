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
                <v-card-title>{{$t('welcomeBoxContent.welcome')}}</v-card-title>
                <v-card-text>
                  {{$t('welcomeBoxContent.welcomeMessage')}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card
            elevation="3"
          >
            <v-card-title>{{$t('onlineATCBox.title')}}</v-card-title>
            <v-card-subtitle>{{$t('onlineATCBox.updated', { time: lastUpdatedATCTimestamp })}}</v-card-subtitle>
            <v-card-text>
              <v-simple-table v-if="onlineATCList.length > 0">
                <thead>
                  <tr>
                    <th>{{$t('onlineATCBox.position')}}</th>
                    <th>{{$t('onlineATCBox.name')}}</th>
                    <th>{{$t('onlineATCBox.rating')}}</th>
                    <th>{{$t('onlineATCBox.onlinesince')}}</th>
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
              <v-alert
                color="warning"
                outlined
                border="left"
                icon="mdi-radar"
                dense
                v-else
              >
                {{$t('onlineATCBox.nonefound')}}
              </v-alert>
            </v-card-text>
            <v-overlay opacity="1" absolute :value="loadingOnlineATC">
              <v-progress-circular indeterminate white>

              </v-progress-circular>
            </v-overlay>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card
            elevation="3"
          >
            <v-card-title>ATC Booking</v-card-title>
            <v-card-subtitle>{{getCurrentDate()}}</v-card-subtitle>
            <v-card-text>
              <v-simple-table v-if="bookingsList.length > 0">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in bookingsList" :key="index">
                    <td>{{ item.callsign }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.time }}</td>
                    <td>{{ item.rating }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-alert
                color="warning"
                outlined
                border="left"
                icon="mdi-calendar-search"
                dense
                v-else
              >
                {{$t('booking.nonefound')}}
              </v-alert>
            </v-card-text>
            <v-overlay opacity="1" absolute :value="loadingBookings">
              <v-progress-circular indeterminate white>

              </v-progress-circular>
            </v-overlay>
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
      bookingsList: {},
      loadingBookings: true,
    }
  },
  mounted() {
    this.$emit('mastHeadRequired', require('@/assets/media/banner_vacc_france.jpg'));
    this.fetchOnlineATC();
    this.fetchBookings();
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
    async fetchBookings() {
      this.loadingBookings = false;
    },
    getCurrentDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      return dd + '/' + mm + '/' + yyyy;
    }
  }
}
</script>

<style lang="scss">

</style>

<i18n>
{
  "en": {
    "welcomeBoxContent": {
      "welcome": "Welcome to the French vACC",
      "welcomeMessage": "The French vACC is the French community for virtual pilots and controllers on the VATSIM Network. VATSIM is a network for virtual flight simulation enthusiasts, which connects virtual air traffic controllers with virtual pilots. The French vACC provides virtual air traffic control services over metropolitan France on VATSIM, and trains new pilots on phraseology, procedures and particularities of flying on the network. We also maintain and develop air traffic control procedures, in line with the real world, and we train virtual air traffic controllers to provide realistic services to pilots. Overall, we are a community of aviation fans, and seek to exchange knowledge on our favourite topics. Join us now to begin your virtual pilot/ATC career!"
    },
    "onlineATCBox": {
      "title": "Online ATC",
      "updated": "Last updated: {time}",
      "position": "Position",
      "name": "Name",
      "rating": "Rating",
      "onlinesince": "Online Since",
      "nonefound": "There is no ATC online at this time"
    },
    "booking": {
      "nonefound": "No ATC bookings were found"
    }
  },
  "fr": {
    "welcomeBoxContent": {
      "welcome": "Bienvenue dans la vACC France",
      "welcomeMessage": "La vACC France est une communauté de pilotes et de contrôleurs virtuels sur VATSIM, lequel est un réseau de simulation de vol connectant pilotes et contrôleurs aériens. La vACC France propose un service de contrôle sur le territoire de la France métropolitaine, entraine les pilotes sur des thèmes comme la phraséologie, les procédures et particularités du vol en ligne. Nous assurons le contrôle aérien, en accord avec les procédures réelles, tout en dispensant les formations. Avant tout, nous sommes une communauté de passionnés d’aviation, qui échange et partage son savoir faire. Rejoignez nous dès à présent pour commencer votre carrière de pilote ou contrôleur virtuel!"
    },
    "onlineATCBox": {
      "title": "ATC en-ligne",
      "updated": "Dernière mise-à-jour: {time}",
      "position": "Position",
      "name": "Nom",
      "rating": "Grade",
      "onlinesince": "En-ligne depuis",
      "nonefound": "Aucun ATC n'est en ligne en ce moment"
      },
      "booking": {
        "nonefound": "Aucun booking n'a été trouvé"
      }
  }
}
</i18n>