<template>
  <div :class="['container']">
    <label>
      {{ label }}
      <span v-if="required" class="required-icon">*</span>
    </label>
    <input
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :class="[v && v.$error && 'input-error', className]"
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
    className: String,
  },
  methods: {
    handleChange(event) {
      const newValue = event.target.value == "none" ? null : event.target.value;
      this.$emit(`input`, newValue);
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
    width: fit-content
    max-width: 300px
    position: relative

input
    height: 40px
    padding: 4px 10px
    margin: 0.5px
    width: 300px
    border-radius: 10px
    border: 1px solid $grey

    box-sizing: border-box

    font-size: 14px
    font-weight: 400
    color: $black

input:focus
    margin: 0.2
    outline: none
    border: 1.3px solid $blue-light
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

.error-message
  color: $red
  font-size: 10px

.input-error
  margin: 0.2
  border: 1.25px solid $red

.w-80
  min-width: 80px
  width: 80px

.w-120
  min-width: 120px
  width: 80px
</style>
