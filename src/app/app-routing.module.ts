import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {ArticleDetailsComponent} from "./pages/article-details/article-details.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {AuthGuard} from "./guards/auth.guard";
import {ArticleCreationComponent} from "./pages/article-creation/article-creation.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'users/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  {path: 'articles/new', component: ArticleCreationComponent, canActivate: [AuthGuard] },
  {path: 'articles/:id', component: ArticleDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
