import { ParentComponent } from './parent/parent.component';
import { CustomersComponent } from './customers/customers.component';
import { BillingComponent } from './billing/billing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'

  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'billing',
    component: BillingComponent,
    pathMatch: 'full'
  },
  {
    path: 'parent',
    component: ParentComponent,
    pathMatch: 'full'
  },
  {
    path: 'customers',
    component: CustomersComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
