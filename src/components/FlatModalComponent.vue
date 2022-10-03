<template>
  <div class="back-stage">
    <div class="modal">
      <div>type: {{ flat.type }}</div>
      <div>cost: {{ flat.cost }}</div>
      <div>floor: {{ flat.floor }}</div>
      <div>renovation: {{ flat.renovation }}</div>
      <div>square: {{ flat.square }}</div>
      <div>status: {{ flat.status }}</div>
      <button @click="hide">hide</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlatModal",
  props: {
    flat: {
      type: Object,
      required: true,
    }
  },
  methods: {
    hide() {
      this.$emit("hide-modal");
    }
  }
}
</script>

<style scoped>

</style>