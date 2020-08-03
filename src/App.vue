<template>
  <div id="app">
    <main class="main">
      <Navbar />
      <div class="mb-4">
        <router-view />
      </div>
    </main>
    <footer class="footer">
      <b-container fluid>
          <p>Copyright &copy; 2020 - All Rights Reserved. <b>Timeline App</b> <b-badge variant="danger">ALPHA</b-badge></p>
      </b-container>
    </footer>
  </div>
</template>

<style lang="scss">
  @import "assets/bamburgh.scss";
  @import "assets/app.scss";

  #app {
    display: grid;
    grid-template-rows: 1fr 90px;
  }

  main.main {
    background-color: #ecf1f5;
  }

  footer.footer {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(7, 9, 25, 0.1);
  }
</style>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar,
  },
  data: function() {
    return {
    };
  },
  methods: {
  },
}
</script>