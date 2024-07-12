<template>
  <form class="add-client" @submit.prevent="onSubmit">
    <h2>Добавить клиента</h2>
    <section>
      <h4>Основные данные</h4>
      <UIInput
        v-model="newUser.lastName"
        :v="v$.newUser.lastName"
        label="Фамилия"
        placeholder="Введите фамилию"
        required
      />
      <UIInput
        v-model="newUser.firstName"
        :v="v$.newUser.firstName"
        label="Имя"
        placeholder="Введите имя"
        required
      />
      <UIInput
        v-model="newUser.middleName"
        :v="v$.newUser.middleName"
        label="Отчество"
        placeholder="Введите отчеству"
      />
      <UIInput label="Дата рождения" placeholder="ДД / ММ / ГГГГ" />
    </section>

    <section>
      <h4>Контактные данные</h4>
      <UIInput
        v-model="newUser.phone"
        label="Номер телефона"
        placeholder="+7 777 777 77 77"
        required
      />
      <UIInput label="Индекс" placeholder="Ввидите фамилия клиента" />
      <!-- Страна selector -->
      <!-- Область selector -->
      <!-- Город ?  -->
      <UIInput label="Улица" placeholder="Ввидите фамилия клиента" />
      <UIInput label="Дом" placeholder="Ввидите фамилия клиента" />
    </section>

    <section>
      <h4>Данные личного документа</h4>
      <UIInput label="Фамилия" placeholder="Ввидите фамилия клиента" required />
    </section>

    <UIButton type="submit" className="gradient">Добавить</UIButton>
  </form>
</template>

<script>
import UIInput from "./UI/UIInput.vue";
import UIButton from "./UI/UIButton.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "AddClientForm",
  components: { UIInput, UIButton },
  setup: () => ({ v$: useVuelidate() }),
  mounted() {
    console.log(this.v$.newUser.phone.required);
  },
  data() {
    return {
      newUser: {
        lastName: "Aknur",
        firstName: "",
        middleName: "",
        phone: "",
      },
    };
  },
  validations() {
    return {
      newUser: {
        lastName: { required },
        firstName: { required },
        phone: { required },
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("onSubmit", this.newUser);
    },
  },
  watch: {
    newUser() {
      console.log(this.newUser);
    },
  },
};
</script>

<style scoped lang="sass">
@use "@/assets/style/variables.sass" as *

.add-client
  margin: 30px 100px
  display: flex
  flex-direction: column
  gap: 14px
  section
    padding: 30px
    background: $grey-light

    display: flex
    flex-direction: column
    gap: 14px

    border-radius: 10px

    h4
      color: $blue-dark
      line-height: 0px
</style>
