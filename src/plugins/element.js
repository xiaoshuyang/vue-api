import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row,
  Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox, Tag, Tree, Select, Option, Link, Backtop
} from 'element-ui'
// import { Form, FormItem } from 'element-ui'
// import { Input } from 'element-ui'
// Message弹框 需要全局挂载

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Input)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Link)
Vue.use(Backtop)
Vue.prototype.$message = Message
// $message是自定义属性 合法就可以  Message是一个组件 按要求
// 把弹框组件挂载到了原型对象上 这样的话 每一个组件都可以通过this 访问到$message
// 访问到$message就可以弹框提示了
Vue.prototype.$confirm = MessageBox.confirm
