<template>
  <div>
    <v-app-bar
      app
      color="black"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon
        class="d-md-flex d-lg-none"
        @click="rightMenuDrawer = !rightMenuDrawer"
      ></v-app-bar-nav-icon>

      <router-link :to="{ name: 'Landingpage.index' }">
        <v-img :src="require('@/assets/vaccfr.png')" width="200px" />
      </router-link>

      <v-spacer></v-spacer>

      <span>UTC: {{ UTCTime }}</span>

      <v-spacer></v-spacer>

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

      <v-menu offset-y rounded="lg">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link v-for="(item, index) in rightMenu" :key="index" :to="{ name: item.name }" exact>
            <v-list-item-title>{{item.text}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      app
      clipped
      expand-on-hover
      class="d-none d-md-flex"
    >
      <v-list
        nav
        dense
      >
        <div v-for="(section, i) in navigationDrawer" :key="i">
          <v-list-item link v-for="(item, j) in section.items" :key="j" :to="{ name: item.name }" exact>
            <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      app
      class="d-md-flex d-lg-none"
      v-model="rightMenuDrawer"
      temporary
    >
      <v-list
        nav
        dense
      >
        <div v-for="(section, i) in navigationDrawer" :key="i">
          <v-list-item link v-for="(item, j) in section.items" :key="j" :to="{ name: item.name }" exact>
            <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-row class="mt-4">
      <v-spacer></v-spacer>
      <div
        class="text-h3"
      >
        {{pageTitle}}
      </div>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "DashboardNavigationBar",
  props: {
    pageTitle: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      rightMenu: [
        { text: "Profile", icon: "mdi-account", name: "Dashboard.profile" },
        { text: "Logout", icon: "mdi-logout", name: "logout" },
      ],
      rightMenuDrawer: false,
      navigationDrawer: [
        { section_name: "General", items: [
          { text: this.$t('menu.general.home'), icon: "mdi-home", name: "Dashboard.index" },
          { text: this.$t('menu.general.library'), icon: "mdi-book", name: "Dashboard.library" },
          { text: this.$t('menu.general.calendar'), icon: "mdi-calendar", name: "Dashboard.calendar" },
          { text: this.$t('menu.general.myprofile'), icon: "mdi-account", name: "Dashboard.profile" },
        ] },
        {
          section_name: "ATC", items: [
            { text: this.$t('menu.atc.roster'), icon: "mdi-account-group", name: "Dashboard.atc.roster" },
            { text: this.$t('menu.atc.booking'), icon: "mdi-clock", name: "Dashboard.atc.booking" },
            { text: this.$t('menu.atc.resources'), icon: "mdi-folder", name: "Dashboard.atc.resources" },
          ]
        }
      ],
      UTCTime: "",
      localesList: this.$store.state.LocaleStore.localeList,
    }
  },
  mounted() {
    this.getUTCTime()
  },
  methods: {
    getUTCTime() {
      var today = new Date();
      this.UTCTime = today.getUTCHours() + ":" + this.checkTime(today.getUTCMinutes()) + ":" + this.checkTime(today.getUTCSeconds()) + "z";
      setTimeout(this.getUTCTime, 500)
    },
    checkTime(i) {
      if (i < 10) {i = "0" + i}
      return i;
    },
    setLocale(locale) {
      this.$store.dispatch('LocaleStore/changeLocale', locale)
      .then(() => {
        this.navigationDrawer = [
          { section_name: "General", items: [
            { text: this.$t('menu.general.home'), icon: "mdi-home", name: "Dashboard.index" },
            { text: this.$t('menu.general.library'), icon: "mdi-book", name: "Dashboard.library" },
            { text: this.$t('menu.general.calendar'), icon: "mdi-calendar", name: "Dashboard.calendar" },
            { text: this.$t('menu.general.myprofile'), icon: "mdi-account", name: "Dashboard.profile" },
          ] },
          {
            section_name: "ATC", items: [
              { text: this.$t('menu.atc.roster'), icon: "mdi-account-group", name: "Dashboard.atc.roster" },
              { text: this.$t('menu.atc.booking'), icon: "mdi-clock", name: "Dashboard.atc.booking" },
              { text: this.$t('menu.atc.resources'), icon: "mdi-folder", name: "Dashboard.atc.resources" },
            ]
          }
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
      "general": {
        "home": "Home",
        "library": "Library",
        "calendar": "Calendar",
        "myprofile": "My Profile"
      },
      "atc": {
        "roster": "Roster",
        "booking": "ATC Booking",
        "resources": "ATC Tools & Resources"
      }
    }
  },
  "fr": {
    "menu": {
      "general": {
        "home": "Accueil",
        "library": "Librairie",
        "calendar": "Calendrier",
        "myprofile": "Mon Profil"
      },
      "atc": {
        "roster": "Roster",
        "booking": "Réservations ATC",
        "resources": "Ressources & Outils ATC"
      }
    }
  }
}
</i18n>