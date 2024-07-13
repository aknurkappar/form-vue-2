<template>
  <div class="container">
    <label>
      {{ label }}
      <span v-if="required" class="required-icon">*</span>
    </label>
    <input
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :class="{ 'input-error': v && v.$error }"
      v-mask="mask"
      @input="handleChange($event)"
    />

    <span
      class="error-message"
      v-if="
        value &&
        v &&
        v.$dirty &&
        v.isValid &&
        v.isValid.$invalid &&
        v.isValid.$message
      "
    >
      {{ v.isValid.$message }}
    </span>
  </div>
</template>

<script>
export default {
  name: "UIInput",
  props: {
    value: String,
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    mask: String,
    required: { type: Boolean, default: false },
    errorMessage: {
      type: String,
      default: "",
    },
    v: Object,
  },
  methods: {
    handleChange(event) {
      this.$emit(`input`, event.target.value);
    },
  },
};
</script>

<style scoped lang="sass">
@use "@/assets/style/variables.sass" as *

.container
    display: flex
    flex-direction: column
    gap: 4px
    max-width: 300px
    position: relative


input
    height: 30px
    padding: 4px 10px
    margin: 0.5px

    border-radius: 10px
    border: 1px solid $grey

    font-size: 14px
    font-weight: 400
    color: $black

input:focus
    margin: 0
    outline: none
    border: 1.5px solid $blue-light
input:placeholder
    color: $grey

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

input[type=number]
  -moz-appearance: textfield

label
    font-size: 12px
    color: $blue-dark
    font-weight: 400

.required-icon
    color: $red

.error-message
  color: $red
  font-size: 10px

.input-error
  margin: 0
  border: 1.5px solid $red

.warning
  filter: $filter-red
  width: 16px
  height: 16px
  position: absolute
  right: -20px
  top: calc(100% / 2)
</style>
