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
      @input="handleChange($event)"
    />
    <!-- v-if="(v && !v.required && v.$dirty) || errorMessage" -->
    <span class="error">
      {{ errorMessage ? errorMessage : "Заполните это поле" }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "UIInput",
  props: {
    value: {
      type: String,
      default: "",
    },
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

label
    font-size: 12px
    color: $blue-dark
    font-weight: 400

.required-icon
    color: $error

.error
  color: $error
  font-size: 10px
</style>
