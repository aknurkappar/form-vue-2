<template>
  <button
    :type="type"
    :class="['button', className, disabled && `${className}-disabled`]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "UIButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    className: {
      type: String,
    },
    disabled: Boolean,
  },
};
</script>

<style scoped lang="sass">
@use "@/assets/style/variables.sass" as *

button
  max-width: 300px
  padding: 15px 25px

  font-size: 14px

  border-style: none
  border-radius: 10px

  cursor: pointer

.gradient
  margin-top: 10px
  background: $gradient-dark
  color: #fff
  &:hover
    background: $gradient-dark-hover


.gradient-disabled
  pointer-events: none
  background: linear-gradient(283.34deg, rgba(68, 107, 137, 0.3) -42.82%, rgba(68, 107, 137, 0.375) 34.27%, rgba(68, 107, 137, 0.3) 100.02%)
</style>
