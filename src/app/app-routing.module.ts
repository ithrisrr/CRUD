import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path : '', component:LoginComponent},
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'userlist',
    component:UserlistComponent
  },
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true })],
  exports: [RouterModule]
})


export class AppRoutingModule { }

export {routes}
