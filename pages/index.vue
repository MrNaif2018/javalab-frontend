<template>
  <v-container>
    <v-row class="justify-center pb-4">
      <div class="text-h3">Dashboard</div>
    </v-row>
    <v-row>
      <v-col cols="1.5" />
      <v-col v-for="card in cards" :key="card.id" md="3" cols="12">
        <InfoCard :texts="card.texts" :link="card.link" />
      </v-col>
      <v-col cols="1.5" />
    </v-row>
  </v-container>
</template>

<script>
import InfoCard from "@/components/InfoCard"
export default {
  components: {
    InfoCard,
  },
  layout: "dashboard",
  data() {
    return {
      cards: [
        {
          texts: [
            {
              header: "Users",
              key: "users",
              value: "",
            },
            {
              header: "Total users:",
              key: "users",
              value: "users created",
            },
          ],
          link: "/users",
        },
        {
          texts: [
            {
              header: "Stores",
              key: "stores",
              value: "",
            },
            {
              header: "Total stores:",
              key: "stores",
              value: "stores created",
            },
          ],
          link: "/stores",
        },
        {
          texts: [
            {
              header: "Total products",
              key: "products",
              value: "",
            },
            {
              header: "Total products created:",
              key: "products",
              value: "product in stores",
            },
          ],
          link: "/products",
        },
      ],
    }
  },
}
</script>
