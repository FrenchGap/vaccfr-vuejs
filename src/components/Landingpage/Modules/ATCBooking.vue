<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-calendar</v-icon>
      <span>{{$t('booking.title')}}</span>
    </v-system-bar>
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
            <td>{{ item.position }}</td>
            <td>{{ item.user.fname }} {{ item.user.lname }}</td>
            <td>{{ convertDateToTime(item.start_date) }} - {{ convertDateToTime(item.end_date) }}</td>
            <td>{{ item.user.atc_rating_short }}</td>
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
</template>

<script>
import Axios from "axios";
import moment from "moment";

export default {
  name: "ATCBooking",
  data() {
    return {
      bookingsList: {},
      loadingBookings: true,
    }
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      this.bookingsList = this.getBookings()
      .then(() => {
        this.bookingsList = this.$store.getters['ATCBookings/getATCBookingsList'];
        this.loadingBookings = false;
      });
    },

    async getBookings() {
      var params = {
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      return Axios.get(process.env.VUE_APP_API_URL + '/atc/allbookings', {
        params: params
      })
      .then((response) => {
        this.$store.dispatch('ATCBookings/setATCBookings', response.data.bookings);
      })
      .catch(() => {});
    },

    getCurrentDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      return dd + '/' + mm + '/' + yyyy;
    },

    convertDateToTime(date) {
      return moment(date, "YYYY-MM-DD hh:mm:ss").format('hh:mm')
    }
  }
}
</script>

<style scoped>

</style>

<i18n>
{
  "en": {
    "booking": {
      "title": "ATC Booking",
      "nonefound": "No ATC bookings were found"
    }
  },
  "fr": {
    "booking": {
      "title": "Réservations ATC",
      "nonefound": "Aucun booking n'a été trouvé"
    }
  }
}
</i18n>