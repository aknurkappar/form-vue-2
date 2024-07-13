<template>
  <div>
    <AddClientForm />
  </div>
</template>

<script>
import AddClientForm from "./components/AddClientForm.vue";

export default {
  name: "App",
  components: {
    AddClientForm,
  },
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap')

*
  font-family: 'Montserrat', sans-serif
  margin: 0
</style>
