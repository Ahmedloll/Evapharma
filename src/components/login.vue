<template>
  <div class="form-container flex center align">
    <form class="flex col" @submit.prevent="login">
      <label for="Email"> Email </label>
      <input
        type="email"
        name="Email"
        placeholder="Enter your email"
        v-model="email"
      />
      <label for="Password"> Password </label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        v-model="password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapMutations } from "vuex";

  export default {
    name: "login",

    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      ...mapMutations(["setToken"]),

      login() {
        let data = {
          Email: this.email,
          Password: this.password,
        };
        axios
          .post(
            "https://taskfrontendapi.azurewebsites.net/api/user/login",
            data
          )
          .then((response) => {
            if (response.status == 200) {
              this.setToken(response.data.token);
              window.localStorage.setItem("token", response.data.token);
              this.$router.push("/countries");
            }
          })
          .catch(() => {
            //handle error
            this.$router.push("/tryagain");
          });
      },
    },
  };
</script>

<style scoped lang="scss">
  .form-container {
    width: 100%;
    height: calc(100vh - 40px);
    form {
      width: 30%;
      input,
      button {
        height: 30px;
        border: 1px solid grey;
        border-radius: 4px;
      }
      input {
        margin-bottom: 10px;
        padding: 0 10px;
      }
      button {
        cursor: pointer;
      }
    }
  }
</style>
