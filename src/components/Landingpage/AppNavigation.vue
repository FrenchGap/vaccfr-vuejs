<template>
  <v-img
    :src="mastheadPath"
    dark
    max-height="500px"
    gradient="to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)"
  >
    <v-app-bar
      absolute
      flat
      color="transparent"
      dark
      height="80px"
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <router-link :to="{ name: 'Landingpage.index' }">
        <v-img :src="require('@/assets/vaccfr.png')" width="220px" />
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        v-for="(item, index) in items"
        :key="index"
        text
        link
        :to="{ name: item.name }"
        exact
        class="d-none d-md-flex"
      >
        {{ item.title }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        text
        link
        v-if="$store.state.VatsimSSO.authenticated == false"
        :to="{ name: 'login' }"
        class="d-none d-md-flex"
      >
        {{$t('menu.login')}}
      </v-btn>
      <v-btn
        text
        link
        v-if="$store.state.VatsimSSO.authenticated == true"
        :to="{ name: 'Dashboard.index' }"
        class="d-none d-md-flex"
      >
        {{$store.state.User.fname}} {{$store.state.User.lname}}
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-img
              :src="require(`@/assets/localesFlags/${$i18n.locale}-flag.png`)"
              height="28px"
              width="28px"
            >
            </v-img>
          </v-btn>
        </template>
        <v-list dark>
          <v-list-item
            v-for="locale in localesList"
            :key="locale"
            @click="setLocale(locale)"
          >
            <v-list-item-title>
              <v-img
                :src="require(`@/assets/localesFlags/${locale}-flag.png`)"
                height="28px"
                width="28px"
              >
              </v-img>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            dark
            v-bind="attrs"
            v-on="on"
            class="d-xs d-md-none"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            link
            :to="{ name: item.name }"
            exact
          >
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            link
            v-if="$store.state.VatsimSSO.authenticated == false"
            :to="{ name: 'login' }"
          >
            <v-list-item-title>{{$t('menu.login')}}</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            v-if="$store.state.VatsimSSO.authenticated == true"
            :to="{ name: 'Dashboard.index' }"
          >
            <v-list-item-title>{{$store.state.User.fname}} {{$store.state.User.lname}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
  </v-img>
</template>

<script>
export default {
  name: "AppNavigation",
  props: {
    mastheadPath: {
      required: true,
      default: require('@/assets/media/banner_vacc_france.jpg')
    }
  },
  data () {
    return {
      appTitle: "French vACC",
      drawer: false,
      items: [
        { title: this.$t('menu.home'), name: "Landingpage.index" },
        { title: this.$t('menu.atc'), name: "Landingpage.ATC" },
        { title: this.$t('menu.pilots'), name: "Landingpage.pilots" },
        { title: this.$t('menu.discord'), name: "Landingpage.discord" },
        { title: this.$t('menu.feedback'), name: "Landingpage.feedback" },
      ],
      localesList: this.$store.state.LocaleStore.localeList,
    }
  },
  mounted() {

  },
  methods: {
    setLocale(locale) {
      this.$store.dispatch('LocaleStore/changeLocale', locale)
      .then(() => {
        this.items = [
          { title: this.$t('menu.home'), name: "Landingpage.index" },
          { title: this.$t('menu.atc'), name: "Landingpage.ATC" },
          { title: this.$t('menu.pilots'), name: "Landingpage.pilots" },
          { title: this.$t('menu.discord'), name: "Landingpage.discord" },
          { title: this.$t('menu.feedback'), name: "Landingpage.feedback" },
        ]
      });
    }
  }
}
</script>

<style scoped>
</style>

<i18n>
{
  "en": {
    "menu": {
      "home": "Home",
      "atc": "ATC",
      "pilots": "Pilots",
      "discord": "Discord",
      "feedback": "Feedback",
      "login": "SSO Login"
    }
  },
  "fr": {
    "menu": {
      "home": "Accueil",
      "atc": "ATC",
      "pilots": "Pilotes",
      "discord": "Discord",
      "feedback": "Feedback",
      "login": "Connexion SSO"
    }
  }
}
</i18n>