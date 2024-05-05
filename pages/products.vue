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
        { text: "Price", value: "price", rules: ["required", "positive"] },
        {
          text: "Quantity",
          value: "quantity",
          rules: ["required", "quantity"],
          hint: "Use -1 for unlimited quantity",
        },
        {
          text: "User",
          value: "userId",
          rules: ["required"],
          input: "autocomplete",
          url: "users",
          autocomplete_name: "email",
        },
        {
          text: "Stores",
          value: "stores",
          input: "autocomplete",
          url: "stores",
          multiple: true,
          sortable: false,
          mode: "edit",
        },
        { text: "Created date", value: "created", mode: "display" },
        {
          text: "Description",
          value: "description",
          input: "textarea",
          rows: 3,
          expand: true,
        },
        { text: "Actions", value: "action", sortable: false },
      ],
      actions: [
        {
          icon: "mdi-eye",
          text: "View stores",
          process: this.showStores,
        },
      ],
      url: "products",
      title: "Product",
    }
  },
  methods: {
    showStores(item, itemIndex) {
      this.$router.push({ path: `/stores?query=${item.id}` })
    },
  },
}
</script>
