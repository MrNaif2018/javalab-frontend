<template>
  <div>
    <item-data :headers="headers" :url="url" :title="title" :actions="actions">
      <template #item.userId="{ item }">
        <copy-text :value="item.userEmail || item.userId"></copy-text>
      </template>
    </item-data>
  </div>
</template>

<script>
import ItemData from "@/components/ItemData.vue"
import CopyText from "@/components/CopyText.vue"
export default {
  components: {
    ItemData,
    CopyText,
  },
  layout: "dashboard",
  data() {
    return {
      headers: [
        { text: "ID", value: "id", mode: "display", copy: true },
        { text: "Name", value: "name", rules: ["required"] },
        { text: "Email", value: "email", rules: ["required", "email"] },
        {
          text: "User",
          value: "userId",
          rules: ["required"],
          input: "autocomplete",
          url: "users",
          autocomplete_name: "email",
        },
        {
          text: "Products",
          value: "products",
          input: "autocomplete",
          url: "products",
          multiple: true,
          sortable: false,
          mode: "edit",
        },
        { text: "Created date", value: "created", mode: "display" },
        { text: "Actions", value: "action", sortable: false },
      ],
      actions: [
        {
          icon: "mdi-eye",
          text: "View products",
          process: this.showProducts,
        },
      ],
      url: "stores",
      title: "Store",
    }
  },
  methods: {
    showProducts(item, itemIndex) {
      this.$router.push({ path: `/products?query=${item.id}` })
    },
  },
}
</script>
