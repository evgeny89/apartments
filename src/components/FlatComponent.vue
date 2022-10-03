<template>
  <div class="flat" @click="showModal">{{ flat.number }}</div>
</template>

<script>
export default {
  name: "FlatItem",
  props: {
    flat: {
      type: Object,
      required: true,
      default(rawProps) {
        return { number: 0 }
      }
    }
  },
  methods: {
    showModal() {
      this.$emit("show-modal", this.flat.id)
    }
  }
}
</script>
