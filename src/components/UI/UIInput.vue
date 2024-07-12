<template>
  <div class="container">
    <label>
      {{ label }}
      <span v-if="required" class="required-icon">*</span>
    </label>
    <input :type="type" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
export default {
  name: "UIInput",
  props: {
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
  },
};
</script>

<style scoped lang="sass">
@use "@/assets/style/variables.sass" as *

.container
    display: flex
    flex-direction: column
    gap: 4px

input
    height: 30px
    max-width: 300px
    padding: 4px 10px

    border-radius: 10px
    border: 1px solid $grey

    font-size: 16px
    color: $black

input:focus
    outline: none
    border: 1px solid $blue-light

label
    font-size: 13px
    color: $blue-dark

.required-icon
    color: $error
</style>
