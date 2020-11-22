<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card
            elevation="3"
          >
            <v-card-title>Feedback</v-card-title>
            <v-card-subtitle>Leave our controllers some feedback if you appreciated the services, and especially if you did not!</v-card-subtitle>
            <v-card-text>
              <FeedbackForm />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                text
                outlined
              >
                
                Submit
              </v-btn>
              <v-btn
                color="red"
                text
                outlined
              >
                Clear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import FeedbackForm from '@/components/Landingpage/Modules/FeedbackForm.vue'
export default {
  components: { FeedbackForm },
  name: "Feedback",
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>

</style>