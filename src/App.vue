<template>
  <header class="header">
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
  <aside>
    <FilterComponent :fields="filterFields" @change-filter="changeFilter"/>
  </aside>
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
import FilterComponent from "@/components/FilterComponent.vue";
import SelectField from "@/components/templates/SelectField.vue";
import CheckboxField from "@/components/templates/CheckboxField.vue";

export default {
  components: {
    FloorComponent,
    MenuComponent,
    TextInformer,
    FlatModalComponent,
    FilterComponent,
    SelectField,
    CheckboxField,
    RangeField,
  },
  data() {
    return {
      data: {},
      link: "/data",
      selectedHouse: null,
      showModal: false,
      tmpFlat: null,
      filters: {
        status: null,
        square: null,
        plan_type: null,
        subsidy: null,
        marginal: null,
        renovation: null,
        installment: null,
      }
    }
  },
  computed: {
    currentEntrances() {
      return this.data.entrances?.filter(entrance => entrance.house_id === this.selectedHouse);
    },
    filterFields() {
      const flats = Object.values(this.data.flats ?? []);

      const flatStatusList = Array.from(new Set(flats.map(flat => flat.status)));
      const flatSquareList = Array.from(new Set(flats.map(flat => flat.square))).sort((a, b) => a - b);
      const flatPlaneTypeList = Array.from(new Set(flats.map(flat => flat.plan_type)));

      return [
        {
          type: SelectField,
          title: "Статус",
          name: "status",
          values: flatStatusList,
        },
        {
          type: SelectField,
          title: "Площадь квартиры",
          name: "square",
          values: flatSquareList,
        },
        {
          type: SelectField,
          title: "Планировка",
          name: "plan_type",
          values: flatPlaneTypeList,
        },
        {
          type: CheckboxField,
          title: "Субсидия",
          name: "subsidy",
          values: false
        },
        {
          type: CheckboxField,
          title: "Маржинальная",
          name: "marginal",
          values: false
        },
        {
          type: CheckboxField,
          title: "С ремонтом",
          name: "renovation",
          values: false
        },
        {
          type: CheckboxField,
          title: "С рассрочкой",
          name: "installment",
          values: false
        },
      ]
    },
    filteredFlats() {
      return Object
          .values(this.data.flats)
          .map(item => {
            let res = [];

            for (const filter in this.filters) {
              res = [...res, {value: (this.filters[filter] && (item[filter] !== this.filters[filter]))}]
            }

            item.withoutInFilter = res.some(item => item.value);

            return item;
          })
          .reduce((flats, item) => {
            flats[item.id] = item;
            return flats;
          }, {});
    },
  },
  methods: {
    changeFilter([field, value]) {
      this.filters[field] = value !== "null" ? value : null;
    },
    async getServerData() {
      const response = await fetch(this.link);
      this.data = await response.json();
      this.selectedHouse = this.data.houses[0];
    },
    getFlatProperties(id) {
      return this.filteredFlats[id];
    },
    selectHouse(name) {
      this.selectedHouse = name;
    },
    toggleModalShow(id = null) {
      if (id) {
        this.tmpFlat = this.data.flats[id];
      }

      this.showModal = !this.showModal;
    },
  },
  created() {
    this.getServerData();
  },
}
</script>
