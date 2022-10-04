<template>
  <div class="filter-field">
    <label class="checkbox-field">
      <span>{{ title }}</span>
      <input type="checkbox" v-model="value" :checked="values" class="checkbox-input" @change="emitEvent">
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckboxField",
  props: {
    title: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    values: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      value: null,
    }
  },
  methods: {
    emitEvent() {
      console.log(this.value)
      this.$emit("change-field", [this.field, this.value]);
    }
  }
}
</script>
