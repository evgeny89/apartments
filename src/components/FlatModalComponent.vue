<template>
  <div class="back-stage">
    <div class="modal">
      <button class="modal__btn" @click="hide" title="close">X</button>
      <p class="modal__text">{{ typeString }}</p>
      <p class="modal__text">{{ costString }}</p>
      <p class="modal__text">{{ floorString }}</p>
      <p class="modal__text">{{ squareString }}</p>
      <p class="modal__text">{{ statusString }}</p>
      <p class="modal__text">{{ installmentString }}</p>
      <p class="modal__text">{{ planTypeString }}</p>
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
  data() {
    return {
      propertyText: {
        default: "Нет информации",
        negation: "нет",
        statement: "да",
      },
    }
  },
  computed: {
    costString() {
      return `Цена: ${this.getFormattedCurrency(this.flat.cost) || this.propertyText.default}`;
    },
    installmentString() {
      return `Доступность рассрочки: ${this.flat.installment ? this.propertyText.statement : this.propertyText.negation}`;
    },
    floorString() {
      return `Этаж: ${this.flat.floor || this.propertyText.default}`;
    },
    planTypeString() {
      return `Планировка: ${this.flat.plan_type || this.flat.type}`;
    },
    statusString() {
      return `Статус: ${this.flat.status || this.propertyText.default}`;
    },
    squareString() {
      return `Общаяя площадь(м2): ${this.flat.square || this.propertyText.default}`;
    },
    typeString() {
      return `Тип недвижимости: ${this.flat.type || this.propertyText.default}`;
    },
  },
  methods: {
    getFormattedCurrency(number) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number)
    },
    hide() {
      this.$emit("hide-modal");
    },
  }
}
</script>
