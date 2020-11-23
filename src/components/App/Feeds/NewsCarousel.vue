<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-newspaper</v-icon>
      <span>News {{newsCounter}}</span>
    </v-system-bar>
    <v-carousel
      :cycle="cycleOn"
      :interval="cycleInterval"
      show-arrows-on-hover
      hide-delimiters
      @change="carouselChange"
      :height="tempHeight"
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
    <v-overlay opacity="1" absolute :value="loadingNews">
      <v-progress-circular
        indeterminate
        white
        size="100"
        width="3"
      >
        News
      </v-progress-circular>
    </v-overlay>
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
      newsList: [],
      newsCounter: "",
      newsAuthor: "",
      newsID: null,
      tempHeight: "400"
    }
  },
  mounted() {
    this.getNews();
  },
  methods: {
    carouselChange(number) {
      this.newsCounter = `(${number+1}/${this.newsList.length})`;
      this.newsAuthor = this.newsList[number]['author'];
      this.newsID = this.newsList[number]['id'];
    },

    getNews() {
      this.$store.getters['News/fetchNews']
      .then((response) => {
        if (response) {
          this.newsList = this.$store.state.News.news;
          this.tempHeight = "auto";
          this.loadingNews = false;
        }
      });
    }
  }
}
</script>

<style>

</style>