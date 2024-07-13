<template>
  <label class="checkbox flex gap-8"
    ><input type="checkbox" :checked="value" @change="handleChange" /> <slot
  /></label>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  methods: {
    handleChange(event) {
      this.$emit("input", event.target.checked);
    },
  },
};
</script>

<style lang="sass" scoped>
@use "@/assets/style/variables.sass" as *
.checkbox
    font-size: 12px
    color: $blue-dark
</style>
