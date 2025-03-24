import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPersonComponent } from './add-person/add-person.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-person', component: AddPersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
