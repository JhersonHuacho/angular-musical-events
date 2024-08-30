import { Routes } from '@angular/router';
import { isAdmin, isCustomer, isLogged, isNotLogged } from './app.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    canActivate: [isNotLogged]
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    canActivate: [isNotLogged],
  },
  {
    path: 'forgot-password',
    pathMatch: 'full',
    loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    canActivate: [isNotLogged],
  },
  {
    path: 'event-detail/:id',
    pathMatch: 'full',
    loadComponent: () => import('./event-detail/event-detail.component').then(m => m.EventDetailComponent)
  },
  {
    path: 'event-detail',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'admin',
    pathMatch: 'prefix',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [isLogged, isAdmin],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sales'
      },
      {
        path: 'sales',
        pathMatch: 'full',
        loadComponent: () => import('./admin/sales/sales.component').then(m => m.SalesComponent)
      },
      {
        path: 'events',
        pathMatch: 'full',
        loadComponent: () => import('./admin/events/events.component').then(m => m.EventsComponent)
      },
      {
        path: 'genres',
        pathMatch: 'full',
        loadComponent: () => import('./admin/genres/genres.component').then(m => m.GenresComponent)
      }
    ]
  },
  {
    path: 'customer',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./customer/customer.component').then((m) => m.CustomerComponent),
    canActivate: [isLogged, isCustomer],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-purchases',
      },
      {
        path: 'my-purchases',
        pathMatch: 'full',
        loadComponent: () =>
          import('./customer/my-purchases/my-purchases.component').then(
            (m) => m.MyPurchasesComponent
          ),
      },
      {
        path: 'change-password',
        pathMatch: 'full',
        loadComponent: () =>
          import('./customer/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
          ),
      },
    ],
  },
];
