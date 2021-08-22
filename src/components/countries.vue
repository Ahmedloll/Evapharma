<template>
  <Loader v-if="!countries.length"></Loader>

  <div v-else>
    <h1>Countries</h1>
    <div class="countries-container flex wrap">
      <div
        v-for="country in countries"
        :key="country.id"
        class="country flex col align"
      >
        {{ country.name }}
        <div class="buttons-container">
          <button @click="EditCountry(country)">Edit</button>
          <button @click="deleteCountry(country)">Delete</button>
        </div>
        <router-link :to="{ name: 'Cities', params: { id: country.id } }"
          >to cities</router-link
        >
      </div>
    </div>
    <div class="flex center">
      <button @click="AddCountry">Add Country</button>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Loader from "./Loader.vue";

  export default {
    name: "countries",
    components: { Loader },

    data() {
      return {
        countries: [],
      };
    },
    mounted() {
      axios
        .get("https://taskfrontendapi.azurewebsites.net/api/country", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.countries = response.data;
        });
    },
    methods: {
      AddCountry() {
        let country = prompt("Please enter your country name");
        axios
          .post(
            "https://taskfrontendapi.azurewebsites.net/api/country",
            { Name: country },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status == 200) {
              this.countries.push(response.data);
            }
          });
      },
      EditCountry(country) {
        let newName = prompt("Please enter your country name");
        axios
          .put(
            "https://taskfrontendapi.azurewebsites.net/api/country",
            { Id: country.id, Name: newName },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status == 200) {
              this.countries[this.countries.indexOf(country)].name = newName;
            }
          });
      },
      deleteCountry(country) {
        axios
          .delete(
            `https://taskfrontendapi.azurewebsites.net/api/country/${country.id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status == 200) {
              this.countries.splice(this.countries.indexOf(country), 1);
            }
          });
      },
    },
  };
</script>

<style scoped lang="scss">
  .countries-container {
    .country {
      border: 1px solid red;
      border-radius: 5px;
      padding: 10px 20px;
      margin: 10px;
      .buttons-container {
        margin-top: 10px;
        button {
          margin: 0 5px;
        }
      }
    }
  }
</style>
