<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-card
                elevation="3"
              >
                <v-card-title>{{$t('welcomeBoxContent.welcome')}}</v-card-title>
                <v-card-text>
                  {{$t('welcomeBoxContent.welcomeMessage')}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <OnlineATC />
        </v-col>
        <v-col cols="12" md="6">
          <ATCBooking />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import OnlineATC from '@/components/Landingpage/Modules/OnlineATC.vue';
import ATCBooking from '@/components/Landingpage/Modules/ATCBooking.vue';

export default {
  components: { OnlineATC, ATCBooking },
  name: 'Home',
  data() {
    return {
      
    }
  },
  mounted() {
    this.$emit('mastHeadRequired', require('@/assets/media/banner_vacc_france.jpg'));
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>

<i18n>
{
  "en": {
    "welcomeBoxContent": {
      "welcome": "Welcome to the French vACC",
      "welcomeMessage": "The French vACC is the French community for virtual pilots and controllers on the VATSIM Network. VATSIM is a network for virtual flight simulation enthusiasts, which connects virtual air traffic controllers with virtual pilots. The French vACC provides virtual air traffic control services over metropolitan France on VATSIM, and trains new pilots on phraseology, procedures and particularities of flying on the network. We also maintain and develop air traffic control procedures, in line with the real world, and we train virtual air traffic controllers to provide realistic services to pilots. Overall, we are a community of aviation fans, and seek to exchange knowledge on our favourite topics. Join us now to begin your virtual pilot/ATC career!"
    }
  },
  "fr": {
    "welcomeBoxContent": {
      "welcome": "Bienvenue dans la vACC France",
      "welcomeMessage": "La vACC France est une communauté de pilotes et de contrôleurs virtuels sur VATSIM, lequel est un réseau de simulation de vol connectant pilotes et contrôleurs aériens. La vACC France propose un service de contrôle sur le territoire de la France métropolitaine, entraine les pilotes sur des thèmes comme la phraséologie, les procédures et particularités du vol en ligne. Nous assurons le contrôle aérien, en accord avec les procédures réelles, tout en dispensant les formations. Avant tout, nous sommes une communauté de passionnés d’aviation, qui échange et partage son savoir faire. Rejoignez nous dès à présent pour commencer votre carrière de pilote ou contrôleur virtuel!"
    }
  }
}
</i18n>