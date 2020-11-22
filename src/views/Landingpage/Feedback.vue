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
              <v-form ref="feedbackForm">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="name"
                      label="Name"
                      type="text"
                      prepend-inner-icon="mdi-account"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="vatsim_id"
                      label="Vatsim ID"
                      type="number"
                      prepend-inner-icon="mdi-account"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="controller_cid"
                      label="Controller's Vatsim ID"
                      type="number"
                      prepend-inner-icon="mdi-account"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="controller_position"
                      label="Controller Position"
                      type="text"
                      prepend-inner-icon="mdi-radar"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-dialog
                      ref="dateDialog"
                      v-model="dateModal"
                      :return-value.sync="date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Choose date"
                          prepend-inner-icon="mdi-calendar"
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        scrollable
                        color="black"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="black"
                          @click="dateModal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="black"
                          @click="$refs.dateDialog.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="6">
                    <v-dialog
                      ref="timeDialog"
                      v-model="timeModal"
                      :return-value.sync="time"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time"
                          label="Choose time"
                          prepend-inner-icon="mdi-clock"
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-model="time"
                        scrollable
                        color="black"
                        format="24hr"
                        :allowed-minutes="allowedStep"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="black"
                          @click="timeModal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="black"
                          @click="$refs.timeDialog.save(time)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="message"
                      label="Your message"
                      placeholder="Buy this controller a 🥐"
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
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
export default {
  name: "Feedback",
  data() {
    return {
      name: "",
      vatsim_id: "",
      controller_cid: "",
      controller_position: "",

      date: "",
      dateModal: false,
      minDate: "",
      maxDate: "",

      time: "",
      timeModal: false,
      message: "",
    }
  },
  methods: {
    allowedStep: m => m % 5 === 0
  }
}
</script>

<style>

</style>