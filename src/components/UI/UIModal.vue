<template>
  <div v-if="isOpen" class="background flex-center" @click.self="toggle">
    <div class="container flex-center">
      <img
        class="filter-grey close-icon"
        src="/icons/close.svg"
        width="20"
        height="20"
        @click="toggle"
      />

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "UIModal",
  props: {
    isOpen: { type: Boolean, required: true },
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="sass" scoped>
@use "@/assets/style/variables.sass" as *
.background
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.5 )

.container
    position: relative
    padding: 100px 40px

    min-width: 400px
    height: fit-content

    background: white
    border-radius: 16px
    z-index: 2

    @media (max-width: $phone)
        min-width: 100px
        margin: 20px
        padding: 50px 40px

.close-icon
    position: absolute
    right: 20px
    top: 20px
    cursor: pointer
</style>
