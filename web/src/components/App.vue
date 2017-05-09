<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: "app"
  }
</script>

<style lang="scss">
  body {
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #555;
    background: #f8f8f8;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 300;
  }

  b {
    font-weight: 400;
  }
</style>
