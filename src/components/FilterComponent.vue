<template>
  <div>
    <div v-for="field in fields" :key="field.title">
      <component
          :is="field.type"
          :title="field.title"
          :values="field.values"
          :field="field.name"
          @change-field="emitChangeFilter"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  props: {
    fields: {
      type: Object,
      required: true,
    }
  },
  methods: {
    emitChangeFilter(newValue) {
      this.$emit("change-filter", newValue);
    }
  }
}
</script>
