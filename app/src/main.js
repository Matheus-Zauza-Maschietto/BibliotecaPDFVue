import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faXmark, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
const regularIcons = require('@fortawesome/free-regular-svg-icons');

/* add icons to the library */
library.add(
    faPlus, 
    faXmark, 
    faStar,
    faUser,
    regularIcons.faStar)

createApp(App)
.use(store)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
