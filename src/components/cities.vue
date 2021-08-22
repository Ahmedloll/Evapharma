<template>
  <Loader v-if="!country"></Loader>
  <div v-else>
    <h1>Cities of {{ country }}</h1>
    <div class="cities-container flex wrap">
      <div v-for="city in cities" :key="city.id" class="city flex col align">
        {{ city.name }}
        <div class="buttons-container">
          <button @click="EditCity(city)">Edit</button>
          <button @click="deleteCity(city)">Delete</button>
        </div>
      </div>
    </div>
    <div class="flex center">
      <button @click="AddCity">Add City</button>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Loader from "./Loader.vue";

  export default {
    name: "cities",
    components: { Loader },
    data() {
      return {
        country: "",
        cities: [],
      };
    },
    mounted() {
      axios
        .get(
          `https://taskfrontendapi.azurewebsites.net/api/city/getcities/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.cities = response.data;
        });
      axios
        .get(
          `https://taskfrontendapi.azurewebsites.net/api/country/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.country = response.data.name;
        });
    },
    methods: {
      AddCity() {
        let city = prompt("Please enter your city name");
        axios
          .post(
            "https://taskfrontendapi.azurewebsites.net/api/city",
            { Name: city, CountryId: this.$route.params.id },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status == 200) {
              this.cities.push(response.data);
            }
          });
      },
      EditCity(city) {
        let newName = prompt("Please enter your country name");
        axios
          .put(
            "https://taskfrontendapi.azurewebsites.net/api/city",
            { Id: city.id, Name: newName, CountryId: city.countryId },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status == 200) {
              this.cities[this.cities.indexOf(city)].name = newName;
            }
          });
      },
      deleteCity(city) {
        axios
          .delete(
            `https://taskfrontendapi.azurewebsites.net/api/city/${city.id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            if (response.status == 200) {
              this.cities.splice(this.cities.indexOf(city), 1);
            }
          });
      },
    },
  };
</script>

<style scoped lang="scss">
  .cities-container {
    .city {
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
