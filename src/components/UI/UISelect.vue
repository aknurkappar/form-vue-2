<template>
  <div class="select">
    <p class="select-label">
      {{ label }} <span v-if="required" class="required-icon">*</span>
    </p>
    <div
      :class="[
        'select-placeholder',
        isOpen && 'select-placeholder-open',
        selected && 'select-placeholder-selected',
        (disabled || !options) && 'select-placeholder-disabled',
        v && v.$error && 'select-placeholder-error',
      ]"
      @click="toggle"
    >
      {{ currentPlaceholder }}
    </div>

    <div v-if="isOpen" class="select-content">
      <div
        v-for="option in options"
        :key="option.key"
        :class="['select-content-item', option.key == selected && 'selected']"
        @click="handleChange(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UISelect",
  props: {
    options: Array,
    value: String,
    label: String,
    disabled: Boolean,
    required: Boolean,
    placeholder: {
      type: String,
      required: true,
    },
    v: Object,
  },
  data() {
    return {
      selected: null,
      isOpen: false,
    };
  },
  computed: {
    currentPlaceholder: {
      get() {
        return !this.value || this.value == "none"
          ? this.placeholder
          : this.selected.name;
      },
    },
  },
  methods: {
    handleChange(option) {
      const newValue = option == "none" ? null : option;
      this.selected = newValue;
      this.toggle();
      this.$emit("input", newValue.key);
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="sass" scoped>
@use "@/assets/style/variables.sass" as *
.select
    position: relative
    max-width: 300px
    width: 100%
    &-content
      position: absolute
      top: calc( 100% / 2 + 35px )

      display: flex
      flex-direction: column
      width: 100%
      background: #fff
      border: 1px solid $grey
      border-radius: 10px

      overflow-y: auto
      z-index: 2

      &-item
        padding: 10px
        cursor: pointer
        font-size: 14px
        &:hover
          background: $grey-light

    &-label
      font-size: 12px
      color: $blue-dark
      font-weight: 400
      margin: 2px
    &-placeholder
      height: 30px
      padding: 4px 10px
      margin: 0.5px

      display: flex
      align-items: center

      border-radius: 10px
      border: 1px solid $grey

      font-size: 14px
      font-weight: 400

      background: white
      color: $grey-dark
      cursor: pointer
      &-open
        margin: 0.2
        outline: none
        border: 1.3px solid $blue-light
      &-selected
        color: $black
      &-disabled
        pointer-events: none
        background: $grey-light
      &-error
        margin: 0.2
        border: 1.3px solid $red
</style>
