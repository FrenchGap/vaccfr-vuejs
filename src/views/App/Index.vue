<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" lg="3">
          <v-row>
            <v-col cols="12">
              <UserProfileCard />
            </v-col>
            <v-col cols="12">
              <StatsCard />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" lg="5">
          <v-row>
            <v-col cols="12">
              <EventsCarousel :cycleOn="false" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <v-row>
            <v-col cols="12">
              <ATCBooking />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import UserProfileCard from '../../components/App/User/UserProfileCard.vue';
import StatsCard from '../../components/App/User/StatsCard.vue';
import EventsCarousel from '../../components/App/Feeds/EventsCarousel.vue';
import ATCBooking from '../../components/Landingpage/Modules/ATCBooking.vue';

export default {
  components: {
    UserProfileCard,
    StatsCard,
    EventsCarousel,
    ATCBooking
  },
  name: "DashboardIndex",
  data() {
    return {

    }
  },
  mounted() {
    this.$emit('pageTitleValue', 'Home');
  },
  methods: {

  }
}
</script>

<style>

</style>