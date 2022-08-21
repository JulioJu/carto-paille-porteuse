import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_ROUTE } from './home/home.route';

import { errorRoute } from './layouts/error/error.route';

const routes: Routes = [
  HOME_ROUTE,
  ...errorRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
