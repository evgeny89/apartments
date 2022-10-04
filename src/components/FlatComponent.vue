<template>
  <div class="flat" :class="getClassFromStatus" @click="showModal">{{ flatPlanType }}</div>
</template>

<script>
export default {
  name: "FlatItem",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      flat: {},
      statuses: {
        "Выданы ключи": "gray-color",
        "Договор": "orange-color",
        "Бронь": "yellow-color",
        "Оформление": "blue-color",
        "Свободна": "green-color",
      },
    }
  },
  computed: {
    flatPlanType() {
      return this.flat.plan_type;
    },
    getClassFromStatus() {
      return this.getClassName(this.flat.status);
    }
  },
  methods: {
    getClassName(status) {
      return this.statuses[status] || "default";
    },
    showModal() {
      this.$emit("show-modal", this.flat.id)
    }
  },
  created() {
    this.flat = this.$root.getFlatProperties(this.id);
  }
}
</script>
