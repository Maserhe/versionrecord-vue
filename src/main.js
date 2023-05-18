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


import { ElButton, ElMessageBox, ElDialog, ElInput , ElSelect, ElForm, ElDatePicker} from 'element-plus'

const app = createApp(App)

app.config.globalProperties.$http = http;
app.config.globalProperties.$store = store;

app.use(Button)
    .use(Layout)
    .use(router)
    .use(ElButton)
    .use(ElMessageBox)
    .use(ElDialog)
    .use(ElInput)
    .use(ElSelect)
    .use(ElForm)
    .use(ElDatePicker)
    .mount('#app')

app.directive('preventReClick', {
    inserted(el, binding) {
      el.addEventListener('click', () => {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, binding.value || 3000)
        }
      })
    }
  })
