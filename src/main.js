import { createApp} from 'vue'
import App from './App.vue'
// import Login from './Login.vue'
import Swal from 'sweetalert2'
import $ from 'jquery'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './routes'
import VueApexCharts from "vue3-apexcharts";


window.Vue = require('vue').default;
window.swal = Swal
window.$ = $

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

createApp(App)
.use(router)
.use($)
.use(VueApexCharts)
.mount('#app')

