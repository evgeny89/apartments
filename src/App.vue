<template>
  <header>
    <ul class="house-list">
      <MenuComponent
          v-for="house in data.houses"
          :key="house"
          :name="house"
          @change-name="selectHouse"
          :active-menu="selectedHouse"
      />
    </ul>
  </header>
  <main class="main">
    <div class="section" v-for="entrance in currentEntrances" :key="entrance.id">
      <FloorComponent v-for="floor in entrance.floors" :key="floor.floor" :floor="floor" @show-modal="toggleModalShow"/>
      <TextInformer :text="entrance.title" class-name="entrance-title"/>
    </div>
  </main>
  <Teleport to="body">
    <FlatModalComponent :flat="tmpFlat" v-if="showModal" @hide-modal="toggleModalShow"/>
  </Teleport>
</template>

<script>
import FloorComponent from "@/components/FloorComponent.vue";
import MenuComponent from "@/components/MenuComponent.vue";
import TextInformer from "@/components/templates/TextInformer.vue";
import FlatModalComponent from "@/components/FlatModalComponent.vue";

export default {
  components: {FloorComponent, MenuComponent, TextInformer, FlatModalComponent},
  data() {
    return {
      data: {},
      link: "/data",
      selectedHouse: null,
      tmpFlat: null,
      showModal: false,
    }
  },
  computed: {
    currentEntrances() {
      return this.data.entrances?.filter(entrance => entrance.house_id === this.selectedHouse);
    },
  },
  methods: {
    selectHouse(name) {
      this.selectedHouse = name;
    },
    async getServerData() {
      const response = await fetch(this.link);
      this.data = await response.json();
      console.log(this.data);
    },
    toggleModalShow(id = null) {
      if (id) {
        this.tmpFlat = this.data.flats[id];
      }

      this.showModal = !this.showModal;
    }
  },
  mounted() {
    this.getServerData();
  },
}
</script>