import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import store from '../store'
import http from "axios";
import "../api/mock.js";

import 'element-plus/dist/index.css'

import {
    Button,
    Layout,
} from 'ant-design-vue'


import { ElButton, ElMessageBox, ElDialog } from 'element-plus'

const app = createApp(App)

app.config.globalProperties.$http = http;

app.use(Button)
    .use(Layout)
    .use(router)
    .use(store)
    .use(ElButton)
    .use(ElMessageBox)
    .use(ElDialog)
    .mount('#app')
