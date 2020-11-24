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
              <UserInfo />
            </v-col>
            <v-col cols="12">
              <StatsCard />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="12">
              <ActivityFeed />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="3">
          <v-row>
            <v-col cols="12">
              <UserQuickLinks />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import ActivityFeed from '../../components/App/User/ActivityFeed.vue';
import StatsCard from '../../components/App/User/StatsCard.vue';
import UserInfo from '../../components/App/User/UserInfo.vue';
import UserProfileCard from '../../components/App/User/UserProfileCard.vue';
import UserQuickLinks from '../../components/App/User/UserQuickLinks.vue';
export default {
  components: {
    UserProfileCard,
    StatsCard,
    UserInfo,
    ActivityFeed,
    UserQuickLinks
  },
  name: "Dashboardprofile",
  data() {
    return {

    }
  },
  mounted() {
    this.$emit('pageTitleValue', 'Profile');
  },
  methods: {

  }
}
</script>

<style>

</style>