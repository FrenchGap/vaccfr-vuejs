<template>
  <v-layout fill-height >
    <v-container fluid>
      <v-row>
        <v-col sm="12" md="3">
          <v-row>
            <v-col cols="12">
              <UserProfileCard />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import UserProfileCard from '../../components/App/User/UserProfileCard.vue';
export default {
  components: { UserProfileCard },
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