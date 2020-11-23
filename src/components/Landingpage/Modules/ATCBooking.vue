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
</template>

<script>
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