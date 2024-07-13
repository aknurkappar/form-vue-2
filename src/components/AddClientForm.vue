<template>
  <form class="add-client" @submit.prevent="onSubmit">
    <h2>Добавить клиента</h2>
    <section>
      <h4>Основные данные</h4>
      <div class="grid-2">
        <div class="flex-column gap-16">
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
        <div class="flex-column gap-16">
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
      <div class="grid-2">
        <div class="flex-column gap-16">
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
        <div class="flex-column gap-16">
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
      <div class="grid-2">
        <div class="flex-column gap-16">
          <UISelect
            :options="documentTypes"
            v-model="newUser.document.type"
            label="Тип документа"
            placeholder="Выберите тип документа"
          />
          <div class="flex gap-16">
            <UIInput
              v-model="newUser.document.series"
              :v="v$.newUser.document.series"
              label="Серия"
              placeholder="Серия"
              className="w-80"
            />
            <UIInput
              v-model="newUser.document.number"
              :v="v$.newUser.document.number"
              label="Номер"
              placeholder="Номер"
              className="w-120"
            />
          </div>
        </div>
        <div class="flex-column gap-16">
          <UIInput
            v-model="newUser.document.issuedBy"
            :v="v$.newUser.document.issuedBy"
            label="Кем выдан"
            placeholder="Ввидите кем выдан документ"
          />
          <UIInput
            v-model="newUser.document.issuedDate"
            :v="v$.newUser.document.issuedDate"
            label="Дата выдачи"
            placeholder="ДД / ММ / ГГГГ"
            mask="##/##/####"
            required
          />
        </div>
      </div>
    </section>
    <div class="form-button">
      <UIButton type="submit" className="gradient">Добавить</UIButton>
    </div>
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
import { DMYFormat } from "../../helpers/validators/date";
import { OnlyAlphaAndNumbers } from "../../helpers/validators/type";

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
        document: {
          type: null,
          series: null,
          number: null,
          issuedBy: null,
          issuedDate: null,
        },
      },
      genderOptions: [
        { key: "male", name: "Мужчина" },
        { key: "female", name: "Женщина" },
        { key: "none", name: "Не указывать" },
      ],
      documentTypes: [
        { key: "passport", name: "Паспорт" },
        { key: "birthCertificate", name: "Свидетельство о рождении" },
        { key: "driverLicense", name: "Вод. удостоверение" },
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
          isValid: DMYFormat,
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
        document: {
          type: { required },
          series: {
            isValid: OnlyAlphaAndNumbers,
          },
          number: {
            isValid: OnlyAlphaAndNumbers,
          },
          issuedDate: {
            required,
            isValid: DMYFormat,
          },
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
  margin: 30px 5%
  display: flex
  flex-direction: column
  gap: 14px
  min-width: max-content

  @media (max-width: $tablet)
    margin: 20px 5%

  @media (max-width: $phone)
    margin: 20px 0
    justify-content: center
    align-content: center

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
