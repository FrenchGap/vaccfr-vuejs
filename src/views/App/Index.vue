<template>
  <v-layout fill-height >
    <v-container fluid>
      <v-row>
        <v-col cols="3">
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
                      src="../../assets/media/app/default_upp.png"
                    >

                    </v-img>
                  </v-avatar>
                  <div class="ml-3">
                    Fname Lname
                  </div>
                </v-card-title>
                <v-card-text>

                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
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

    }
  }
}
</script>

<style>

</style>