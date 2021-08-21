import {NgModule} from '@angular/core';
import {AddRecipeComponent} from './add-recipe.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {NzInputModule} from 'ng-zorro-antd/input';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../../service/auth.guard';
import {SharedElementsModule} from '../../shared-elements.module';
import {SharedFormModule} from '../../shared-form.module';

@NgModule({
  declarations: [
    AddRecipeComponent,
  ],
  imports: [
    SharedFormModule,
    RouterModule.forChild([

      {
        path: ':id', component: AddRecipeComponent, canActivate: [AuthGuard],
      },
      {
        path: '', component: AddRecipeComponent, canActivate: [AuthGuard],
      },
    ])
  ]
})
export class AddRecipeModule {

}
