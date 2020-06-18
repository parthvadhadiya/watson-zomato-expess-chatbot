import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


Vue.prototype.$axios = axios
window.onbeforeunload = function(){
  axios.get(`http://localhost:5000/bot?Text=bye&From=parth`)
} 