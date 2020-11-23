<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-radar</v-icon>
      <span>{{$t('onlineATCBox.title')}}</span>
    </v-system-bar>
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
</template>

<script>
export default {
  name: "OnlineATC",
  data() {
    return {
      onlineATCList: {},
      loadingOnlineATC: true,
      lastUpdatedATCTimestamp: "--:--z",
    }
  },
  mounted() {
    this.fetchOnlineATC();
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
  }
}
</script>

<style scoped>

</style>

<i18n>
{
  "en": {
    "onlineATCBox": {
      "title": "Online ATC",
      "updated": "Last updated: {time}",
      "position": "Position",
      "name": "Name",
      "rating": "Rating",
      "onlinesince": "Online Since",
      "nonefound": "There is no ATC online at this time"
    }
  },
  "fr": {
    "onlineATCBox": {
      "title": "ATC en-ligne",
      "updated": "Dernière mise-à-jour: {time}",
      "position": "Position",
      "name": "Nom",
      "rating": "Grade",
      "onlinesince": "En-ligne depuis",
      "nonefound": "Aucun ATC n'est en ligne en ce moment"
    }
  }
}
</i18n>