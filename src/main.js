import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Materialdesignicons from 'material-design-icons-iconfont'

// import 'vue-material-design-icons/styles.css';
// import Bootstrap from 'bootstrap'
// import MenuIcon from 'vue-material-design-icons/Menu.vue';
// Vue.component('menu-icon', MenuIcon);
// import '@mdi/font/css/materialdesignicons.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../public/template_front_daily_scrum/assets/css/style.css' 

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Materialdesignicons)
// Vue.use(Bootstrap)

axios.defaults.baseURL = 'http://localhost:8001/api'

const token = localStorage.getItem('Authorization')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  methods: {
    isAuthenticate: function () {
      if (localStorage.getItem("Authorization")) {
        let conf = { headers: { "Authorization": "Bearer " + localStorage.getItem("Authorization") } };
        this.axios.get("/login/check", conf)
          .then(response => {
            if (response.data.auth == false || response.data.status == 0) {
              this.$store.commit('logout')
            } else {
              this.$store.commit('userDetail', response.data.user)
            }
          })
          .catch(error => {
            this.$store.commit('logout')
          });
      } else {
        this.$store.commit('logout')
      }
    },
  },
  mounted() {
    this.isAuthenticate()
  },
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
