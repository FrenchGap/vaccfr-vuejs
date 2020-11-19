<template>
  <v-layout fill-height >
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-card
                elevation="3"
              >
                <v-system-bar color="black" dark>
                  <v-icon>mdi-account</v-icon>
                  <span>Profile</span>
                </v-system-bar>
                <v-card-title>
                  <v-avatar
                    color="transparent"
                    size="100"
                  >
                    <v-img
                      src="@/assets/media/app/default_upp.png"
                    >

                    </v-img>
                  </v-avatar>
                  <div class="ml-3">
                    {{ getUserFullName() }}
                  </div>
                </v-card-title>
                <v-card-text>

                </v-card-text>
                <v-overlay opacity="100" absolute :value="loadingProfile">
                  <v-progress-circular indeterminate white>

                  </v-progress-circular>
                </v-overlay>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8">

        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: "DashboardIndex",
  data() {
    return {
      loadingProfile: true,
    }
  },
  mounted() {
    
  },
  methods: {
    getUserFullName() {
      var username = this.$store.getters['User/getFullName']
      if (username != null) {
        this.loadingProfile = false
      }
      return username
    }
  }
}
</script>

<style>

</style>