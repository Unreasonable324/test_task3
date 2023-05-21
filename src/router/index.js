import { createRouter, createWebHistory } from 'vue-router'
import Ucatalog from '../views/U-catalog'
import Ucatalogitem from '../views/U-catalog-item'
import Usubcategory from '../views/U-subcategory'








const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'U-catalog',
      component: Ucatalog
    },
    {
      path: '/category/:category',
      name: 'U-catalog-item',
      component: Ucatalogitem,
      children: [{
        path: '/category/:category/:sub_category',
        name: 'U-subcategory',
        component: Usubcategory,
        props: true
      }],
      props: true
    },

  ]
})

export default router
