import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:"",redirectTo:"auth/login" ,pathMatch:"full" },
  {path:"auth", loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule), canActivate: [AuthGuard] },
  {path:"dashboard", loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [DashboardGuard]},

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
