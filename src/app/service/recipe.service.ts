import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {RecipeListModel} from '../models/recipe-list.model';
import {RecipeDetailModel} from '../models/recipe-detail.model';
import {RecipeSaveModel} from '../models/recipe-save.model';
import {catchError} from 'rxjs/operators';
import {RecipeDeleteModel} from '../models/recipe-delete.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {
  }

  getAllRecipes(size: number = 5, page: number = 0): Observable<RecipeListModel> {
    const ALL_RECIPES_URL = environment.baseServiceUrl + 'recipe';
    return this.http.get<RecipeListModel>(ALL_RECIPES_URL, {
      params: {
        size: size.toString(),
        page: page.toString()
      }
    });
  }

  getRecipeById(id: number): Observable<RecipeDetailModel> {
    const RECIPE_BY_ID_URL = environment.baseServiceUrl + 'recipe/' + id;
    return this.http.get<RecipeDetailModel>(RECIPE_BY_ID_URL);
  }

  saveRecipe(recipe: RecipeSaveModel): Observable<any> {
    const SAVE_RECIPE_URL = environment.baseServiceUrl + 'recipe';
    return this.http.post(SAVE_RECIPE_URL, recipe).pipe(catchError(this.handleError));
  }

  updateRecipe(recipe: RecipeSaveModel): Observable<any> {
    const UPDATE_RECIPE_URL = environment.baseServiceUrl + 'recipe';
    return this.http.put(UPDATE_RECIPE_URL, recipe).pipe(catchError(this.handleError));
  }

  deleteRecipe(recipeDelete: RecipeDeleteModel): Observable<any> {
    const DELETE_RECIPE_URL = environment.baseServiceUrl + 'recipe';
    return this.http.request('DELETE', DELETE_RECIPE_URL, {body: recipeDelete});
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occured';
    if (!errorResponse.error) {
      return throwError(errorMessage);
    }

    if (errorResponse.status === 401) {
      errorMessage = 'Unauthorized';
    }

    if (errorResponse.status === 403) {
      errorMessage = 'Forbidden';
    }

    return throwError(errorMessage);
  }
}
