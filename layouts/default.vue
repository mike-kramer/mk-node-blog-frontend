<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
        <nuxt name="sidebar" />
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title"  />
    </v-app-bar>
    <v-content>
      <v-container :fluid="true">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      title: 'Блог Михаила Крамера'
    }
  }
}
</script>
