import {NgModule} from '@angular/core';
import {ListRecipeComponent} from './list-recipe/list-recipe.component';
import {RecipeItemComponent} from './list-recipe/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {CommonModule} from '@angular/common';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {RouterModule} from '@angular/router';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {SharedElementsModule} from '../shared-elements.module';

@NgModule({
  declarations: [
    ListRecipeComponent,
    RecipeItemComponent,
  ],
  imports: [
    NzCardModule,
    NzImageModule,
    SharedElementsModule,
    RouterModule.forChild([
      {
        path: '', component: ListRecipeComponent, pathMatch: 'full'
      }
    ])
  ]
})
export class RecipeListModule {

}
