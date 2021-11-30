import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RedirectUrlComponent } from './components/redirect-url/redirect-url.component';
import { AuthGuardService } from './services/auth-gaurd.service';

const routes: Routes = [
  {path:'', component: HomeComponent, canActivate: [AuthGuardService] },
  {path:'404', component: NotFoundComponent},
  {path:'500', component: InternalServerErrorComponent},
  {path:'**', component: RedirectUrlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }