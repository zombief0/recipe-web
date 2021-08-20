import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRecipeComponent} from './recipe/list-recipe/list-recipe.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthMessageComponent} from './auth/auth-message/auth-message.component';
import {AddRecipeComponent} from './recipe/add-recipe/add-recipe.component';
import {AuthGuard} from './service/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: 'recipes', component: ListRecipeComponent, pathMatch: 'full'
  },
  {
    path: 'add-recipe/:id', component: AddRecipeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'recipes/:id', component: RecipeDetailComponent, pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent,
    children: [
      {
        path: ':data', component: AuthMessageComponent
      }
    ]
  },
  {
    path: 'signup', component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
