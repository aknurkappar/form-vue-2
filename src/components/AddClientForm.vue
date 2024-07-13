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
      <UIInput
        v-model="newUser.dateOfBirth"
        :v="v$.newUser.dateOfBirth"
        label="Дата рождения"
        placeholder="ДД / ММ / ГГГГ"
        mask="##/##/####"
        required
      />
      <RadioSelector />
    </section>

    <section>
      <h4>Контактные данные</h4>
      <UIInput
        v-model="newUser.phone"
        label="Номер телефона"
        placeholder="+7 777 777 77 77"
        mask="+7 (###) ### ## ##"
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
      <UIInput label="Фамилия" placeholder="Ввидите фамилия клиента" />
    </section>

    <UIButton type="submit" className="gradient">Добавить</UIButton>
  </form>
</template>

<script>
import UIInput from "./UI/UIInput.vue";
import UIButton from "./UI/UIButton.vue";
import RadioSelector from "./UI/RadioSelector.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  name: "AddClientForm",
  components: { UIInput, UIButton, RadioSelector },
  setup: () => ({ v$: useVuelidate() }),
  mounted() {
    console.log("mounted", this.v$.newUser.dateOfBirth.$invalid);
    console.log(this.genderOptions);
  },
  data() {
    return {
      newUser: {
        lastName: null,
        firstName: null,
        middleName: null,
        phone: null,
        dateOfBirth: null,
      },
      genderOptions: [
        { key: "male", name: "Male" },
        { key: "female", name: "Female" },
      ],
    };
  },
  validations() {
    return {
      newUser: {
        lastName: { required },
        firstName: { required },
        phone: { required },
        dateOfBirth: {
          required,
          isValid: helpers.withMessage(
            "Пожалуйста, укажите правильную дату",
            function (value) {
              return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(
                value
              );
            }
          ),
        },
      },
    };
  },
  methods: {
    onSubmit() {
      this.v$.$touch();
      console.log("onSubmit", this.newUser);
      if (this.v$.$invalid) {
        console.log("Form is invalid");
        return;
      }
      console.log("Form is valid");
      console.log("onSubmit", this.newUser);
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
