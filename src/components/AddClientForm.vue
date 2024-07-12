<template>
  <div class="">
    <h2>Добавить клиента</h2>
    <UIInput label="Фамилия" placeholder="Ввидите фамилия клиента" required />
  </div>
</template>

<script>
import UIInput from "./UI/UIInput.vue";
export default {
  name: "AddClientForm",
  components: { UIInput },
};
</script>

<style lang="sass"></style>
