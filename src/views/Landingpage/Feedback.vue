<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <FeedbackForm v-if="$store.state.VatsimSSO.authenticated" />
          <v-card
            elevation="5"
            v-else
            max-width="500"
          >
            <v-card-title>{{$t('content.title')}}</v-card-title>
            <v-card-text v-html="$t('content.warning')">
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                link
                outlined
                :to="{ name: 'login', query: { redirect: 'Landingpage.feedback' } }"
              >
                {{$t('content.loginbutton')}}
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

<style scoped></style>

<i18n>
{
  "en": {
    "content": {
      "title": "ATC Feedback",
      "warning": "To avoid any identity theft and to keep you and our users safe, <br>you must be authenticated to submit an ATC feedback.<br>Authentication is simple and uses the official VATSIM SSO.",
      "loginbutton": "Login with SSO"
    }
  },
  "fr": {
    "content": {
      "title": "Feedback ATC",
      "warning": "Pour éviter toutes usurpations d'identité et pour garantir votre sécurité et celle de nos membres, <br>vous devez être authentifié afin de soumettre un feedback.<br>L'authentification est simple et se fait avec le portail sécurisé du SSO VATSIM",
      "loginbutton": "M'authentifier avec le SSO"
    }
  }
}
</i18n>