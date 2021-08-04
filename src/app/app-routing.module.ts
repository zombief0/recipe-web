import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRecipeComponent} from './recipe/list-recipe/list-recipe.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: 'recipes', component: ListRecipeComponent, pathMatch: 'full'
  },
  {
    path: 'recipes/:id', component: RecipeDetailComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
