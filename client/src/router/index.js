import { createRouter, createWebHistory } from 'vue-router'

import SiteHomeView from '@/views/Site/HomeView.vue'
import SitePageView from '@/views/Site/PageView.vue'
import SiteSearchView from '@/views/Site/SearchView.vue'
import SiteBusinessView from '@/views/Site/BusinessView.vue'
import SiteErrorView from '@/views/Site/ErrorView.vue'

import LoginView from '@/views/Panel/Authentication/LoginView.vue'
import RegisterView from '@/views/Panel/Authentication/RegisterView.vue'
import ForgotPasswordView from '@/views/Panel/Authentication/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/Panel/Authentication/ResetPasswordView.vue'

import DashboardView from '@/views/Panel/DashboardView.vue'
import PanelBusinessListView from '@/views/Panel/Business/ListView.vue'
import PanelBusinessAddView from '@/views/Panel/Business/AddView.vue'
import PanelBusinessEditView from '@/views/Panel/Business/EditView.vue'
import UserEditView from '@/views/Panel/User/EditView.vue'

import AdminSettingsView from '@/views/Admin/SettingsView.vue'
import AdminMenuView from '@/views/Admin/MenuView.vue'
import AdminUserView from '@/views/Admin/UserView.vue'
import AdminPageView from '@/views/Admin/PageView.vue'
import AdminCategoryView from '@/views/Admin/CategoryView.vue'
import AdminRoleView from '@/views/Admin/RoleView.vue'
import AdminCityView from '@/views/Admin/CityView.vue'

const routes = [{
        path: '/',
        name: 'site-home',
        component: SiteHomeView,
        meta: { template: 'site' }
    },
    {
        path: '/page/:slug',
        name: 'site-page',
        component: SitePageView,
        meta: { template: 'site' }
    },
    {
        path: '/search',
        name: 'site-search',
        component: SiteSearchView,
        meta: { template: 'site' }
    },
    {
        path: '/b/:slug',
        name: 'site-business',
        component: SiteBusinessView,
        meta: { template: 'site' }
    },
    {
        path: '/error/:code',
        name: 'site-error',
        component: SiteErrorView,
        meta: { template: 'site' }
    },


    {
        path: '/panel/login',
        name: 'panel-login',
        component: LoginView,
        meta: { template: 'authentication' }
    },
    {
        path: '/panel/register',
        name: 'panel-register',
        component: RegisterView,
        meta: { template: 'authentication' }
    },
    {
        path: '/panel/forgot-password',
        name: 'panel-forgot-password',
        component: ForgotPasswordView,
        meta: { template: 'authentication' }
    },
    {
        path: '/panel/reset-password/:code/:email',
        name: 'panel-reset-password',
        component: ResetPasswordView,
        meta: { template: 'authentication' }
    },


    {
        path: '/panel/dashboard',
        name: 'panel-dashboard',
        component: DashboardView,
        meta: { template: 'panel' }
    },
    {
        path: '/panel/business/list',
        name: 'panel-business-list',
        component: PanelBusinessListView,
        meta: { template: 'panel' }
    },
    {
        path: '/panel/business/add',
        name: 'panel-business-add',
        component: PanelBusinessAddView,
        meta: { template: 'panel' }
    },
    {
        path: '/panel/business/edit/:slug/:id',
        name: 'panel-business-edit',
        component: PanelBusinessEditView,
        meta: { template: 'panel' }
    },
    {
        path: '/panel/user/edit',
        name: 'panel-user-edit',
        component: UserEditView,
        meta: { template: 'panel' }
    },


    {
        path: '/admin/settings',
        name: 'admin-settings',
        component: AdminSettingsView,
        meta: { template: 'panel' }
    },
    {
        path: '/admin/menu',
        name: 'admin-menu',
        component: AdminMenuView,
        meta: { template: 'panel' }
    },
    {
        path: '/admin/user',
        name: 'admin-user',
        component: AdminUserView,
        meta: { template: 'panel' }
    },
    {
        path: '/admin/page',
        name: 'admin-page',
        component: AdminPageView,
        meta: { template: 'panel' }
    },
    {
        path: '/admin/category',
        name: 'admin-category',
        component: AdminCategoryView,
        meta: { template: 'panel' }
    },
    {
        path: '/admin/role',
        name: 'admin-role',
        component: AdminRoleView,
        meta: { template: 'panel' }
    },
    {
        path: '/admin/city',
        name: 'admin-city',
        component: AdminCityView,
        meta: { template: 'panel' }
    }

    //   {
    //     path: '/:catchAll(.*)',
    //     redirect: { name: 'site-error', params: { code: 404 } }
    //   }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router