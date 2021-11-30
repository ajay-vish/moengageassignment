import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RedirectUrlComponent } from './components/redirect-url/redirect-url.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { AuthGuardService } from './services/auth-gaurd.service';

const routes: Routes = [
  {path:'', component: HomeComponent, canActivate: [AuthGuardService] },
  {path:'search', component: SearchPageComponent, canActivate: [AuthGuardService]},
  {path:'404', component: NotFoundComponent, canDeactivate: [AuthGuardService]},
  {path:'**', component: RedirectUrlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }