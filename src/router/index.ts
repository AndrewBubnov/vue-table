import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../routes/List.vue'
import ListItem from "@/routes/ListItem.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/hero',
    name: 'hero',
    component: ListItem,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router
