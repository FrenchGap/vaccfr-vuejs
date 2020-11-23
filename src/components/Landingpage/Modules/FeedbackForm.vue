<template>
  <v-card
    elevation="5"
    width="700"
  >
    <v-card-title>{{$t('content.title')}}</v-card-title>
    <v-card-subtitle>{{$t('content.subheading')}}</v-card-subtitle>
    <v-card-text>
      <v-form ref="feedbackForm">
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="controller_cid"
              :label="$t('content.atcid_label')"
              type="number"
              append-icon="mdi-account"
              :placeholder="$t('content.atcid_example')"
              outlined
              color="black"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="controller_position"
              :label="$t('content.atcposition_label')"
              type="text"
              append-icon="mdi-radar"
              :placeholder="$t('content.atcposition_example')"
              outlined
              color="black"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="6">
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
          </v-col>
          <v-col cols="12" md="6">
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
                  :label="$t('content.time_label')"
                  append-icon="mdi-clock"
                  placeholder="HH:MM"
                  outlined
                  color="black"
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
                  {{$t('content.cancelbtn')}}
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
        <v-row dense>
          <v-col cols="12">
            <v-textarea
              v-model="message"
              :label="$t('content.message_label')"
              :placeholder="$t('content.message_example')"
              outlined
              color="black"
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
        
        {{$t('content.submitbtn')}}
      </v-btn>
      <v-btn
        color="red"
        text
        outlined
      >
        {{$t('content.clearbtn')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FeedbackForm",
  data() {
    return {
      name: "",
      vatsim_id: "",
      controller_cid: "",
      controller_position: "",

      date: "",
      dateModal: false,
      maxDate: this.getDateToday(),
      minDate: this.getDateMinusNDays(3),

      time: "",
      timeModal: false,
      message: "",
    }
  },
  methods: {
    allowedStep: m => m % 5 === 0,
    getDateToday() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      return `${yyyy}-${mm}-${dd}`
    },
    getDateMinusNDays(n) {
      var date = new Date();
      date.setDate(date.getDate()-n)
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();
      return `${yyyy}-${mm}-${dd}`
    }
  }
}
</script>

<style scoped>

</style>

<i18n>
{
  "en": {
    "content": {
      "title": "ATC Feedback",
      "subheading": "Leave our controllers some feedback if you appreciated the services, and especially if you did not!",
      "atcid_label": "Controller's ID",
      "atcid_example": "E.g. 1267123",
      "atcposition_label": "Controller position",
      "atcposition_example": "E.g. LFFF_CTR",
      "date_label": "Choose date",
      "time_label": "Choose approximate time",
      "picker_locale": "en",
      "message_label": "Your message",
      "message_example": "Buy this controller a 🥐",
      "submitbtn": "Submit",
      "clearbtn": "Clear",
      "cancelbtn": "Cancel"
    }
  },
  "fr": {
    "content": {
      "title": "Feedback ATC",
      "subheading": "Si vous avez apprécié, ou pas, le service ATC, laissez un retour au(x) contrôleur(s)!",
      "atcid_label": "CID du contrôleur",
      "atcid_example": "Ex: 1267123",
      "atcposition_label": "Position du contrôleur",
      "atcposition_example": "Ex: LFFF_CTR",
      "date_label": "Choisissez une date",
      "time_label": "Heure approximative",
      "picker_locale": "fr",
      "message_label": "Votre retour d'expérience",
      "message_example": "Achetez lui un un délicieux 🥐",
      "submitbtn": "Soumettre",
      "clearbtn": "Réinitialiser",
      "cancelbtn": "Annuler"
    }
  }
}
</i18n>