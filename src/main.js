import Vue from 'vue'
import { Button, Container, Main, Header, Aside, menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn } from 'element-ui';
import App from './App.vue'
import './assets/scss/index.scss'

import router from './router'
import store from './store'
import './api/mock.js'

Vue.config.productionTip = false


Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
