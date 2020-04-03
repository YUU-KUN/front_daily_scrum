<template>
  <div class="container-scroller">
    <!-- partial:partials/_horizontal-navbar.html -->
    <div class="horizontal-menu">
      <nav class="navbar top-navbar col-lg-12 col-12 p-0">
        <div class="nav-top flex-grow-1">
          <div class="container d-flex flex-row h-100 align-items-center">
            <div
              class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
            >
              <a class="navbar-brand brand-logo" href="index.html">
                <img src="../../public/template_front_daily_scrum/assets/img/logo.png" />
              </a>
              <a class="navbar-brand brand-logo-mini" href="index.html">
                <img src="../../public/template_front_daily_scrum/assets/img/logo.png" />
              </a>
            </div>
            <div
              class="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-1"
            >

              <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item nav-profile dropdown">
                  <!-- <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    data-toggle="dropdown"
                    id="profileDropdown"
                  >Hi, Siswa</a> -->
                  <b-nav-item v-if="isLoggedIn" @click="logout" class="nav-link"><i class="mdi mdi-logout text-primary"></i> 
                  Logout</b-nav-item>
                  <!-- <div
                    class="dropdown-menu dropdown-menu-right navbar-dropdown"
                    aria-labelledby="profileDropdown"
                  >
                    <a class="dropdown-item">
                      <i class="mdi mdi-logout text-primary"></i>
                      Logout
                    </a>
                  </div> -->
                </li>
              </ul>
              <button
                class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                type="button"
                data-toggle="horizontal-menu-toggle"
              >
                <span class="mdi mdi-menu"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <nav class="bottom-navbar">
        <div class="container">
          <ul class="nav page-navigation">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="mdi mdi-format-list-bulleted menu-icon"></i>
                <span class="menu-title">My Daily Scrum</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      let conf = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization")
        }
      };
      let form = new FormData();
      this.axios
        .post("/logout", form, conf)
        .then(response => {
          if (response.data.logged === false || response.data.status === 0) {
            this.$store.commit("logout");
            localStorage.removeItem("Authorization");
            this.$router.push({ name: "login" });
          }
        })
        .catch(error => {});
    }
  }
};
</script> 

<style>
</style>