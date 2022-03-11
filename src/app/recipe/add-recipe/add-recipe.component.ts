import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {Subscription} from 'rxjs';
import {RecipeSaveModel} from '../../models/recipe-save.model';
import {IngredientModel} from '../../models/ingredient.model';
import {RecipeService} from '../../service/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {RecipeDetailModel} from '../../models/recipe-detail.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit, OnDestroy {
  recipeForm!: FormGroup;
  recipeToEdit: RecipeDetailModel;
  isLoading = false;
  error = null;
  finalFilename = null;
  fileName = null;
  editMode = false;
  index: number;
  userSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private msg: NzMessageService,
              private activeRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params => {
        this.index = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm(): void {
    let recipeName = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.recipeService.getRecipeById(this.index).subscribe(
        recipe => {
          console.log(recipe);
          this.recipeToEdit = recipe;
          recipeName = recipe.name;
          this.fileName = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients != null) {
            for (const ing of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                name: new FormControl(ing.name, Validators.required),
                amount: new FormControl(ing.amount, [Validators.required,
                  Validators.min(0)])
              }));
            }
          } else {
            this.addIngredient(null);
          }

          this.recipeForm = this.fb.group({
            name: [recipeName, [Validators.required]],
            description: [recipeDescription],
            ingredients: recipeIngredients
          });
        }
      );
    } else {
      recipeIngredients.push(new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [Validators.required,
          Validators.min(0)])
      }));
    }
    this.recipeForm = this.fb.group({
      name: [recipeName, [Validators.required]],
      description: [recipeDescription],
      ingredients: recipeIngredients
    });
  }

  getControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient(e: MouseEvent): void {
    if (e !== null) {
      e.preventDefault();
    }
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required,
          Validators.min(0)])
      })
    );
  }

  onDeleteIngredient(i: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  submitForm(): void {
    this.isLoading = true;
    console.log(this.recipeForm.value);
    const recipeToSave = new RecipeSaveModel();
    recipeToSave.name = this.recipeForm.value.name;
    recipeToSave.description = this.recipeForm.value.description;
    recipeToSave.ingredients = this.recipeForm.value.ingredients as IngredientModel[];
    if (!this.editMode) {
      recipeToSave.imagePath = this.finalFilename;
      this.recipeService.saveRecipe(recipeToSave).subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }, error1 => {
        this.isLoading = false;
        this.msg.error(error1);
      });
    } else {
      recipeToSave.imagePath = !!this.finalFilename ? this.finalFilename : this.fileName;
      recipeToSave.id = this.recipeToEdit.id;
      recipeToSave.idUser = this.recipeToEdit.idUser;
      this.userSubscription = this.authService.user.subscribe(user => {
        if (user.id === this.recipeToEdit.idUser || user.role === 'ADMIN') {
          this.recipeService.updateRecipe(recipeToSave).subscribe(response => {
            this.isLoading = false;
            this.router.navigate(['/']);
          }, error1 => {
            this.isLoading = false;
            this.msg.error(error1);
          });
        } else {
          this.isLoading = false;
          this.msg.error('You did not add this recipe');
        }
      });
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.finalFilename = info.file.response.message;
      this.fileName = null;
      console.log(this.finalFilename);
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
