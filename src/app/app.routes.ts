import { Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'singUp',
        loadComponent: () => import('./pages/sing-up-page/sing-up-page.component').then((m) => m.SingUpPageComponent)
    },
    {
        path: '**',
        loadComponent: () => import('@page/page-not-found/page-not-found.page').then((m) => m.PageNotFoundPage)
    }
]
