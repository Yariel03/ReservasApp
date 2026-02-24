import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/citas/pages/citas-page.component').then(m => m.CitasPageComponent) 
  },
  { path: '**', redirectTo: '' }
];
