<template>
  <BaseLayout>
    <template #header>
      <v-navigation-drawer
        :value="drawer"
        app
        disable-route-watcher
        disable-resize-watcher
        fixed
        hide-overlay
        :temporary="!pinned"
        @input="setDrawer($event)"
        @mouseenter="drawerOn"
      >
        <NavToolbarMobile
          :value="pinned"
          :items="availableItems"
          @input="setPinned($event)"
        />
      </v-navigation-drawer>

      <v-app-bar fixed app @mouseenter.native.stop="drawerOff">
        <v-app-bar-nav-icon
          v-if="!pinned"
          class="mb-3"
          @mouseenter.stop="drawerOn"
          @click.stop="setDrawer(!drawer)"
        />
        <v-spacer />
        <v-icon @click.stop="changeTheme"> mdi-moon-waning-crescent </v-icon>
      </v-app-bar>
    </template>
    <template #default>
      <v-container fluid>
        <slot />
        <nuxt />
      </v-container>
    </template>
    <template #footer>
      <v-footer fixed app @mouseenter.native="drawerOff">
        <span>&copy; E-commerce store</span>
      </v-footer>
    </template>
  </BaseLayout>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import BaseLayout from "@/layouts/base"
import NavToolbarMobile from "@/components/NavToolbarMobile"
export default {
  components: {
    BaseLayout,
    NavToolbarMobile,
  },
  data() {
    return {
      toolbar: false,
      dark: true,
      hideSyncData: {},
      items: [
        {
          icon: "mdi-view-dashboard-outline",
          text: "Dashboard",
          to: "/",
          order: 1,
        },
        {
          icon: "mdi-account",
          text: "Users",
          to: "/users",
          order: 2,
        },
        {
          icon: "mdi-store",
          text: "Stores",
          to: "/stores",
          order: 3,
        },
        {
          icon: "mdi-tag",
          text: "Products",
          to: "/products",
          order: 4,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(["drawer", "pinned"]),
    availableItems() {
      return [...this.items].sort(function (a, b) {
        return a.order < b.order ? -1 : 1
      })
    },
  },
  watch: {
    pinned(v) {
      setTimeout(() => this.$store.commit("drawer", v), 100)
    },
  },
  beforeCreate() {
    this.$utils.maybeEnableDarkTheme.call(this)
  },
  beforeMount() {
    this.$bus.$on("drawerOff", () => {
      this.drawerOff()
    })
  },
  beforeDestroy() {
    this.$bus.$off("drawerOff")
  },
  methods: {
    ...mapActions(["setDrawer", "setPinned"]),
    drawerOn() {
      if (this.$device.isMobile || this.pinned) return
      this.$store.commit("drawer", true)
    },
    drawerOff() {
      if (this.$device.isMobile || this.pinned) return
      this.$store.commit("drawer", false)
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    redirectTo(url) {
      this.$router.push(url).catch((e) => {})
    },
  },
}
</script>
