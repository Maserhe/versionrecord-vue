import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import store from '../store'
import http from "axios";
import "../api/mock.js";

import {
    Button,
    ConfigProvider,
    Layout,
    Menu,
    message,
    Input,
    Space,
    Dropdown,
    Divider,
    Form,
    AutoComplete,
    Modal,
    Tree,
    Drawer,
    Row,
    Col,
    Select,
    DatePicker,
    Tooltip,
    Breadcrumb,
    Popconfirm,
    InputNumber,
    Table,
    Pagination,
} from 'ant-design-vue'

const app = createApp(App)

app.config.globalProperties.$http = http;

app.use(Button)
    .use(Layout)
    .use(ConfigProvider)
    .use(Menu)
    .use(Input)
    .use(Space)
    .use(Dropdown)
    .use(Divider)
    .use(Form)
    .use(AutoComplete)
    .use(Modal)
    .use(Tree)
    .use(Drawer)
    .use(Row)
    .use(Col)
    .use(Select)
    .use(DatePicker)
    .use(Tooltip)
    .use(Breadcrumb)
    .use(Popconfirm)
    .use(InputNumber)
    .use(Table)
    .use(Pagination)
    .use(router)
    .use(store)
    .mount('#app')
