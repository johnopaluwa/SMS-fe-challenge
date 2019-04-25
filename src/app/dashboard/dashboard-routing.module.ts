
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'grid' },
      { path:'grid', component:GridLayoutComponent}
    ]},
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule]
})
export class DashBoardRoutingModule {
}