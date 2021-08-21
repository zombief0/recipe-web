import {NgModule} from '@angular/core';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzListModule} from 'ng-zorro-antd/list';
import {SharedElementsModule} from '../shared-elements.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [RecipeDetailComponent],
  imports: [
    NzDividerModule,
    NzImageModule,
    NzListModule,
    SharedElementsModule,
    RouterModule.forChild([
      {
        path: '', component: RecipeDetailComponent, pathMatch: 'full'
      },
    ])
  ]
})
export class RecipeDetailModule{

}
