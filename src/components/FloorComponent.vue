<template>
  <div class="floor">
    <TextInformer :text="floor.floor" class-name="floor__title"/>
    <div class="build">
      <FlatComponent v-for="flat in floor.flats" :key="flat.id" :id="flat.id" @show-modal="emitShowModal"/>
    </div>
  </div>
</template>

<script>
import FlatComponent from "@/components/FlatComponent.vue";
import TextInformer from "@/components/templates/TextInformer.vue";

export default {
  name: "FlorItem",
  components: {FlatComponent, TextInformer},
  props: {
    floor: {
      type: Object,
      required: true,
    }
  },
  methods: {
    emitShowModal(id) {
      this.$emit("show-modal", id)
    },
  }
}
</script>
