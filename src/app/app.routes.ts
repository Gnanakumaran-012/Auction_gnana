import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auction',
    pathMatch: 'full',
  },
  {
    path: 'auction',
    loadComponent: () =>
      import('./auction/auction.component').then((m) => m.AuctionComponent),
  },
  {
    path: '**',
    redirectTo: 'auction',
  },
];
