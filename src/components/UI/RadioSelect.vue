<template>
  <div class="select">
    <p class="select-label">{{ label }}</p>
    <div class="select-content">
      <label v-for="option in options" :key="option.key" class="select-item">
        <input
          type="radio"
          :value="option.key"
          v-model="selected"
          :checked="option.key == selected"
          @change="handleChange($event)"
        />
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioSelect",
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: String,
    label: String,
  },
  data() {
    return {
      selected: null,
    };
  },
  methods: {
    handleChange(event) {
      this.$emit(
        "input",
        this.selected === event.target.value ? null : this.selected
      );
    },
  },
};
</script>

<style lang="sass" scoped>
@use "@/assets/style/variables.sass" as *
.select
    max-width: 300px
    &-item
        background: #EBEBEB
        padding: 8px
        border-radius: 10px
        color: $black
        font-size: 14px
        cursor: pointer
    &-content
      display: grid
      grid-template-columns: auto auto
      grid-gap: 4px
    &-label
      font-size: 12px
      color: $blue-dark
      font-weight: 400
</style>
