import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  { path: 'table', pathMatch: 'full' ,component: TableComponent },
  { path: 'card', pathMatch: 'full' ,component: CardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }