<template>
  <div class="filter-field">
    <p>{{ title }}</p>
    <label>
      <select v-model="value" @change="emitEvent">
        <option value="null">Все</option>
        <option v-for="val in filteredValues" :key="val" :value="val">{{ val }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "SelectField",
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
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      value: null,
    }
  },
  computed: {
    filteredValues() {
      return this.values.filter(item => item !== null);
    }
  },
  methods: {
    emitEvent() {
      this.$emit("change-field", [this.field, this.value]);
    }
  }
}
</script>
