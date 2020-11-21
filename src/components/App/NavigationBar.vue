<template>
  <div>
    <v-app-bar
      app
      color="black"
      dark
      clipped-left
    >
      <router-link :to="{ name: 'Landingpage.index' }">
        <v-img :src="require('@/assets/vaccfr.png')" width="200px" />
      </router-link>

      <v-spacer></v-spacer>

      <span>UTC time: {{ UTCTime }}</span>

      <v-spacer></v-spacer>

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
          <v-list-item link v-for="(item, index) in rightMenu" :key="index" :to="{ name: item.name }">
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
    >
      <v-list
        nav
        dense
      >
        <div v-for="(section, i) in navigationDrawer" :key="i">
          <!-- <v-list-item>{{ section.section_name }}</v-list-item> -->
          <v-list-item link v-for="(item, j) in section.items" :key="j" :to="{ name: item.name }">
            <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "DashboardNavigationBar",
  data() {
    return {
      rightMenu: [
        { text: "Settings", icon: "mdi-cog", name: "Landingpage.index" },
        { text: "Logout", icon: "mdi-logout", name: "logout" },
      ],
      navigationDrawer: [
        { section_name: "General", items: [
          { text: "Home", icon: "mdi-home", name: "Dashboard.index" },
          { text: "Library", icon: "mdi-book", name: "Dashboard.library" },
          { text: "Calendar", icon: "mdi-calendar", name: "Dashboard.calendar" },
          { text: "My Statistics", icon: "mdi-account", name: "Dashboard.profile.mystats" },
          { text: "My Settings", icon: "mdi-cog", name: "Dashboard.profile.mysettings" },
        ] },
        {
          section_name: "ATC", items: [
            { text: "Roster", icon: "mdi-account-group", name: "Dashboard.atc.roster" },
            { text: "Booking", icon: "mdi-clock", name: "Dashboard.atc.booking" },
            { text: "Resources", icon: "mdi-folder", name: "Dashboard.atc.resources" },
          ]
        }
      ],
      UTCTime: ""
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
    }
  }
}
</script>

<style>

</style>