import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRecipeComponent} from './recipe/list-recipe/list-recipe.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: 'recipes', component: ListRecipeComponent, pathMatch: 'full'
  },
  {
    path: 'recipes/:id', component: RecipeDetailComponent, pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
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
