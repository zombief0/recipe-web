import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRecipeComponent} from './recipe/list-recipe/list-recipe.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: 'recipes', component: ListRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
