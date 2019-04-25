import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DashBoardRoutingModule } from './dashboard-routing.module';

import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GridLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashBoardRoutingModule,
    ToolBarModule,
    GridModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule { }