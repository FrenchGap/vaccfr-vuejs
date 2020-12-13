<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="12">
              <BookingPanel />
            </v-col>
            <v-col cols="12">

            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">

        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import BookingPanel from '../../../components/App/ATC/BookingPanel.vue';
export default {
  components: {
    BookingPanel

  },
  name: "BookingPage",
  data() {
    return {

    }
  },
  mounted() {
    this.$emit('pageTitleValue', 'ATC Booking');
  },
  methods: {

  }
}
</script>

<style>

</style>