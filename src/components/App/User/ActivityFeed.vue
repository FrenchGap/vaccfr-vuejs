<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-comment-quote-outline</v-icon>
      <span>User Activity</span>
    </v-system-bar>
    <v-img
      src="https://source.unsplash.com/collection/37710200"
      height="200"
      gradient="to top, rgba(0,0,0,.5), rgba(0,0,0,.5)"
    ></v-img>
    <v-card-text class="py-0">
      <v-timeline
        align-top
        dense
        v-if="!loadingContent"
      >
        <v-timeline-item
          v-for="item in activityFeed"
          :key="item.id"
          :icon="item.icon"
          :color="item.color"
          large
        >
          <v-row class="pt-1">
            <v-col cols="2">
              <strong>{{item.date}}</strong>
            </v-col>
            <v-col>
              <strong>{{item.title[$store.state.LocaleStore.locale]}}</strong>
              <div class="caption">
                {{item.content[$store.state.LocaleStore.locale]}}
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
      <div
        v-else
      >
        <v-skeleton-loader
          v-for="index in 5"
          :key="index"
          type="article"
        ></v-skeleton-loader>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ActivityFeed",
  data() {
    return {
      loadingContent: true,
      activityFeed: [
        {
          "id": 1,
          "icon": "mdi-information-outline",
          "color": "blue",
          "date": "Date here",
          "title": {
            "en": "This is an information",
            "fr": "Ceci est une information"
          },
          "content": {
            "en": "This activity item gives the user information about xyz relating to them, in general",
            "fr": "Cet élément donne à l'utilisateur des informations qui le concernent, en général"
          }
        },
        {
          "id": 2,
          "icon": "mdi-information-outline",
          "color": "blue",
          "date": "Date here",
          "title": {
            "en": "Discord account",
            "fr": "Compte Discord",
          },
          "content": {
            "en": "You have linked your Discord account successfully",
            "fr": "Vous avez relié votre compte Discord avec succès",
          }
        },
        {
          "id": 3,
          "icon": "mdi-airplane-takeoff",
          "color": "purple",
          "date": "Date here",
          "title": {
            "en": "This is a flight info",
            "fr": "Ceci est une information de vol"
          },
          "content": {
            "en": "This activity item gives the user info about a flight they just ended on the network",
            "fr": "Cet élément donne à l'utilisateur des informations sur un vol qu'il vient d'effectuer sur le réseau"
          }
        },
        {
          "id": 4,
          "icon": "mdi-airplane-takeoff",
          "color": "purple",
          "date": "Date here",
          "title": {
            "en": "SWR345 | LSZH > LFPG",
            "fr": "SWR345 | LSZH > LFPG"
          },
          "content": {
            "en": "You completed a flight from LSZH to LFPG",
            "fr": "Vous avez effectué un vol entre LSZH et LFPG"
          }
        },
        {
          "id": 5,
          "icon": "mdi-radar",
          "color": "green",
          "date": "Date here",
          "title": {
            "en": "This is an ATC info",
            "fr": "Ceci est une information ATC",
          },
          "content": {
            "en": "This activity item gives the user info about a controlling session they just had",
            "fr": "Cet élément donne à l'utilisateur des informations sur une session ATC qu'il vient d'effectuer sur le réseau"
          }
        },
        {
          "id": 6,
          "icon": "mdi-radar",
          "color": "green",
          "date": "Date here",
          "title": {
            "en": "LFFF_CTR | Paris Control",
            "fr": "LFFF_CTR | Paris Control",
          },
          "content": {
            "en": "You controlled LFFF_CTR for 2 hours and 24 minutes",
            "fr": "Vous avez ouvert LFFF_CTR pendant 2 heures et 24 minutes"
          }
        },
      ]
    }
  },
  mounted() {
    this.getActivityFeed();
  },
  methods: {
    getActivityFeed() {
      this.loadingContent = false;
    }
  }
}
</script>

<style>

</style>