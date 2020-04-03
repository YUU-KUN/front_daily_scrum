<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="navbar-brand brand-logo">
                  <img src="../../public/template_front_daily_scrum/assets/img/logo.png" />
                  <!-- <img src="../../public/template_front_daily_scrum/assets/img/logo.svg"> -->
                </div>
                <h4>Selamat datang!</h4>
                <h6 class="font-weight-light">Daftar untuk menggunakan aplikasi daily scrum.</h6>
                <form v-on:submit.prevent="Register">
                <!-- <form class="pt-3" method="post" action="#"> -->
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input
                        v-model="Firstname"
                        type="text"
                        class="form-control form-control-lg border-left-0"
                        id="firstname"
                        name="Firstname"
                        placeholder="Nama Depan"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-account-outline text-primary"></i>
                        </span>
                      </div>
                      <input
                        v-model="Lastname"
                        type="text"
                        class="form-control form-control-lg border-left-0"
                        id="lastname"
                        name="Lastname"
                        placeholder="Nama Belakang"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-message-outline text-primary"></i>
                        </span>
                      </div>
                      <input
                        v-model="email"
                        type="email"
                        class="form-control form-control-lg border-left-0"
                        id="email"
                        name="email"
                        placeholder="E-Mail"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-lock-outline text-primary"></i>
                        </span>
                      </div>
                      <input
                        v-model="password"
                        type="password"
                        class="form-control form-control-lg border-left-0"
                        name="password"
                        id="password"
                        placeholder="Password Baru"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">
                          <i class="mdi mdi-lock-outline text-primary"></i>
                        </span>
                      </div>
                      <input
                        v-model="password_verify"
                        type="password"
                        class="form-control form-control-lg border-left-0"
                        name="password_verify"
                        id="password_verify"
                        placeholder="Konfirmasi Password"
                        required
                      />
                    </div>
                  </div>
                  <div class="my-3">
                    <input
                      type="submit"
                      name="submit"
                      class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      value="DAFTAR"
                    />
                  </div>
                </form>
                <router-link to="/login">Wah, udah punya akun nih?</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      Firstname: "",
      Lastname: "",
      email: "",
      password: "",
      password_verify: ""
    };
  },
  methods: {
    Register: function() {
      let Firstname = this.Firstname;
      let Lastname = this.Lastname;
      let email = this.email;
      let password = this.password;
      let password_verify = this.password_verify;
      this.$store
        .dispatch("register", { Firstname, Lastname, email, password, password_verify })
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>