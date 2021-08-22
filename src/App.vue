<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: "App",
  };
</script>
<style lang="scss">
  body {
    margin: 0;
    padding: 20px;
  }

  .flex {
    display: flex;
  }
  .col {
    flex-direction: column;
  }
  .center {
    justify-content: center;
  }
  .align {
    align-items: center;
  }
  .wrap {
    flex-wrap: wrap;
  }
  h1 {
    margin: 0;
  }
</style>
