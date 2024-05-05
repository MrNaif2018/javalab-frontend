<template>
  <item-data :headers="headers" :url="url" :title="title" />
</template>
<script>
import ItemData from "@/components/ItemData.vue"
export default {
  components: {
    ItemData,
  },
  data() {
    return {
      headers: [
        { text: "ID", value: "id", mode: "display", copy: true },
        {
          text: "Email",
          value: "email",
          rules: ["required", "email"],
          errors: {
            'duplicate key value violates unique constraint "users_email_idx"':
              "This user already exists",
          },
        },
        {
          text: "Password",
          value: "password",
          mode: "nodisplay",
          input: "password",
          rules: ["required", "min"],
          hint: "At least 8 characters",
        },
        { text: "Created date", value: "created", mode: "display" },
        { text: "Actions", value: "action", sortable: false },
      ],
      url: "users",
      title: "User",
    }
  },
  methods: {
    updateUser(item) {
      this.$axios.patch(`/${this.url}/${item.id}`, item)
    },
  },
}
</script>
