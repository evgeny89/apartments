<template>
  <li class="house-item" @click="selectName" :class="{ active : isActive }">{{ name }}</li>
</template>

<script>
export default {
  name: "HouseMenu",
  props: {
    name: {
      type: String,
      required: true,
    },
    activeMenu: {
      type: String,
      required: false,
    }
  },
  computed: {
    isActive() {
      return this.activeMenu ? this.activeMenu === this.name : false;
    }
  },
  methods: {
    selectName() {
      this.$emit("change-name", this.name);
    }
  }
}
</script>
