<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-calendar-multiple-check</v-icon>
      <span>Events ({{eventCounter}})</span>
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
      eventsList: [
        { "id": 1, "title": "Ca se passe en France", "subtitle": "24.11.2020 | 20:00z - 22:00z", "description": "Deuxième volet de la navigation VFR en Midi Pyrénées, proposé par l'aéro-club France VFR. <br><br>Au départ de Toulouse Labordes (LFCL) et à destination de Rodez (LFCR)", "image": "https://vatsim.fr//storage/event_images/aJKP5IiyNlMeHn5UXA8hjOEQGS5KG8N6kDn0fCsbsAPOOxke60.jpeg"},
        { "id": 2, "title": "Controller Practical Test S3 [LFMN_APP]", "subtitle": "27.11.2020 | 20:00z - 22:00z", "description": "Vendredi 27 novembre 2020, de 21h00 à 23h00 locales, Mathéo passera son CPT S3 sur l'approche de Nice [LFMN_APP]. <br><br>Cette position ainsi les positions sous-jacentes (TWR, GND, DEL) lui sont réservées de manière exclusive, elles pourront être ouvertes sur demande de l'examinateur en fonction de la charge de trafic. <br><br>Souhaitons lui le meilleur ! <br><br>On Friday 27th November 2020, come fly from/to Nice (LFMN) and help Mathéo get his S3 rating, on the approach position. Wish him good luck !", "image": "https://vatsim.fr//storage/event_images/WI5gAQ3mmOmwOO2v5v57g8XyjQAn67gJaMApKWj4qtiFuECHda.jpeg"},
        { "id": 3, "title": "Cross the Pyrénées Act II", "subtitle": "28.11.2020 | 16:00z - 19:00z", "description": "Queridos pilotos, \"Cross the Pyrénées, Act 2\", c'est une nouvelle liaison aérienne franco espagnole programmée cette fois ci entre les 2 capitales européennes (LFPG) et (LEMD) <br><br>VATSPA and the French vACC are pleased to invite you on their Cross The Pyrenees event between Paris and Madrid. Start up from Adolfo Suárez Madrid - Barajas (LEMD) or Paris-Charles de Gaulle (LFPG), fly over the Pyrénées and find out what's beyond. Buen viaje ! <br><br>Route : LFPG -> LEMD : AGOPA UL167 ARTAX UN857 BANEV LEMD -> LFPG : RBO UN867 DGO UL176 CNA UT182 KEPER", "image": "https://vatsim.fr//storage/event_images/DaR7z2gPkaV7QNd0coIzGHEctFLnIb7zAZxaeM1NTXWIA3Ssiq.jpeg"}
      ],
      eventCounter: "",
      eventTitle: "",
      eventInfo: "",
      eventDescription: "",
      eventID: null
    }
  },
  methods: {
    carouselChange(number) {
      this.eventCounter = `${number+1}/${this.eventsList.length}`
      this.eventTitle = this.eventsList[number]['title'];
      this.eventInfo = this.eventsList[number]['subtitle'];
      this.eventDescription = this.eventsList[number]['description'];
      this.eventID = this.eventsList[number]['id'];
    }
  }
}
</script>

<style>

</style>