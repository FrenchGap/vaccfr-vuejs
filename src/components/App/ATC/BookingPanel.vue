<template>
  <div>
    <v-card
      elevation="5"
    >
      <v-system-bar
        color="black"
        dark
      >
        <v-icon>mdi-calendar-plus</v-icon>
        <span>New Booking</span>
      </v-system-bar>
      <v-card-text>
        <v-form ref="newBookingDateForm">
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
                :label="$t('content.date_label')"
                append-icon="mdi-calendar"
                placeholder="YYYY-MM-DD"
                outlined
                color="black"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              scrollable
              color="black"
              :max="maxDate"
              :min="minDate"
              :locale="$t('content.picker_locale')"
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
        </v-form>
      </v-card-text>
      <v-card-actions v-if="date != null">
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          outlined
          @click="submitDate(date)"
        >
          {{$t('content.submitbtn')}}
        </v-btn>
        <v-btn
          color="red"
          outlined
          @click="date = null"
        >
          {{$t('content.clearbtn')}}
        </v-btn>
      </v-card-actions>
      <v-overlay opacity="1" absolute :value="loadingPanel">
        <v-progress-circular
          indeterminate
          white
          size="100"
          width="3"
        >
          Loading
        </v-progress-circular>
      </v-overlay>
    </v-card>

    <v-dialog
      v-model="bookingPanelDialog"
      persistent
      :max-width="cardWidthFromStepper[bookingOptionsStepper-1]"
    >
      <v-card>
        <v-card-text class="px-0 py-0">
          <v-stepper
            v-model="bookingOptionsStepper"
          >
            <v-stepper-header>
              <v-stepper-step
                color="black"
                :complete="bookingOptionsStepper > 1"
                step="1"
                :editable="bookingConfirmed == false && hasSpecialPosition && bookingOptionsStepper > 1"
                :rules="[() => hasSpecialPosition]"
              >
                Special Positions
                <small v-if="!hasSpecialPosition">None found</small>
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                color="black"
                :complete="bookingOptionsStepper > 2"
                :editable="bookingConfirmed == false && bookingOptionsStepper > 2"
                step="2"
              >
                Time
                <small v-if="chosenEndTime && bookingOptionsStepper > 2">{{chosenStartTime}} - {{chosenEndTime}}</small>
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                color="black"
                :complete="bookingOptionsStepper > 3"
                :editable="bookingConfirmed == false && bookingOptionsStepper > 3"
                step="3"
              >
                Position
                <small v-if="chosenPosition && bookingOptionsStepper > 3">{{chosenPosition}}</small>
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                color="black"
                :complete="bookingOptionsStepper > 4"
                step="4"
              >
                Confirmation
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <!-- Blocked & Events positions content -->
              <v-stepper-content
                step="1"
              >
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card
                      class="mb-12"
                      color="grey lighten-4"
                      elevation="2"
                      height="400px"
                    >
                      <v-card-title>Blocked Positions</v-card-title>
                      <v-card-text class="pa-0" v-if="blockedPositions.length > 0">
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th class="text-left">
                                Position
                              </th>
                              <th class="text-left">
                                Time
                              </th>
                              <th class="text-left">
                                Blocked by
                              </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in blockedPositions"
                              :key="item.id"
                            >
                              <td>{{item.position}}</td>
                              <td>{{ convertDateToTime(item.start_date) }} - {{ convertDateToTime(item.end_date) }}</td>
                              <td>{{item.blocker.fname}} {{item.blocker.lname}}</td>
                              <td>
                                <v-btn
                                  outlined
                                  color="primary"
                                  block
                                  @click="bookBlockedPosition(item)"
                                >
                                  Book
                                </v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-else>
                        <v-alert
                          color="warning"
                          outlined
                          border="left"
                          icon="mdi-radar"
                          dense
                        >
                          No blocked positions available on this date
                        </v-alert>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card
                      class="mb-12"
                      color="grey lighten-4"
                      elevation="2"
                      height="400px"
                    >
                      <v-card-title>Event Positions</v-card-title>
                      <v-card-text class="pa-0" v-if="eventPositions.length > 0">
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th class="text-left">
                                Position
                              </th>
                              <th class="text-left">
                                Time
                              </th>
                              <th class="text-left">
                                Event Name
                              </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in eventPositions"
                              :key="item.id"
                            >
                              <td>{{item.position}}</td>
                              <td>{{ convertDateToTime(item.start_date) }} - {{ convertDateToTime(item.end_date) }}</td>
                              <td>{{item.event_name}}</td>
                              <td>
                                <v-btn
                                  outlined
                                  color="primary"
                                  block
                                  @click="bookEventPosition(item)"
                                >
                                  Book
                                </v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-else>
                        <v-alert
                          color="warning"
                          outlined
                          border="left"
                          icon="mdi-radar"
                          dense
                        >
                          No event positions available on this date
                        </v-alert>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-btn
                  color="primary"
                  @click="bookingOptionsStepper = 2"
                >
                  Skip
                </v-btn>
                <v-btn text @click="cancelAllDialog()">
                  Cancel all
                </v-btn>
              </v-stepper-content>
              <v-stepper-content
                step="2"
              >
                <v-card
                  class="mb-12"
                  color="grey lighten-4"
                  elevation="2"
                >
                  <v-card-title>Choose a timeframe</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-dialog
                          ref="chooseStartTimeMenu"
                          v-model="chooseStartTimeDialog"
                          :return-value.sync="chosenStartTime"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="chosenStartTime"
                              label="Start Time"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-model="chosenStartTime"
                            scrollable
                            color="black"
                            format="24hr"
                            :allowed-minutes="allowedStep"
                            :max="chosenEndTime"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="black"
                              @click="$refs.chooseStartTimeMenu.save(chosenStartTime)"
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-dialog
                          ref="chooseEndTimeMenu"
                          v-model="chooseEndTimeDialog"
                          :return-value.sync="chosenEndTime"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="chosenEndTime"
                              label="End Time"
                              prepend-icon="mdi-clock-time-eight-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-model="chosenEndTime"
                            scrollable
                            color="black"
                            format="24hr"
                            :allowed-minutes="allowedStep"
                            :min="getPlusOneHour(chosenStartTime)"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="black"
                              @click="$refs.chooseEndTimeMenu.save(chosenEndTime)"
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions v-if="hasChosenTime()">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      outlined
                      @click="() => {
                        chosenStartTime = null
                        chosenEndTime = null
                      }"
                    >
                      Reset
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-btn
                  color="primary"
                  @click="submitChosenTime(chosenStartTime, chosenEndTime)"
                  :disabled="!hasChosenTime()"
                >
                  Submit time
                </v-btn>
                <v-btn text @click="cancelAllDialog()">
                  Cancel all
                </v-btn>
              </v-stepper-content>
              <v-stepper-content
                step="3"
              >
                <v-card
                  class="mb-12"
                  color="grey lighten-4"
                  elevation="2"
                >
                  <v-card-title>Select a Position</v-card-title>
                  <v-card-text>
                    <v-row justify="space-around" align-content="center">
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="chosenFIR"
                          prepend-icon="mdi-map-legend"
                          menu-props="auto"
                          hide-details=""
                          label="Choose FIR"
                          single-line
                          :items="availableFIR"
                          :item-text="(item) => {return `${item.name} - ${item.icao}`}"
                          item-value="id"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="chosenPosition"
                          prepend-icon="mdi-radar"
                          menu-props="auto"
                          hide-details=""
                          label="Choose Control Position"
                          single-line
                          :items="availablePositionsComputed(chosenFIR)"
                          :item-text="(item) => {return `${item.code} - ${item.callsign}`}"
                          item-value="code"
                          :disabled="!hasChosenFIR()"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions v-if="hasChosenFIR()">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      outlined
                      @click="() => {
                        chosenFIR = null
                        chosenPosition = null
                      }"
                    >
                      Reset
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-btn
                  color="primary"
                  @click="submitChosenPosition(chosenPosition)"
                  :disabled="!hasChosenPosition()"
                >
                  Submit position
                </v-btn>
                <v-btn text @click="cancelAllDialog()">
                  Cancel all
                </v-btn>
              </v-stepper-content>
              <v-stepper-content
                step="4"
              >
                <v-card
                  class="mb-12"
                  color="grey lighten-4"
                  elevation="2"
                >
                  <v-card-title>Confirmation of booking</v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <thead></thead>
                      <tbody>
                        <tr v-if="bookedEvent">
                          <td><span class="font-weight-bold">Event:</span></td>
                          <td>{{finalEventName}}</td>
                        </tr>
                        <tr>
                          <td><span class="font-weight-bold">Position:</span></td>
                          <td>{{finalPosition}}</td>
                        </tr>
                        <tr>
                          <td><span class="font-weight-bold">Date:</span></td>
                          <td>{{finalDate}}</td>
                        </tr>
                        <tr>
                          <td><span class="font-weight-bold">Time:</span></td>
                          <td>{{finalStartTime}} - {{finalEndTime}}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      outlined
                    >
                      <v-icon left dark>mdi-calendar-import</v-icon>
                      Add to calendar
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-btn
                  color="success"
                  @click="cancelAllDialog()"
                >
                  Close
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loadingBookingPanelDialog"
      persistent
      width="300"
    >
      <v-card
        color="black"
        dark
      >
        <v-card-text>
          Loading
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import moment from "moment";

export default {
  name: "ATCBookingPanel",
  data() {
    return {
      loadingPanel: false,
      date: null,
      dateModal: false,
      minDate: this.getDateToday(),
      maxDate: this.getDatePlusNDays(14),

      bookingPanelDialog: false,
      loadingBookingPanelDialog: false,
      hasSpecialPosition: false,
      blockedPositions: [],
      eventPositions: [],

      bookingOptionsStepper: 1,
      cardWidthFromStepper: ['1200px', '800px', '800px', '800px'],

      chosenStartTime: null,
      chosenEndTime: null,
      chooseStartTimeDialog: false,
      chooseEndTimeDialog: false,

      availableFIR: [],
      availablePositions: [],
      chosenFIR: null,
      chosenPosition: null,

      bookingConfirmed: false,
      finalPosition: "",
      finalDate: "",
      finalStartTime: "",
      finalEndTime: "",
      bookedEvent: false,
      finalEventName: "",
    }
  },
  methods: {
    resetAllValues() {
      this.loadingBookingPanelDialog = false
      this.bookingConfirmed = false
      this.hasSpecialPosition = false
      this.blockedPositions = []
      this.eventPositions = [],
      this.bookingOptionsStepper = 1

      this.chosenStartTime = null // RESET
      this.chosenEndTime = null // RESET
      this.chosenFIR = null
      this.chosenPosition = null
    },
    allowedStep: m => m % 15 === 0,
    getDateToday() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      return `${yyyy}-${mm}-${dd}`
    },
    getDatePlusNDays(n) {
      var date = new Date();
      date.setDate(date.getDate()+n)
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();
      return `${yyyy}-${mm}-${dd}`
    },
    getPlusOneHour(n) {
      return moment(`${this.date} ${n}`, 'YYYY-MM-DD hh:mm').add(1, 'hours').format('HH:mm')
    },
    cancelAllDialog() {
      this.bookingPanelDialog = false;
      this.date = null;
    },
    convertDateToTime(date) {
      return moment(date, "YYYY-MM-DD hh:mm:ss").format('hh:mm')
    },
    hasChosenTime() {
      if (this.chosenStartTime && this.chosenEndTime) {
        return true;
      }
      return false;
    },
    hasChosenFIR() {
      if (this.chosenFIR) {
        return true;
      }
      return false;
    },
    hasChosenPosition() {
      if (this.chosenFIR && this.chosenPosition) {
        return true;
      }
      return false;
    },

    submitDate(date) {
      this.loadingPanel = true
      this.resetAllValues()
      this.fetchBlockedPositions(date)
      .then((blockedPositions) => {
        if (blockedPositions != null && blockedPositions.length > 0) {
          this.blockedPositions = blockedPositions;
          this.hasSpecialPosition = true;
        }
        this.fetchEventPositionsByDate(date)
        .then((eventPositions) => {
          if (eventPositions != null && eventPositions.length > 0) {
            this.eventPositions = eventPositions;
            this.hasSpecialPosition = true;
          }
          if (!this.hasSpecialPosition) {
            this.bookingOptionsStepper = 2 // normally 2
          }
          this.loadingPanel = false
          this.bookingPanelDialog = true;
        })
      })
    },

    async fetchBlockedPositions(date) {
      var params = {
        'api_token': this.$store.state.VatsimSSO.token,
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
        'type': 'date',
        'date': date
      };
      var result = await Axios.get(process.env.VUE_APP_API_URL + '/atc/getblocked', {
        params: params
      })
      .then((response) => {
        return response.data.data;
      })
      .catch(() => {return null;});
      return result;
    },

    async fetchEventPositionsByDate(date) {
      var params = {
        'api_token': this.$store.state.VatsimSSO.token,
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
        'type': 'date',
        'date': date,
        'taken': 'no'
      };
      var result = await Axios.get(process.env.VUE_APP_API_URL + '/atc/geteventpositions', {
        params: params
      })
      .then((response) => {
        return response.data.data;
      })
      .catch(() => {return null;});
      return result;
    },

    bookBlockedPosition(item) {
      this.loadingBookingPanelDialog = true;
      console.log("Action to book blocked position")
      this.finalPosition = item.position
      this.finalDate = moment(item.start_date, "YYYY-MM-DD hh:mm:ss").format('DD-MM-YYYY')
      this.finalStartTime = moment(item.start_date, "YYYY-MM-DD hh:mm:ss").format('hh:mm')
      this.finalEndTime = moment(item.end_date, "YYYY-MM-DD hh:mm:ss").format('hh:mm')
      this.bookingConfirmed = true
      this.bookingOptionsStepper = 4
      this.loadingBookingPanelDialog = false;
    },
    bookEventPosition(item) {
      this.loadingBookingPanelDialog = true; 
      console.log("Action to book event position")
      this.finalPosition = item.position
      this.finalDate = moment(item.start_date, "YYYY-MM-DD hh:mm:ss").format('DD-MM-YYYY')
      this.finalStartTime = moment(item.start_date, "YYYY-MM-DD hh:mm:ss").format('hh:mm')
      this.finalEndTime = moment(item.end_date, "YYYY-MM-DD hh:mm:ss").format('hh:mm')
      this.finalEventName = item.event_name
      this.bookedEvent = true
      this.bookingConfirmed = true
      this.bookingOptionsStepper = 4
      this.loadingBookingPanelDialog = false;
    },

    submitChosenTime(starttime, endtime) {
      this.loadingBookingPanelDialog = true;
      console.log("Action to fetch positions based on date and times")
      this.fetchPositionsFromTime(this.date, starttime, endtime)
      .then((available) => {
        this.availableFIR = available.fir;
        this.availablePositions = available.positions;
        this.bookingOptionsStepper = 3;
        this.loadingBookingPanelDialog = false;
      })
    },
    async fetchPositionsFromTime(date, starttime, endtime) {
      var params = {
        'api_token': this.$store.state.VatsimSSO.token,
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
        'date': date,
        'start_time': starttime,
        'end_time': endtime
      };
      var result = await Axios.get(process.env.VUE_APP_API_URL + '/atc/getpositionsfromtime', {
        params: params
      })
      .then((response) => {
        return response.data;
      })
      .catch(() => {return null;});
      return result;
    },
    availablePositionsComputed(firid) {
      var clean_data = [];
      if (firid) {
        this.availablePositions.forEach(position => {
          if (position.fir_id == firid) {
            clean_data.push(position)
          }
        });
      }
      return clean_data;
    },

    submitChosenPosition(position) {
      this.loadingBookingPanelDialog = true;
      console.log("Action to submit the booking based on all received variables")
      this.finalPosition = position
      this.finalDate = moment(this.date, "YYYY-MM-DD").format('DD-MM-YYYY')
      this.finalStartTime = this.chosenStartTime
      this.finalEndTime = this.chosenEndTime
      this.bookingConfirmed = true
      this.bookingOptionsStepper = 4
      this.loadingBookingPanelDialog = false;
    }
  }
}
</script>

<style>

</style>

<i18n>
{
  "en": {
    "content": {
      "date_label": "Choose date",
      "picker_locale": "en",
      "submitbtn": "Submit",
      "clearbtn": "Clear",
      "cancelbtn": "Cancel"
    }
  },
  "fr": {
    "content": {
      "date_label": "Choisissez une date",
      "picker_locale": "fr",
      "submitbtn": "Soumettre",
      "clearbtn": "Réinitialiser",
      "cancelbtn": "Annuler"
    }
  }
}
</i18n>