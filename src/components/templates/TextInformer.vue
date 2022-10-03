<template>
  <div :class="className">{{ text }}</div>
</template>

<script>
export default {
  name: "TextInformer",
  props: {
    text: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: false,
      default(rawProps) {
        return "";
      }
    }
  },
}
</script>
