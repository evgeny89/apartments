<template>
  <div class="flat" :class="getClassFromStatus" @click="showModal">{{ flatPlanType }}</div>
</template>

<script>
export default {
  name: "FlatItem",
  props: {
    flat: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
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
      return `${this.flat.withoutInFilter ? "empty" : this.getClassName(this.flat.status)} ${this.checkLabel()}`;
    }
  },
  methods: {
    getClassName(status) {
      return this.statuses[status] || "default";
    },
    checkLabel() {
      return (this.flat.subsidy || this.flat.marginal || this.flat.renovation || this.flat.installment) && "label";
    },
    showModal() {
      this.$emit("show-modal", this.flat.id)
    }
  },
}
</script>
