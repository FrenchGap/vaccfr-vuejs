<template>
  <v-layout fill-height >
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3">
          <v-row>
            <v-col cols="12">
              <UserProfileCard />
            </v-col>
            <v-col cols="12">
              <StatsCard />
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

export default {
  components: {
    UserProfileCard,
    StatsCard
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