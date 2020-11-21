<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Privacy Policy
            </v-card-title>
            <v-card-text>
              <PrivacyPolicy />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Circulars
            </v-card-title>
            <v-card-text>
              (TBC)
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import PrivacyPolicy from '../../components/Landingpage/Content/PrivacyPolicy.vue'
export default {
  components: { PrivacyPolicy },
  name: 'Policies',
}
</script>

<style>

</style>