<template>
  <div>
    <h3>{{ message }}</h3>
    <h5>{{ messageSub }}</h5>
  </div>
</template>

<script>
export default {
  name: "SuccessMessage",
  props: {
    message: String,
    messageSub: String,
  },
};
</script>

<style lang="sass" scoped>
@use "@/assets/style/variables.sass" as *
h3, h5
    color: $blue-dark
    text-align: center
h5
    font-weight: 500
</style>
