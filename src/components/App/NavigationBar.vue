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
          <v-list-item link v-for="(item, index) in rightMenu" :key="index" :to="item.url">
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
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-folder</v-icon></v-list-item-icon>
          <v-list-item-title>My Files</v-list-item-title>
        </v-list-item>
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
        { text: "Settings", icon: "mdi-cog", url: "/settings" },
        { text: "Logout", icon: "mdi-logout", url: "/logout" },
      ]
    }
  }
}
</script>

<style>

</style>