<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-newspaper</v-icon>
      <span>News ({{newsCounter}})</span>
    </v-system-bar>
    <v-carousel
      :cycle="cycleOn"
      :interval="cycleInterval"
      show-arrows-on-hover
      hide-delimiters
      @change="carouselChange"
      height="auto"
      light
    >
      <v-carousel-item
        v-for="(news, index) in newsList"
        :key="index"
      >
        <v-card flat>
          <v-card-title>{{news.title}}</v-card-title>
          <v-card-subtitle>{{news.subtitle}}</v-card-subtitle>
          <v-card-text v-html="news.content"></v-card-text>
        </v-card>
      </v-carousel-item>
      <v-divider></v-divider>
    </v-carousel>
    <v-card-actions>
      <v-chip
        class="ma-2"
        color="primary"
        label
      >
        <v-icon left>mdi-account-circle-outline</v-icon>
        {{newsAuthor}}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        outlined
      >
        <v-icon>mdi-share</v-icon>
        Share
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NewsCarousel",
  props: {
    cycleOn: {
      default: false
    },
    cycleInterval: {}
  },
  data() {
    return {
      loadingNews: true,
      newsList: [
        {
          "id": 1,
          "title": "Cross the Pond - Edition 2020",
          "subtitle": "16.11.2020 | 14:37z",
          "content": "Bonjour à toutes et tous, <br><br>Un petit message pour remercier tous les ATCO présents samedi pour ce grand et bel événement qu'a été l'édition 2020 du Cross The Pond Eastbound. <br><br>C'était une édition qui se voulait ambitieuse, de part le trafic annoncé et de part le nombre de contrôleurs à fournir. Mais grâce à vous, la French vACC a répondu à l'appel ! <br><br>Que vous ayez participé sur le secteur en-route, sur les secteurs lower, sur une approche, une tour, un sol, une del, ou encore que vous nous ayez fait profiter de votre expérience pour la planification des secteurs, la répartition des flux, ou encore de vos compétences pour la création / amélioration de nos outils et de nos fichiers secteurs, c'est grâce à chacun de vous que la journée fut belle et que le vACC a su rayonner de manière positive sur le réseau. <br><br>Merci !",
          "author": "Francois-Xavier Obert"
        },
        { "id": 2,
          "title": "CPT S2 Anthony",
          "subtitle": "30.10.2020 | 21:55z",
          "content": "C'est avec un très grand plaisir que nous vous annonçons la réussite, et avec brio vu la charge de traffic, d'Anthony dans son CPT S2. <br><br>Félicitations à lui !",
          "author": "Peter Pare"
        },
        { "id": 3,
          "title": "CPT S2 Mohammed",
          "subtitle": "23.10.2020 | 21:26z",
          "content": "L'équipe ATC vous annonce, avec un très grand plaisir, la réussite avec brio de Mohammed à son CPT S2 sur Nice Tour. <br><br>Félicitations à lui !",
          "author": "Fabrice Rakotomalala"
        }
      ],
      newsCounter: "",
      newsAuthor: "",
      newsID: null
    }
  },
  methods: {
    carouselChange(number) {
      this.newsCounter = `${number+1}/${this.newsList.length}`;
      this.newsAuthor = this.newsList[number]['author'];
      this.newsID = this.newsList[number]['id'];
    }
  }
}
</script>

<style>

</style>