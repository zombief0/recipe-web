import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: 'recipes', loadChildren: () => import('./recipe/recipe-list.module').then(m => m.RecipeListModule), pathMatch: 'full'
  },
  {
    path: 'recipes/:id', loadChildren: () => import('./recipe/recipe-detail.module').then(m => m.RecipeDetailModule), pathMatch: 'full'
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'add-recipe', loadChildren: () => import('./recipe/add-recipe/add-recipe.module').then(m => m.AddRecipeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
