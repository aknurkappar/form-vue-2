<template>
  <form class="add-client" @submit.prevent="onSubmit">
    <h2>Добавить клиента</h2>
    <section>
      <h4>Основные данные</h4>
      <div class="form-container">
        <div class="form-container-sub">
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
            v-model="newUser.phone"
            :v="v$.newUser.phone"
            label="Номер телефона"
            placeholder="+7 777 777 77 77"
            mask="+7 (###) ### ## ##"
            required
          />
        </div>
        <div class="form-container-sub">
          <UIInput
            v-model="newUser.dateOfBirth"
            :v="v$.newUser.dateOfBirth"
            label="Дата рождения"
            placeholder="ДД / ММ / ГГГГ"
            mask="##/##/####"
            required
          />
          <RadioSelect
            :options="genderOptions"
            v-model="newUser.gender"
            label="Пол"
          />
        </div>
      </div>
    </section>

    <section>
      <h4>Адрес проживания</h4>
      <div class="form-container">
        <div class="form-container-sub">
          <UISelect
            :options="countries"
            v-model="newUser.country"
            label="Страна"
            placeholder="Выберите страну"
          />
          <UISelect
            :options="regions"
            v-model="newUser.region"
            label="Область"
            placeholder="Выберите область"
          />
          <UIInput
            v-model="newUser.city"
            :v="v$.newUser.city"
            label="Город"
            placeholder="Введите город"
            required
          />
        </div>
        <div class="form-container-sub">
          <UIInput
            v-model="newUser.zipcCode"
            :v="v$.newUser.zipcCode"
            label="Индекс"
            placeholder="Ввидите почтовый индекс"
          />
          <UIInput
            v-model="newUser.address"
            :v="v$.newUser.address"
            label="Адрес (Улица и дом)"
            placeholder="например, ул. Ленина 123"
          />
        </div>
      </div>
    </section>

    <section>
      <h4>Данные личного документа</h4>
      <UIInput label="Фамилия" placeholder="Ввидите фамилия клиента" />
      <UISelect
        :options="countries"
        label="Страна"
        placeholder="Выберите страну"
      />
    </section>

    <UIButton type="submit" className="gradient">Добавить</UIButton>
  </form>
</template>

<script>
import UIInput from "./UI/UIInput.vue";
import UIButton from "./UI/UIButton.vue";
import UISelect from "./UI/UISelect.vue";
import RadioSelect from "./UI/RadioSelect.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { countries } from "../../helpers/countries";

export default {
  name: "AddClientForm",
  components: { UIInput, UIButton, UISelect, RadioSelect },
  setup: () => ({ v$: useVuelidate() }),
  mounted() {},
  data() {
    return {
      newUser: {
        lastName: null,
        firstName: null,
        middleName: null,
        phone: null,
        dateOfBirth: null,
        gender: null,
        country: null,
        region: null,
        city: null,
        zipcCode: null,
        address: null,
      },
      genderOptions: [
        { key: "male", name: "Мужчина" },
        { key: "female", name: "Женщина" },
        { key: "none", name: "Не указывать" },
      ],
      countries: countries,
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
        city: {
          required,
          isValid: helpers.withMessage(
            "В названии города допускаются только буквы",
            function (value) {
              return /^[\p{L}\s,-]+$/u.test(value);
            }
          ),
        },
      },
    };
  },
  computed: {
    regions: {
      get() {
        return countries.find((country) => country.key == this.newUser.country)
          ?.regions;
      },
    },
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
  watch: {
    "newUser.country"() {
      this.newUser.region = null;
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

.form-container
  display: grid
  grid-template-columns: 350px 350px
  grid-gap: 4px
  &-sub
    display: flex
    flex-direction: column
    gap: 14px
</style>
