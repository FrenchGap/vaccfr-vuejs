<template>
  <div>
    <v-app-bar
      app
      color="black"
      dark
      clipped-left
    >
      <v-toolbar-side-icon>
        <v-img :src="logoPath" width="200px"></v-img>
      </v-toolbar-side-icon>

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
          <v-list-item link v-for="(item, j) in section.items" :key="j" :to="item.url">
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
      logoPath: require('../../assets/vaccfr.png'),
      rightMenu: [
        { text: "Settings", icon: "mdi-cog", name: "Dashboard.logout" },
        { text: "Logout", icon: "mdi-logout", name: "Dashboard.logout" },
      ],
      navigationDrawer: [
        { section_name: "General", items: [
          { text: "Library", icon: "mdi-folder", url: "/" },
          { text: "Calendar", icon: "mdi-calendar", url: "/" },
          { text: "My Statistics", icon: "mdi-account", url: "/" },
          { text: "My Settings", icon: "mdi-cog", url: "/" },
        ] },
        {
          section_name: "ATC", items: [
            { text: "Roster", icon: "mdi-account-group", url: "/" },
            { text: "Booking", icon: "mdi-clock", url: "/" },
            { text: "Resources", icon: "mdi-clock", url: "/" },
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