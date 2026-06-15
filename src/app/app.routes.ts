import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'opportunities',
    loadComponent: () => import('./components/salesforce/salesforce').then(m => m.SalesforceComponent),
    canActivate: [authGuard]
  },
  { path: '',   redirectTo: 'opportunities', pathMatch: 'full' },
  { path: '**', redirectTo: 'opportunities' }
];
