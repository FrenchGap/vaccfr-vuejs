<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-calendar-multiple-check</v-icon>
      <span>Events {{eventCounter}}</span>
    </v-system-bar>
    <v-carousel
      :cycle="cycleOn"
      :interval="cycleInterval"
      show-arrows-on-hover
      hide-delimiters
      @change="carouselChange"
      height="auto"
    >
      <v-carousel-item
        v-for="(event, index) in eventsList"
        :key="index"
        :src="event.image"
        contain
      >
      </v-carousel-item>
    </v-carousel>
    <v-card>
      <v-card-title>
        {{eventTitle}}
      </v-card-title>
      <v-card-subtitle>
        {{eventInfo}}
      </v-card-subtitle>
      <v-card-text v-html="eventDescription">
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          outlined
        >
          <v-icon left dark>mdi-calendar-import</v-icon>
          Add to calendar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          outlined
        >
          <v-icon left dark>mdi-share</v-icon>
          Share
        </v-btn>
      </v-card-actions>
      <v-overlay opacity="1" absolute :value="loadingEvents">
      <v-progress-circular
        indeterminate
        white
        size="80"
        width="3"
      >
        News
      </v-progress-circular>
    </v-overlay>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "EventsCarousel",
  props: {
    cycleOn: {
      default: false
    },
    cycleInterval: {}
  },
  data() {
    return {
      loadingEvents: true,
      eventsList: [],
      eventCounter: "",
      eventTitle: "",
      eventInfo: "",
      eventDescription: "",
      eventID: null
    }
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    carouselChange(number) {
      this.eventCounter = `(${number+1}/${this.eventsList.length})`
      this.eventTitle = this.eventsList[number]['title'];
      this.eventInfo = this.eventsList[number]['subtitle'];
      this.eventDescription = this.eventsList[number]['description'];
      this.eventID = this.eventsList[number]['id'];
    },

    getEvents() {
      this.$store.getters['Events/fetchEvents']
      .then((response) => {
        if (response) {
          this.eventsList = this.$store.state.Events.events;
          this.loadingEvents = false;
        }
      });
    }
  }
}
</script>

<style>

</style>