import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BerandaComponent } from './beranda/beranda.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
  {
    path:'home',component:BerandaComponent
  },
  {
    path:'about',component:AboutComponent
  },
  {
    path:'input',component:InputComponent
  },
  {
    path:'findById/:id',component:InputComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
