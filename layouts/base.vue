<template>
  <v-app dark :style="customStyle">
    <slot name="header" />
    <v-main @mouseenter.native="$bus.$emit('drawerOff')">
      <slot />
    </v-main>
    <slot name="footer" />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      unconfiguredTitle: "Admin panel unconfigured",
    }
  },
  computed: {
    customStyle() {
      return this.$route.query.modal
        ? { background: "rgba(55, 58, 60, 0.4)" }
        : {}
    },
  },
}
</script>
