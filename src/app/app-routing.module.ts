import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { InsuranceFormComponent } from './shared/dialog/insurance-form/insurance-form.component';

const routes: Routes = [
  { path: 'form' ,component: InsuranceFormComponent },
  { path: 'table', pathMatch: 'full' ,component: TableComponent },
  { path: 'card', pathMatch: 'full' ,component: CardComponent },
  { path: '**', redirectTo:'form'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }